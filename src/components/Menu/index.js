import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, matchPath } from 'react-router-dom';

import RoundButton from '~/components/RoundButton';
import { media } from '~/styles/Utils';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  ${media.m`
    transform: ${props => (props.isMenuOpen ? 'translate3d(375px, 0, 0)' : 'none')};
    transition: transform 500ms;
  `}
`;

const MenuItem = styled(NavLink)`
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;


const menuConfig = [
//   { path: '/suche', title: 'Suche und Filter', icon: <FilterIcon /> },
//   { path: '/liste', title: 'Listenansicht', icon: <ListIcon /> },
//   { path: '/favoriten', title: 'Favoriten', icon: <FavIcon /> },
//   { path: '/analyse', title: 'Analyse', icon: <AnalyseIcon /> },
  { path: '/info', title: 'Info', icon: 'i' },
];

class Menu extends PureComponent {
  render() {
    const { pathname } = this.props.location;
    const isMenuOpen = matchPath(pathname, {
      path: menuConfig.map(m => m.path),
    }) !== null;

    return (
      <MenuWrapper isMenuOpen={isMenuOpen}>
        {menuConfig.map(m => (
          <MenuItem
            exact
            to={{ pathname: m.path, search: this.props.location.search }}
            key={m.path}
          >
            <RoundButton title={m.title} aria-label={m.title} isActive={pathname === m.path}>
              {m.icon}
            </RoundButton>
          </MenuItem>
        ))}
      </MenuWrapper>
    );
  }
}

export default withRouter(Menu);
