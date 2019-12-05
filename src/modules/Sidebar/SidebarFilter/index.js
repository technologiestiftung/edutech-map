import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import ResetFilter from './ResetFilter';
import SidebarTitle from '../SidebarTitle';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import DetailCard from '~/components/Card/Detail';
// import DistrictFilter from './DistrictFilter';
// import LocationFilter from './LocationFilter';


class SidebarFilter extends PureComponent {
  render() {
    const { selectedData, detailData } = this.props;
    return (
      <Fragment>
        { (selectedData && detailData) && (
          <DetailCard data={detailData}/>
        )}
        { !selectedData && (
        <Fragment>
          <SidebarTitle>
            Suche
          </SidebarTitle>
          <ResetFilter />
          <SearchFilter />
          <CategoryFilter />
          {/* <DistrictFilter />
          <AccessibilityFilter />
          <LocationFilter /> */}
        </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  selectedData: state.selectedData,
  detailData: state.detailData
}), Actions)(SidebarFilter);
