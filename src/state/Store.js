import createStore from 'unistore';

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
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  subCategories: [],
  tooltipPos: [0, 0],
  tooltipData: false,
  colorizer: () => '#bbb',
  filter: filterSection,
  colorizer: () => '#bbb',
});

export default Store;
