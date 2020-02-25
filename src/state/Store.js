import createStore from 'unistore';

import { getFavs, subCategories, subCategoriesEmpty, targetGroups, targetGroupTypes, targetGroupsEmpty } from './dataUtils';
import config from '../../config';

export const filterSection = {
  categoryFilter: [],
  districtFilter: false,
  subCategoryFilter: Object.assign({}, subCategoriesEmpty),
  targetGroupFilter: [],
  targetGroupTagsFilter: Object.assign({}, targetGroupsEmpty)
};

const Store = createStore({
  isLoading: true,
  additionalData: {
    districts: null
  },
  categories: ['app', 'media', 'service', 'hardware'],
  targetGroupTypes: ['private', 'institution'],
  data: null,
  info: null,
  activeFilter: 'category',
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
