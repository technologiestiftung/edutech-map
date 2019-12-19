import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

const StyledLogoTile = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  font-size: ${props => props.theme.fontSizes[0]};
  font-family: ${props => props.theme.fonts.sansMedium};

  @media (max-width: 768px) {
    top: auto;
    bottom: 15px;
    left: 15px;
    max-width: 120px;
  }
`;

const StyledTSBLogo = styled(TSBLogo)`
  padding-left: 0px;
`;

import TSBLogo from '~/components/TSBLogo';

class LogoTile extends PureComponent {

  render() {
      return (
        <StyledLogoTile>
          Ein Projekt der:
          <StyledTSBLogo />
        </StyledLogoTile>
      );
  }
}

export default LogoTile
