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
  data: [],
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  filter: filterSection
});

export default Store;
