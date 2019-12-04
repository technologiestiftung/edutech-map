import { createSelector } from 'reselect';

const dataSelector = state => state.data;
const detailDataSelector = state => state.detailData;
const favsSelector = state => state.favs;

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
    dataSelector, favsSelector
  ],
  (
    data, favs
  ) => {
    const features = data.features
    .map((feat) => {
        const { properties } = feat;
        feat.properties = properties;
        properties.isFav = favs.includes(properties.name);
        return feat;
  });
  return Object.assign({}, data, { features });
  }
)

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
    console.log(data);
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