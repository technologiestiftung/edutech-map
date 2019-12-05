import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CardParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.margin[2]};
  
  span {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${props => props.theme.colors.textgrey}
  }

  h3 {
    font-size: ${props => props.theme.fontSizes[1]};
    padding: ${props => props.theme.padding[0]} 0 0 0;
    margin: 0 15px 0 0;
    line-height: ${props => props.theme.lineHeight};
    font-family: ${props => props.type == 'bold' ? `${props.theme.fonts.sansBold}` : `${props.theme.fonts.sans}`}
  }
`;

class CardParagraph extends PureComponent {
  render() {
    const { label, data, type } = this.props;
    
    if (data.length > 0) {
      return (
        <CardParagraphWrapper type={type}>
          <span>{label}</span>
          <h3>{data}</h3>
        </CardParagraphWrapper>
      )
    } else {
      return (null)
    }
  }
}

export default CardParagraph;
