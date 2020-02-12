// import fetch from 'unfetch';
import config from "../../config";
import base64 from "base-64";
import history from '~/history';
import xor from 'lodash.xor';
import { isMobile, fetchTopoJSON, fetchJSON } from '~/utils';
import { getUniqueSubCategories, getColorizer, setFavs, targetGroups, featOutOfBounds, countInstPerDistrict } from './dataUtils';
import pointInPolygon from '@turf/boolean-point-in-polygon';


const createArray = (d, type) => {
  const key = `categories${d['category']}`;
  if (d[key]) {
    return d[key].map(d => (d[type]))
  } else {
    return [];
  }
}

const createTargetGroupTags = (d) => {
  let arr = ['private', 'instituion', 'instituionother', 'privateother'];
  arr = arr.map(key => {
    const concattedKey = `targetgroup${key}`;
    if (d[concattedKey]) {
      if (typeof d[concattedKey] === 'object') {
        return d[concattedKey].map(d => (d['value']))
      } else if (typeof d[concattedKey] === String && d[concattedKey] != undefined) {
        return d[concattedKey];
      } else {
        return [];
      }
    }
  })
  return arr.flat()
}

const checkTargetGroups = (d) => {
  let arr = [];
  if (d) {
    if (d['targetgroupinstituion'] && d['targetgroupinstituion'].length > 0) {
      arr.push('institution')
    }

    if (d['targetgroupprivate'] && d['targetgroupprivate'].length > 0) {
      arr.push('private');
    }

  }
  return arr;
}

const createPoint = d => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [randomizeCoord(parseFloat(d['location'][0]['lng'].replace(',','.'))), randomizeCoord(parseFloat(d['location'][0]['lat'].replace(',','.')))],
    },
    properties: {
      ...d,
      categoriesSelected: createArray(d, 'text'),
      subCategoriesSelected: createArray(d, 'value'),
      targetGroupsSelected: checkTargetGroups(d),
      targetGroupTagsSelectedArr: createTargetGroupTags(d),
      outOfBounds: true
    }
  };
};

const randomizeCoord = (coord) => {
  const randomValue = Math.random() / 20000 + 0.0003;
  return Math.random() < .5 ? coord + randomValue : coord - randomValue;
};

export const loadEntryData = Store => async (state, detailId) => {
  if (!detailId) return { detailData: false };

  try {
    if (state.data) {
      const feat = state.data.features;

      const all = feat.map(item => {
        return {
          ...item.properties
        }
      })

      const filtered = all.filter(i => i.autoid === detailId)[0];
      const coordinates = [parseFloat(randomizeCoord(filtered.location[0].lng.replace(',', '.'))), parseFloat(randomizeCoord(filtered.location[0].lat.replace(',', '.')))];

      if (isNaN(coordinates[1])) {
        return {
          mapZoom: [Math.max(14, state.mapZoom)],
          detailData: filtered,
          isLoading: false,
        };
      } else {
        return {
          mapCenter: coordinates,
          mapZoom: [Math.max(14, state.mapZoom)],
          detailData: filtered,
          isLoading: false,
        };
      }

    }
  } catch (err) {
    console.log(err)
    return { isLoading: false };
  }
};

export const loadDataApi = (Store) => async () => {
  Store.setState({ isLoading: true });

  const credentials = {
    headers: new Headers({
    "Authorization": `Basic ${base64.encode(`${process.env.API_USER}:${process.env.API_PW}`)}`
    })
  }

  try {

    const data = await fetch(process.env.API_URL, credentials)
      .then(json => json.json())
      .then(d => { return d.data.content.institution })

    const content = await fetch(process.env.API_URL_INFO, credentials)
      .then(json => json.json())
      .then(d => { return d.data.content })

    const features = data
      .map(createPoint);

    const districtsCenter = await fetchJSON('/public/data/bezirke-zentrum.json');
    const districts = await fetchTopoJSON('/public/data/berliner-bezirke.json');

    let parsedData = {
      type: 'FeatureCollection',
      features
    };

    parsedData = featOutOfBounds(districts, parsedData);

    const institutionsPerDistrict = countInstPerDistrict(districts, parsedData, districtsCenter);

    const colorizer = getColorizer(Store.getState().categories, 'dark');
    const colorizerLight = getColorizer(Store.getState().categories, 'light');

    return {
      data: parsedData,
      content: content,
      subCategories: getUniqueSubCategories(parsedData),
      instPerDistrict: institutionsPerDistrict,
      colorizer,
      colorizerLight,
      mapZoom: [11],
      isLoading: false
    }

  } catch (err) {
    console.log(err);
    return { isLoading: true };
  }
};

export const setHighlightData = (state, highlightData) => {
  return { highlightData };
};

