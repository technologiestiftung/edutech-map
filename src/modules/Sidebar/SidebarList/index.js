import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import { filteredListDataSelector, dataAsArraySelector } from '~/state/Selectors'

import CardCompact from '~/components/Card/CardCompact';
import DetailCard from '~/components/Card/Detail';
import SidebarTitle from '../SidebarTitle';

import Sorter from './Sorter';

const ListItems = styled.div``;

class SidebarList extends PureComponent {

  render() {
    const {
      data,
      setDetailRoute,
      setHighlightData,
      selectedData,
      detailData,
    } = this.props;

    return (
      <Fragment>
        { (selectedData && detailData) && (
          <DetailCard data={detailData} />
        ) }
        { data && !selectedData && (
          <Fragment>
            <SidebarTitle><strong>{data.length}</strong> Institutionen gefunden.</SidebarTitle>
            <Sorter />
            <ListItems>
              {data.map((d,i) => (
                <CardCompact
                  key={`item-${i}`}
                  data={d}
                  onMouseEnter={() => setHighlightData(d)}
                  onMouseLeave={() => setHighlightData(false)}
                />
              ))}
            </ListItems>
          </Fragment>
        )}
        { (!detailData && selectedData) && (null) }
      </Fragment>
    )

  }
};

export default connect(state => ({
  data: filteredListDataSelector(state),
  selectedData: state.selectedData,
  detailData: state.detailData
}), Actions)(SidebarList);
