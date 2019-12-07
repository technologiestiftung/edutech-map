import createStore from 'unistore';

import { getFavs, subCategories, targetGroups, targetGroupTypes } from './dataUtils';
import config from '../../config';

export const filterSection = {
  categoryFilter: ['service', 'hardware', 'media', 'app'],
  subCategoryFilter: Object.assign({}, subCategories),
  targetGroupFilter: ['private', 'institution'],
  targetGroupTagsFilter: Object.assign({}, targetGroups)
};

const Store = createStore({
  isLoading: true,
  additionalData: {
    districts: []
  },
  categories: ['app', 'service', 'media', 'hardware'],
  targetGroupTypes: ['institution', 'private'],
  data: null,
  info: null,
  local: false,
  detailData: false,
  selectedData: false,
  mapCenter: config.position,
  mapZoom: config.zoom,
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
