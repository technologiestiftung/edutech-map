import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector, instPerDistrictSelector } from '~/state/Selectors';

import MarkerLayer from '../Layers/MarkerLayer';

class FilterView extends PureComponent {

  componentDidMount() {
    this.props.loadFilterData();
  }

  render() {
    const { data, isLoading } = this.props;

    if (data) {
      return (
        <Fragment>
          <MarkerLayer if={data && !isLoading} data={data} />
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
  labels: instPerDistrictSelector(state),
  isLoading: state.isLoading
}), Actions)(FilterView);
