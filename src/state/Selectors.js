const districtDataSelector = state => state.additionalData.districts;
const districtFilterSelector = state => state.filter.districtFilter;

export const districtBoundsSelector = createSelector(
    [districtDataSelector, districtFilterSelector],
    (districtData, districtFilter) => {
      if (!districtFilter || !districtData) {
        return false;
      }
  
      const selectedDistrict = districtData.features
        .find(feat => feat.properties.spatial_name === districtFilter);
  
      return selectedDistrict && getDistrictBounds(selectedDistrict);
    }
);