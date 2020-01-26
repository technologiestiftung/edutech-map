import { createSelector } from 'reselect';
import { cloneDeep } from 'lodash';
import { fetchTopoJSON } from '../utils';
import pointInPolygon from '@turf/boolean-point-in-polygon';

import {
  filterCategories,
  getSubCategoryLabel,
  filterSubCategories,
  subCategories,
  targetGroupTypes,
  targetGroups,
  filterTargetGroupTypes,
  filterTargetGroupTags,
  sortData,
  subCategoriesEmpty,
  filterDistricts,
  objectSize
} from './dataUtils';

const dataSelector = state => state.data;
const activeFilterSelector = state => state.activeFilter;
const detailDataSelector = state => state.detailData;
const favsSelector = state => state.favs;
const filterSelector = state => state.filter;
const additionalDataSelector = state => state.additionalData;
const listSortingSelector = state => state.listSorting;
const colorizerSelector = state => state.colorizer;
const subCategoryListSelector = state => state.subCategoryList;
export const instPerDistrictSelector = state => state.instPerDistrict;
const categoriesSelector = state => state.categories;
const colorizerLightSelector = state => state.colorizerLight;

const geojsonToArray = geojson => geojson.features.map(d => d.properties);

import { filterSection } from './Store';

export const dataAsArraySelector = createSelector(
  [dataSelector],
  (data) => {
    if (!data) {
      return [];
    }
    return geojsonToArray(data);
  }
);

export const initialFilterSelector = createSelector(
  [filterSelector],
  (filter) => {
    return Object.assign({}, {
    categoryFilter: [],
    subCategoryFilter: cloneDeep(subCategoriesEmpty),
    targetGroupFilter: [],
    targetGroupTagsFilter: cloneDeep(targetGroups)
  })
  }
);

export const unfilteredFilterSelector = createSelector(
  [categoriesSelector, filterSelector],
  (categories, filter) => {
    return Object.assign({}, {
    categoryFilter: cloneDeep(categories),
    subCategoryFilter: cloneDeep(subCategories),
    targetGroupFilter: [],
    targetGroupTagsFilter: cloneDeep(targetGroups)
  })
  }
);

export const tagsCountTargetGroupSelector = createSelector(
  [dataSelector],
  (data) => {
    if (data) {
      const features = data.features;
      const objPrivate = {};
      const objInstitution = {};
      features.map(feat => {
        const { properties } = feat;
        const { targetgroupprivate, targetgroupinstituion } = properties;

        if (targetgroupprivate.length > 0) {
          targetgroupprivate.forEach(item => {
            !objPrivate[item.value] ? objPrivate[item.value] = 1 : objPrivate[item.value] += 1;
          })
        }

        if (targetgroupinstituion.length > 0) {
          targetgroupinstituion.forEach(item => {
            !objInstitution[item.value] ? objInstitution[item.value] = 1 : objInstitution[item.value] += 1;
          })
        }

        // delete objPrivate.none;
        // delete objInstitution.none;

      })
      return { private: objPrivate, institution: objInstitution }
    }
  }
)

export const tagsCountSelector = createSelector(
  [dataSelector],
  (data) => {
    if (data) {
      const features = data.features;
      const obj = {};
      features.map(feat => {
        const { properties } = feat;
        const { subCategoriesSelected, category, name } = properties;

        subCategoriesSelected.forEach(item => {

          if (subCategories[category].includes(item)) {
            !obj[item] ? obj[item] = 1 : obj[item] += 1
          }
        })
      })
      return obj
    } else {
      return false;
    }
  }
)

export const enrichedDataSelector = createSelector(
  [
    dataSelector,
    favsSelector,
    filterSelector,
    colorizerSelector,
    colorizerLightSelector,
    additionalDataSelector
  ],
  (
    data,
    favs,
    filter,
    colorizer,
    colorizerLight,
    additionalData
  ) => {
    if (data) {
      const features = data.features
        .map((feat) => {
          const { properties } = feat;
          feat.properties = properties;

          properties.districtFilter = filterDistricts(
            feat,
            filter.districtFilter,
            additionalData.districts
          );

          properties.nameStr = properties.name.replace(' ', '').replace('-', '')
          properties.categoryFilter = filterCategories(properties, filter.categoryFilter);
          properties.subCategoryFilter = filterSubCategories(properties, filter.subCategoryFilter);
          properties.targetGroupTypesFilter = filterTargetGroupTypes(properties, filter.targetGroupFilter)
          properties.targetGroupTagsPrivateFilter = filterTargetGroupTags(properties, filter.targetGroupTagsFilter, 'private')
          properties.targetGroupTagsInstitutionFilter = filterTargetGroupTags(properties, filter.targetGroupTagsFilter, 'institution')
          properties.isFav = favs.includes(properties.autoid);
          properties.color = colorizer(properties.category);
          properties.colorLight = colorizerLight(properties.category);
          properties.isFiltered = true;

          return feat;
      });
      return Object.assign({}, data, { features });
    }
    }
)

export const filteredDataSelector = createSelector(
  [enrichedDataSelector, activeFilterSelector],
  (data, activeFilter) => {
    if (data) {
      const features = data.features
        .map((feat) => {

            let filter = 'category';

            switch(activeFilter) {
              case 'category':
                filter = feat.properties.categoryFilter || feat.properties.subCategoryFilter;
                break;
              case 'district':
                filter = feat.properties.districtFilter;
                break;
              case 'target':
                filter = feat.properties.targetGroupTypesFilter || feat.properties.targetGroupTagsPrivateFilter && feat.properties.targetGroupTagsInstitutionFilter
                break;
              default:
                filter = 'category';
                break;
            }

            feat.properties.isFiltered = (filter);
          return feat;
        })
      return Object.assign({}, data, { features });
    } else {
      return {};
    }
  }
);

export const filteredListDataSelector = createSelector(
  [filteredDataSelector, listSortingSelector],
  (data, sortBy) => {
    if (!data) {
      return [];
    }

    if (objectSize(data) > 0) {

      let features = data.features.filter(feat => (
        !feat.properties.isFiltered)
      );

      features = features
        .map(feat => feat.properties)
        .sort(sortData(sortBy));

      return features;
    }
  }
);

export const targetGroupsArraySelector = createSelector(
  [detailDataSelector],
  (data) => {
    if (data) {
      const keys = ['targetgroupprivate', 'targetgroupinstituion'];
      const keysOther = ['targetgroupinstituionother', 'targetgroupprivateother'];

      let arr = keys.map(key => {
        return data[key].map(val => {
            return val.text
        });
      })

      keysOther.forEach(key => {
        if (data[key].length > 0) {
          arr.push(data[key]);
        }
      });

      return arr.flat();
    }
  }
)

export const favoritesSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    if (data) {
      const features = data.features.filter(feat => feat.properties.isFav);
      return geojsonToArray(Object.assign({}, data, { features }));
    }
  }
);

export default {
  dataAsArraySelector,
  targetGroupsArraySelector,
  filteredListDataSelector,
  favoritesSelector,
  enrichedDataSelector,
  instPerDistrictSelector,
  tagsCountSelector,
  tagsCountTargetGroupSelector
};