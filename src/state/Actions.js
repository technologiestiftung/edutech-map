// import fetch from 'unfetch';
// import config from "../../config";

export const loadData = (Store) => async () => {
  Store.setState({ isLoading: true });
  let data = null;

  try {
    // fetch(config.api.urlStrapi)
    //   .then(json => console.log(json.json()));
    data = [{ name: 'edutech company', location: [52.545951, 13.361694] }]
  } catch (err) {
    console.log(err);
  }
  return { data, isLoading: false };

};

export default (Store) => ({
  loadData: loadData(Store)
});