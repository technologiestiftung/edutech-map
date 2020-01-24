import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default styled.span`
  position: absolute;
  bottom: 16px;
  left: 18px;
  font-family: Clan Bold;
  font-size: 20px;
  height: fit-content;

  @media (max-width: 768px) {
    top: 16px;
    left: auto;
    right: 18px;
    font-size: 16px;
  }
`;