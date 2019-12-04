import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector } from '~/state/Selectors';

// import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';
// import LocationFilterLayer from '../Layers/LocationFilterLayer';
// import IsolineLayer from '../Layers/IsolineLayer';

class FilterView extends PureComponent {

  render() {
    const { data, detailData, isLoading } = this.props;

    if (data) {
      return (
        <Fragment>
          {/* <DistrictLayer /> */}
          <MarkerLayer if={data} data={data} />
          {/* {detailData && <IsolineLayer detailData={detailData} />} */}
          {/* <LocationFilterLayer /> */}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
        </Fragment>
      )
    }

  }
}

export default connect(state => ({
  data: filteredDataSelector(state),
  isLoading: state.isLoading
}), Actions)(FilterView);
