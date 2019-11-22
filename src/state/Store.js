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
  data: null,
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  tooltipPos: [0, 0],
  tooltipData: false,
  filter: filterSection,
  colorizer: () => '#bbb',
});

export default Store;
