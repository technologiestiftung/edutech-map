import createStore from 'unistore';

import { getFavs } from './dataUtils';

export const filterSection = {
  categoryFilter: [],
  districtFilter: false,
};

const Store = createStore({
  isLoading: true,
  additionalData: {
    districts: []
  },
  categories: ['app', 'service', 'media', 'hardware'],
  data: null,
  info: null,
  detailData: false,
  selectedData: false,
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
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
