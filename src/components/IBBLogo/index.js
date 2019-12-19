import React from 'react';
import styled from 'styled-components';
import IBBLogoSrc from '!file-loader!~/../public/images/ibb.jpg'; // eslint-disable-line

const IBBLogo = styled.a.attrs({
    href: 'https://www.ibb.de/de/startseite/startseite.html',
    target: '_blank'
  })`
  padding-top: ${props => props.theme.padding[1]};

  img {
    width: 110px;
    margin-left: 30px;
  }
`;

export default () => (
  <IBBLogo>
    <img src={IBBLogoSrc} alt="IBB Logo" />
  </IBBLogo>
);