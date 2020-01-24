import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector, instPerDistrictSelector } from '~/state/Selectors';

import MarkerLayer from '../Layers/MarkerLayer';
import LabelLayer from '../Layers/LabelLayer';

class FilterView extends PureComponent {

  componentDidMount() {
    this.props.loadFilterData();
  }

  render() {
    const { data, detailData, isLoading, labels } = this.props;

    console.log(labels, 'asldkjaslkdj')

    if (data) {
      return (
        <Fragment>
          <MarkerLayer if={data && !isLoading} data={data} />
          <LabelLayer if={labels && !isLoading} data={labels} />
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
