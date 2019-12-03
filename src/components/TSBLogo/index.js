import React from 'react';
import styled from 'styled-components';
import TSBLogoSrc from '!file-loader!~/../public/images/tsb-logo-coloured.svg'; // eslint-disable-line

const TSBLogo = styled.a.attrs({
    href: 'https://technologiestiftung-berlin.de',
    target: '_blank'
  })`
  padding-left: ${props => props.theme.padding[1]};

  img {
    width: 150px;
  }
`;

export default () => (
  <TSBLogo>
    <img src={TSBLogoSrc} alt="TSB Logo" />
  </TSBLogo>
);
