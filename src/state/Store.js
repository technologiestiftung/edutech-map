import createStore from 'unistore';

import { getFavs, subCategories, subCategoriesEmpty, targetGroups, targetGroupTypes } from './dataUtils';
import config from '../../config';

export const filterSection = {
  categoryFilter: ['service', 'hardware', 'media', 'app'],
  districtFilter: false,
  subCategoryFilter: Object.assign({}, subCategories),
  targetGroupFilter: ['private', 'institution'],
  targetGroupTagsFilter: Object.assign({}, targetGroups)
};

const Store = createStore({
  isLoading: true,
  additionalData: {
    districts: null
  },
  categories: ['app', 'service', 'media', 'hardware'],
  targetGroupTypes: ['institution', 'private'],
  data: null,
  info: null,
  activeP: false,
  local: false,
  instPerDistrict: null,
  detailData: false,
  selectedData: false,
  mapCenter: config.position,
  mapZoom: config.zoom,
  listSorting: 'name',
  subCategoryList: Object.assign({}, subCategories),
  subCategories: [],
  highlightData: false,
  tooltipPos: [0, 0],
  favs: getFavs(),
  tooltipData: false,
  colorizer: () => '#bbb',
  colorizerLight: () => '#bbb',
  filter: filterSection,
});

export default Store;
