import { createSelector } from 'reselect';

const dataFeaturesSelector = state => state.data.features;

export const dataPropsSelector = createSelector(
  [dataFeaturesSelector],
  features => {
    if (features) {
      const feat = features.map(features => ( features.properties ));
      return feat;
    } else {
      return [];
    }
  }
)

export default {
  dataPropsSelector
};