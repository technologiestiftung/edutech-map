import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import { dataAsArraySelector } from '~/state/Selectors'

import CardCompact from '~/components/Card/CardCompact';

import SidebarTitle from '../SidebarTitle';
// import Sorter from './Sorter';
// import ResetFilter from '../SidebarFilter/ResetFilter';

const ListItems = styled.div``;

class SidebarList extends PureComponent {
  componentDidUpdate() {
    console.log(this.props)
  }
  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <SidebarTitle><strong>{data.length}</strong> Institutionen gefunden.</SidebarTitle>
        <ListItems>
          {data.map(d => (
            <CardCompact
              // key={d.id}
              data={d}
              // onClick={() => setDetailRoute(d.id)}
              // onMouseEnter={() => setHighlightData(d)}
              // onMouseLeave={() => setHighlightData(false)}
            />
          ))}
        </ListItems>
      </Fragment>
    )
  }
};

export default connect(state => ({
  data: dataAsArraySelector(state)
}), Actions)(SidebarList);