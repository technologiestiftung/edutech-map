import React from 'react';
import styled from 'styled-components';
import BeBerlinLogoSrc from '!file-loader!~/../public/images/beBerlin.svg'; // eslint-disable-line

const BeBerlinLogo = styled.a.attrs({
    href: 'https://www.berlin.de/sen/web/',
    target: '_blank'
  })`
  padding-left: ${props => props.theme.padding[1]};

  img {
    width: 110px;
  }
`;

export default () => (
  <BeBerlinLogo>
    <img src={BeBerlinLogoSrc} alt="beBerlin Logo" />
  </BeBerlinLogo>
);
