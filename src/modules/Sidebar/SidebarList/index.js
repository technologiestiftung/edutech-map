import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import { dataAsArraySelector } from '~/state/Selectors'

import CardCompact from '~/components/Card/CardCompact';
import DetailCard from '~/components/Card/Detail';

import SidebarTitle from '../SidebarTitle';
// import Sorter from './Sorter';
// import ResetFilter from '../SidebarFilter/ResetFilter';

const DetailTitle = styled(SidebarTitle)`
  margin-bottom: ${props => props.theme.padding[0]}
`;

const ListItems = styled.div``;

class SidebarList extends PureComponent {

  handleClick = (d) => {
    const { setDetailRoute, setSelectedData } = this.props;
    setDetailRoute(d.name);
    setSelectedData(true);
  }

  render() {
    const { data, setDetailRoute, setHighlightData, selectedData, detailData } = this.props;

    console.log(detailData);

    if (selectedData && detailData) {
      return (
        <Fragment>
          <DetailTitle>{detailData.name}</DetailTitle>
          <DetailCard data={detailData}/>
        </Fragment>
      )
    } if (!detailData && selectedData) {

      return (
        <Fragment></Fragment>
      )

    } else if (!selectedData) {
      return (
        <Fragment>
          <SidebarTitle><strong>{data.length}</strong> Institutionen gefunden.</SidebarTitle>
          <ListItems>
            {data.map((d,i) => (
              <CardCompact
                key={`item-${i}`}
                data={d}
                onClick={() => this.handleClick(d)}
                onMouseEnter={() => setHighlightData(d)}
                onMouseLeave={() => setHighlightData(false)}
              />
            ))}
          </ListItems>
        </Fragment>
      )
    }

  }
};

export default connect(state => ({
  data: dataAsArraySelector(state),
  selectedData: state.selectedData,
  detailData: state.detailData
}), Actions)(SidebarList);