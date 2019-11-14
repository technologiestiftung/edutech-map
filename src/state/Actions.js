// import fetch from 'unfetch';
import config from "../../config";
import base64 from "base-64";

const createPoint = d => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [d['Adresse']['lng'], d['Adresse']['lat']],
    },
    properties: {
      ...d // spread notation: expanding a set of properties inside an object or an array
    }
});

export const loadDataAPI = (Store) => async () => {
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
    .then(d => d.data.content.institution)
    return { data, isLoading: false }
  } catch (err) {
    console.log(err);
    return { isLoading: false };
  }
};

export const loadData = (Store) => async () => {
  Store.setState({ isLoading: true });
  const dataPath = "../../public/data/data.json";
  try {
    const data = await fetch(dataPath)
      .then(json => (json.json()))
      .then(d => (d))

    // convert array into geojson
    const features = data
      .map(createPoint);

    const parsedData = {
      type: 'FeatureCollection',
      features
    };

    return { data: parsedData, isLoading: false }
  } catch (err) {
    console.log(err);
    return { isLoading: false };
  }
};

export default (Store) => ({
  loadDataAPI: loadDataAPI(Store),
  loadData: loadData(Store),
});