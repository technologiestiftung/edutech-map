import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, matchPath } from 'react-router-dom';

import Actions from '~/state/Actions';

import { connect } from 'unistore/react';

import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchIcon from '@material-ui/icons/Search';

import EdgeButton from '~/components/EdgeButton';
import { media } from '~/styles/Utils';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: ${ props => props.theme.boxShadow };
  flex-grow: 0;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  ${media.m`
    transform: ${props => (props.isNavOpen ? 'translate3d(375px, 0, 0)' : 'none')};
    transition: transform 500ms;
  `}
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;


const navConfig = [
  { path: '/suche', title: 'Suche und Filter', icon: <SearchIcon /> },
  { path: '/liste', title: 'Listenansicht', icon: <ListIcon /> },
  { path: '/favoriten', title: 'Favoriten', icon: <FavIcon /> },
  { path: '/info', title: 'Info', icon: <InfoIcon/> },
];

class Nav extends PureComponent {

  handleClick(path) { 

    if (path === 'Listenansicht' || path === 'Favoriten' || path == 'Suche und Filter' ) {
      this.props.setSelectedData(false);
      this.props.setDetailData(false)
      this.props.setMapCenter([13.4124999, 52.5040961])
    }

  }

  render() {
    const { pathname } = this.props.location;

    const isNavOpen = matchPath(pathname, {
      path: navConfig.map(m => m.path),
    }) !== null;

    return (
      <NavWrapper isNavOpen={isNavOpen}>
        {navConfig.map(m => (
          <NavItem
            exact
            to={{ pathname: m.path, search: this.props.location.search }}
            onClick={() => (this.handleClick(m.title))}
            key={m.path}
          >
            <EdgeButton title={m.title} aria-label={m.title} isActive={pathname === m.path}>
              {m.icon}
            </EdgeButton>
          </NavItem>
        ))}
      </NavWrapper>
    );
  }
}

export default withRouter(connect(state => ({
  detailData: state.detailData
}), Actions)(Nav));
