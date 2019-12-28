import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import styled from 'styled-components';

import ResetFilter from './ResetFilter';
import SidebarTitle from '../SidebarTitle';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import TargetGroupFilter from './TargetGroupFilter';
import DetailCard from '~/components/Card/Detail';
import CardDivider from '~/components/Card/CardDivider';
import SidebarSubtitle from '~/modules/Sidebar/SidebarSubtitle';
import DistrictFilter from './DistrictFilter';
// import LocationFilter from './LocationFilter';

const StyledDivider = styled(CardDivider)`
  margin: 30px 0;
  transform: translateX(-15px);
  width: 375px;
  border-top: 1px solid #ddd;
`;


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
          <StyledDivider />
          <SidebarSubtitle>Leistungsangebot</SidebarSubtitle>
          <CategoryFilter />
          <StyledDivider />
          <SidebarSubtitle>Bezirk</SidebarSubtitle>
          <DistrictFilter />
          <StyledDivider />
          <SidebarSubtitle>Zielgruppe</SidebarSubtitle>
          <TargetGroupFilter />
        </Fragment>
        )}
        { (!detailData && selectedData) && (null) }
      </Fragment>
    );
  }
}

export default connect(state => ({
  selectedData: state.selectedData,
  detailData: state.detailData
}), Actions)(SidebarFilter);
