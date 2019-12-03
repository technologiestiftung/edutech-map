import { createSelector } from 'reselect';

const dataSelector = state => state.data;
const detailDataSelector = state => state.detailData;

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

export default {
  dataAsArraySelector,
  targetGroupsArraySelector
};