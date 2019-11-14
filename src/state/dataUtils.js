import turfBbox from '@turf/bbox';

export const getDistrictBounds = districtFeature => (
    turfBbox(districtFeature)
  );