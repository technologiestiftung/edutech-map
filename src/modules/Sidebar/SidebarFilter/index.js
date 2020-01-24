import React, { PureComponent, Fragment, useState } from 'react';
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


const SidebarFilter = p => {

    const { selectedData, detailData, instPerDistrict, isLoading } = p;
    const [active, setActive] = useState(0)

    return (
      <Fragment>
        { (selectedData && detailData && instPerDistrict) && (
          <DetailCard data={detailData}/>
        )}
        { !selectedData && !isLoading && (
        <Fragment>
          <SidebarTitle>
            Suche
          </SidebarTitle>
          <ResetFilter />
          <SearchFilter />
          <StyledDivider />
          <SidebarSubtitle>Leistungsangebot</SidebarSubtitle>
          <CategoryFilter active={active} />
          <StyledDivider />
          <SidebarSubtitle>Bezirk</SidebarSubtitle>
          <DistrictFilter active={active} data={instPerDistrict}/>
          <StyledDivider />
          <SidebarSubtitle>Zielgruppe</SidebarSubtitle>
          <TargetGroupFilter active={active} />
        </Fragment>
        )}
        { (!detailData && selectedData) && (null) }
      </Fragment>
    );
}

export default connect(state => ({
  selectedData: state.selectedData,
  detailData: state.detailData,
  instPerDistrict: state.instPerDistrict,
}), Actions)(SidebarFilter);
