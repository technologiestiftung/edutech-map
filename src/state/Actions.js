// import fetch from 'unfetch';
import config from "../../config";
import base64 from "base-64";
import history from '~/history';
import { isMobile } from '~/utils';
import { getUniqueSubCategories, getColorizer } from './DataUtils';

const createArray = (d) => {
  const key = `categories${d['category']}`;
  if (d[key]) {
    return d[key].map(d => (d.text))
  } else {
    return [];
  }
}

const createPoint = d => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(d['location'][0]['lng'].replace(',','.')), parseFloat(d['location'][0]['lat'].replace(',','.'))],
    },
    properties: {
      ...d,
      categoriesSelected: createArray(d)
    }
  };
};

export const loadEntryData = Store => async (state, detailId) => {
  if (!detailId) return { detailData: false };
  Store.setState({ isLoading: true });

  const dataAll = Store.getState().data;

  try {
    if (dataAll) {
      const feat = dataAll.features;

      const all = feat.map(item => {
        return {
          ...item.properties
        }
      })

      const filtered = all.filter(i => i.name === detailId)[0];

      const coordinates = [parseFloat(filtered.location[0].lng.replace(',', '.')), parseFloat(filtered.location[0].lat.replace(',', '.'))];

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
    "Authorization": `Basic ${base64.encode(`${config.api.username}:${config.api.password}`)}`
    })
  }

  try {
    const data = await fetch(config.api.url, credentials)
      .then(json => json.json())
      .then(d => { return d.data.content.institution })

    const content = await fetch(config.api.urlInfo, credentials)
      .then(json => json.json())
      .then(d => { return d.data.content })

    const features = data
      .map(createPoint);

    const parsedData = {
      type: 'FeatureCollection',
      features
    };

    const colorizer = getColorizer(Store.getState().categories, 'dark');
    const colorizerLight = getColorizer(Store.getState().categories, 'light');

    return {
      data: parsedData,
      content: content,
      isLoading: false,
      subCategories: getUniqueSubCategories(parsedData),
      colorizer,
      colorizerLight
    }
  } catch (err) {
    console.log(err);
    return { isLoading: false };
  }
};

export const setHighlightData = (state, highlightData) => {
  return { highlightData };
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

const setDetailData = (state, detailData) => ({ detailData })
const setSelectedData = (state, selectedData) => ({ selectedData })

const setTooltipData = (state, tooltipData) => (
  { tooltipData }
);

const setTooltipPos = (state, tooltipPos) => (
  { tooltipPos }
);

export default (Store) => ({
  loadDataApi: loadDataApi(Store),
  setTooltipData,
  setDetailData,
  setTooltipPos,
  setSelectedData,
  setDetailRoute,
  setHighlightData,
  loadEntryData: loadEntryData(Store)
});