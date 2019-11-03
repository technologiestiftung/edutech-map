import fetch from 'unfetch';
import config from '../../config';

const loadData = (Store) => async () => {
  Store.setState({ isLoading: true });

  let data = null;
  try {
    console.log(config)
    const res = await fetch('public/data/sample.json');
    data = await res.json();
  } catch (err) {
    console.log(err);
  }
  return { data, isLoading: false };
};

export default (Store) => ({
  loadData: loadData(Store)
});
