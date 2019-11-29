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
    const feat = dataAll.features;

    const all = feat.map(item => {
      return {
        ...item.properties
      }
    })

    const filtered = all.filter(i => i.id === detailId)[0];

    const coordinates = [parseFloat(filtered.location[0].lng.replace(',', '.')), parseFloat(filtered.location[0].lat.replace(',', '.'))];
    // data.tags = data.tags.map(t => t.name);
    // [data.mainCategory] = data.tags;


    return {
      mapCenter: coordinates,
      mapZoom: [Math.max(14, state.mapZoom)],
      detailData: filtered,
      isLoading: false,
    };
  } catch (err) {
    console.log(err)
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

    const colorizer = getColorizer(Store.getState().categories, 'dark');
    const colorizerLight = getColorizer(Store.getState().categories, 'light');

    return {
      data: parsedData,
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

const setDetailRoute = (state, id = false) => {
  if (id) {
    const nextLocation = isMobile ? `/?location=${id}` : `?location=${id}`;
    return history.push(nextLocation);
  }

  console.log(state, 'sadsda');
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
  loadEntryData: loadEntryData(Store)
});