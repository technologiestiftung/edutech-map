// import fetch from 'unfetch';
import config from "../../config";
import base64 from "base-64";
import history from '~/history';
import { isMobile } from '~/utils';
import { getUniqueSubCategories, getColorizer } from './DataUtils';

const createArray = (d) => {
  const key = `categories${d['category']}`;
  return d[key].map(d => (d.text))
}

const createPoint = d => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(d['location'][0]['lng'].replace(',','.')), parseFloat(d['location'][0]['lat'].replace(',','.'))],
    },
    properties: {
      ...d,
      categoriesSelected: createArray(d)
    }
});

export const loadEntryData = Store => async (state, detailId) => {
  if (!detailId) return { detailData: false };
  Store.setState({ isLoading: true });

  try {
    // insert API fetch here!
    // const data = await fetchJSON(`${config.api.base}${config.api.locations}/${detailId}`);

    const coordinates = [data.standort.lat, data.standort.lng];
    // data.tags = data.tags.map(t => t.name);
    // [data.mainCategory] = data.tags;

    return {
      mapCenter: coordinates,
      mapZoom: [Math.max(14, state.mapZoom)],
      detailData: data,
      isLoading: false,
      subCategories: getUniqueSubCategories(data.categoriesSelected)
    };
  } catch (err) {
    return { isLoading: false };
  }
};

export const loadDataApi = (Store) => async () => {
  Store.setState({ isLoading: true });

  try {
    const data = await fetch(config.api.url,
      {
        headers: new Headers({
        "Authorization": `Basic ${base64.encode(`${config.api.username}:${config.api.password}`)}`
        })
      }
    )
    .then(json => json.json())
    .then(d => { return d.data.content.institution })

    // convert array into geojson
    const features = data
      .map(createPoint);

    const parsedData = {
      type: 'FeatureCollection',
      features
    };

    const colorizer = getColorizer(Store.getState().categories);

    return {
      data: parsedData,
      isLoading: false,
      subCategories: getUniqueSubCategories(parsedData),
      colorizer
    }
  } catch (err) {
    console.log(err);
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
    detailData: false
  };
};

const setTooltipData = (state, tooltipData) => (
  { tooltipData }
);

const setTooltipPos = (state, tooltipPos) => (
  { tooltipPos }
);

export default (Store) => ({
  loadDataApi: loadDataApi(Store),
  setTooltipData,
  setTooltipPos,
  setDetailRoute,
  loadEntryData
});