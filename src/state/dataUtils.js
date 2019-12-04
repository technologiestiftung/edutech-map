import turfBbox from '@turf/bbox';
import { scaleOrdinal } from 'd3-scale';
const config = require('../../config.json');
import Store from 'store';

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

export const getUniqueSubCategories = (data) => {
  const allCategories = data.features
    .map(d => d.properties.categoriesSelected)
    .reduce((acc, value) => acc.concat(value), []);
  return [...new Set(allCategories)];
};

export const getColorizer = (uniqueCategories, type) => {
  const t = type === 'light' ? 'colorsLight' : 'colors';

  const normalizedCategories = uniqueCategories.map(cat => cat.toLowerCase());
  const colorScale = scaleOrdinal().domain(normalizedCategories).range(config[t]);

  return (category) => {
    const loweredCategory = category ? category.toString().toLowerCase() : '';
    return normalizedCategories.includes(loweredCategory) ? colorScale(loweredCategory) : '#bbb';
  };
};

export const getFavs = () => Store.get(config.localStorage.favKey) || [];

export const setFavs = favs => Store.set(config.localStorage.favKey, favs);

export default {
  getColorizer,
  getUniqueSubCategories,
  getFavs,
  setFavs
};