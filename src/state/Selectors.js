import { createSelector } from 'reselect';

import {
  filterCategories,
  getSubCategoryLabel,
  filterSubCategories
} from './dataUtils';

const dataSelector = state => state.data;
const detailDataSelector = state => state.detailData;
const favsSelector = state => state.favs;
const filterSelector = state => state.filter;
const colorizerSelector = state => state.colorizer;
const colorizerLightSelector = state => state.colorizerLight;

const geojsonToArray = geojson => geojson.features.map(d => d.properties);

export const dataAsArraySelector = createSelector(
  [dataSelector],
  (data) => {
    if (!data) {
      return [];
    }
    return geojsonToArray(data);
  }
);

export const enrichedDataSelector = createSelector(
  [
    dataSelector,
    favsSelector,
    filterSelector,
    colorizerSelector,
    colorizerLightSelector,
  ],
  (
    data,
    favs,
    filter,
    colorizer,
    colorizerLight
  ) => {
    const features = data.features
    .map((feat) => {
      const { properties } = feat;
      feat.properties = properties;
      properties.categoryFilter = filterCategories(properties, filter.categoryFilter);
      properties.subCategoryFilter = filterSubCategories(properties, filter.subCategoryFilter);
      properties.isFav = favs.includes(properties.name);
      properties.color = colorizer(properties.category);
      properties.colorLight = colorizerLight(properties.category);
      properties.isFiltered = false;
      return feat;
  });
  return Object.assign({}, data, { features });
  }
)

export const filteredDataSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    const features = data.features
      .map((feat) => {
        feat.properties.isFiltered = (
          feat.properties.categoryFilter ||
          feat.properties.subCategoryFilter
          /* || feat.properties.districtFilter
          || feat.properties.locationFilter 
          || feat.properties.a11yFilter
          || feat.properties.fundedFilter */
        );
        return feat;
      })
      // .sort(sortData('properties.isFiltered', 'dec'));
    return Object.assign({}, data, { features });
  }
);

export const targetGroupsArraySelector = createSelector(
  [detailDataSelector],
  (data) => {
    const keys = ['targetgroupprivate', 'targetgroupinstituion'];
    const keysOther = ['targetgroupinstituionother', 'targetgroupprivateother'];

    let arr = keys.map(key => {
      return data[key].map(val => (val.text));
    })

    keysOther.forEach(key => {
      if (data[key].length > 0) {
        arr.push(data[key]);
      }
    });

    return arr.flat();
  }
)

export const favoritesSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    const features = data.features.filter(feat => feat.properties.isFav);
    return geojsonToArray(Object.assign({}, data, { features }));
  }
);

export default {
  dataAsArraySelector,
  targetGroupsArraySelector,
  favoritesSelector,
  enrichedDataSelector
};