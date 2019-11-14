import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

// import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';
// import LocationFilterLayer from '../Layers/LocationFilterLayer';
// import IsolineLayer from '../Layers/IsolineLayer';

class FilterView extends PureComponent {
  render() {
    const { data, detailData } = this.props;

    return (
      <Fragment>
        {/* <DistrictLayer /> */}
        <MarkerLayer data={data} />
        {/* {detailData && <IsolineLayer detailData={detailData} />} */}
        {/* <LocationFilterLayer /> */}
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: state.data,
}), Actions)(FilterView);
