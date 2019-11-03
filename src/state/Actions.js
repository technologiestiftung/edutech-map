import fetch from 'unfetch';
import base64 from 'base-64';

import config from "../../config";


const loadData = (Store) => async () => {
  Store.setState({ isLoading: true });

  let data = null;
  try {
    let headers = new Headers();

    //headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + base64.encode(config.api.username + ":" + config.api.password));

    fetch(config.api.url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
          })
    .then(json => console.log(json));
    //.done();

  } catch (err) {
    console.log(err);
  }
  return { data, isLoading: false };
};

export default (Store) => ({
  loadData: loadData(Store)
});







