import React from 'react';
import styled from 'styled-components';
import { matchPath, useLocation } from 'react-router-dom';

import Actions from '~/state/Actions';
import RoundButton from '~/components/RoundButton';
import { unfilteredFilterSelector, initialFilterSelector } from '~/state/Selectors';

import { connect } from 'unistore/react';

const StyledRoundButton = styled(RoundButton)`
  margin-top: 5px;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.sans};
  font-size: 22px;
  line-height: 1;

  div {
    position: relative;
    top: 1px;
  }
`;

import { media } from '~/styles/Utils';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  position: absolute;
  background: none;
  bottom: 15px;
  left: 15px;
  z-index: 1000;

  ${media.m`
    transform: ${props => (props.isNavOpen ? 'translate3d(375px, 0, 0)' : 'none')};
    transition: transform 500ms;
  `}
`;


const UIMap = p => {
  const { map } = p;

  const zoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  }

  const zoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  }

  const navConfig = [
    { path: '/suche', title: 'Suche und Filter' },
    { path: '/liste', title: 'Listenansicht' },
    { path: '/favoriten', title: 'Favoriten' },
    { path: '/info', title: 'Info' },
  ];

  const uiConfig = [
    { title: 'Hereinzoomen', label: '+', func: () => {zoomIn()} },
    { title: 'Herauszoomen', label: '-', func: () => {zoomOut()} },
  ];

  const location = useLocation();
  const { pathname } = location;

  const isNavOpen = matchPath(pathname, {
    path: navConfig.map(m => m.path),
  }) !== null;

  return (
    <NavWrapper isNavOpen={isNavOpen}>
      {uiConfig.map((m,i) => (
        <StyledRoundButton key={`ui-key-${i}`} onClick={m.func}>{m.label}</StyledRoundButton>
      ))}
    </NavWrapper>
  );
}

export default connect(state => ({
  detailData: state.detailData,
  mapCenter: state.mapCenter,
  unfiltered: unfilteredFilterSelector(state),
  initialFilter: initialFilterSelector(state),
  state: state
}), Actions)(UIMap);
