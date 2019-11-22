import { createSelector } from 'reselect';

const dataSelector = state => state.data;

const geojsonToArray = geojson => geojson.features.map(d => d.properties);

export const dataAsArraySelector = createSelector(
  [dataSelector],
  (data) => {
    if (!data) {
      return [];
    }

    console.log(data);

    return geojsonToArray(data);
  }
);

export default {
  dataAsArraySelector
};