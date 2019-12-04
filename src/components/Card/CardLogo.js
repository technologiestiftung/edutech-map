import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CardLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.margin[2]};
  span {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${props => props.theme.colors.textgrey}
  }
`;

const CardImage = styled.div`
  display: block;
  width: 90px;
  height: 70px;
  background-image: ${props => `url(${props.src.replace(/\s/g, '%20')})`};
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 2px;
  background-size: contain;
`;

class CardLogo extends PureComponent {
  render() {
    const { label, data } = this.props;

    return (
      <CardLogoWrapper>
        <span>{label}</span>
        <CardImage src={data} />
      </CardLogoWrapper>
    )
  }
}

export default CardLogo;