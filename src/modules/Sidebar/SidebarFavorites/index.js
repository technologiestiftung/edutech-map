import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { favoritesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import CardCompact from '~/components/Card/CardCompact';
import DetailCard from '~/components/Card/Detail';

import SidebarTitle from '../SidebarTitle';

const DetailTitle = styled(SidebarTitle)`
  margin-bottom: ${props => props.theme.padding[0]}
`;

const ListItems = styled.div``;

const EmptyFavorites = () => (
  <div>Noch keine Favoriten vorhanden.</div>
);

class SidebarList extends PureComponent {

  handleClick = (d) => {
    const { setDetailRoute, setSelectedData } = this.props;
    setDetailRoute(d.name);
    setSelectedData(true);
  }

  render() {
    const { data, setDetailRoute, selectedData, detailData } = this.props;

    return (
      <Fragment>
        { (selectedData && detailData) && (
          <DetailCard data={detailData}/>
        ) }
        { !selectedData && (
          <Fragment>
            <SidebarTitle>Favoriten</SidebarTitle>
            <ListItems>
              {!data.length && <EmptyFavorites />}
              {data.map(d => (
                <CardCompact onClick={() => this.handleClick(d)} key={d.id} data={d} />
              ))}
            </ListItems>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: favoritesSelector(state),
  selectedData: state.selectedData,
  detailData: state.detailData
}), Actions)(SidebarList);