const loadFilterData = Store => async () => {
  try {
    const districts = await fetchTopoJSON('/public/data/berliner-bezirke.json');
    Store.setState({ isLoading: false });

    return {
      additionalData: {
        ...Store.getState().additionalData,
        districts
      }
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const setDetailRoute = (state, id = false) => {
  if (id) {
    const nextLocation = isMobile ? `/?location=${id}` : `?location=${id}`;
    return history.push(nextLocation);
  }

  history.push(history.location.pathname.replace(/\?location=.+/, ''));

  return {
    detailData: false,
  };
};

const resetDetailRoute = (state, id = false) => {

  history.push('');

  return {
    detailData: false,
  };
};



const setDetailRouteWithListPath = (state, id = false) => {
  if (id) {
    const nextLocation = isMobile ? `/liste/?location=${id}` : `/liste?location=${id}`;
    return history.push(nextLocation);
  }

  history.push(history.location.pathname.replace(/\?location=.+/, ''));

  return {
    detailData: false,
  };
};

const setDetailData = (state, detailData) => ({ detailData })
const setSelectedData = (state, selectedData) => ({ selectedData })
const setMapCenter = (state, mapCenter) => ({ mapCenter })

const setTooltipData = (state, tooltipData) => (
  { tooltipData }
);

const setTooltipPos = (state, tooltipPos) => (
  { tooltipPos }
);

const setDistrictFilter = (state, districtFilter) => {
  return {
    filter: Object.assign({}, state.filter, { districtFilter }),
    detailData: false
  }
};

const toggleFav = (state, favId) => {
  let { favs } = state;

  favs = xor(favs, [favId]);

  setFavs(favs);

  return { favs };
};

const toggleTargetGroupTypeFilter = (state, type, deactivate = false) => {
  let { targetGroupFilter, targetGroupTagsFilter } = state.filter;
  const { categories } = state;


  console.log(state,type)

  if (targetGroupFilter.includes(type) || deactivate) {

    targetGroupFilter = targetGroupFilter.filter(item => {
        return item !== type
    });

    targetGroupTagsFilter[type] = [];

  } else {
    targetGroupFilter.push(type);
    targetGroupTagsFilter[type] = targetGroups[type];
    targetGroupTagsFilter[type] = [];
  }

  const filter = Object.assign({}, state.filter, { targetGroupFilter });

  return { filter };
};

const toggleCategoryFilter = (state, category, deactivate = false) => {
  let { categoryFilter } = state.filter;
  const { categories } = state;

  if (categoryFilter.includes(category) || deactivate) {

    categoryFilter = categoryFilter.filter(item => {
        return item !== category
    });

  } else {
    categoryFilter.push(category);
  }

  const filter = Object.assign({}, state.filter, { categoryFilter });
  return { filter };
};

const setActiveFilter = (state, activeFilter) => ({
  activeFilter
});

const setFilter = (state, filter) => ({
  filter
});

const setListSorting = (state, listSorting) => ({
  listSorting
});

const setZoom = (state, mapZoom) => ({
  mapZoom
});

const toggleSubCategoryFilter = (state, category, subcategory) => {
  let { subCategoryFilter } = state.filter;
  let subCategories = subCategoryFilter[category];

  if (subCategories.includes(subcategory)) {
    subCategoryFilter[category] = subCategories.filter(item => {
      return item !== subcategory
    });
  } else {
    subCategoryFilter[category].push(subcategory)
  }

  const filter = Object.assign({}, state.filter, { subCategoryFilter });
  return { filter };
}

const toggleTargetGroupTagFilter = (state, type, targetGroup) => {
  let { targetGroupTagsFilter } = state.filter;
  let targetGroupTags = targetGroupTagsFilter[type];

  if (targetGroupTags.includes(targetGroup)) {
    targetGroupTagsFilter[type] = targetGroupTags.filter(item => {
      return item !== targetGroup
    });
  } else {
    targetGroupTagsFilter[type].push(targetGroup)
  }

  const filter = Object.assign({}, state.filter, { targetGroupTagsFilter });
  return { filter };
}

export default (Store) => ({
  loadDataApi: loadDataApi(Store),
  setTooltipData,
  setDetailData,
  setFilter,
  setTooltipPos,
  toggleFav,
  setZoom,
  setDistrictFilter,
  resetDetailRoute,
  setSelectedData,
  setDetailRoute,
  setDetailRouteWithListPath,
  setHighlightData,
  toggleCategoryFilter,
  setActiveFilter,
  toggleSubCategoryFilter,
  toggleTargetGroupTagFilter,
  toggleTargetGroupTypeFilter,
  setMapCenter,
  setListSorting,
  loadEntryData: loadEntryData(Store),
  loadFilterData: loadFilterData(Store)
});