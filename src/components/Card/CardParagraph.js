import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { createMarkup, addLineBreaks } from '~/state/dataUtils';

const CardParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.margin[1]};
  
  span {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${props => props.theme.colors.textgrey}
  }

  span.p-text {
    font-size: ${props => props.theme.fontSizes[1]};
    padding: ${props => props.theme.padding[0]} 0 0 0;
    color: black;
    margin: 0 15px 0 0;
    line-height: ${props => props.theme.lineHeight};
    font-family: ${props => props.type == 'bold' ? `${props.theme.fonts.sansBold}` : `${props.theme.fonts.sans}`}
  }
`;

class CardParagraph extends PureComponent {

  render() {
    let { label, data, type } = this.props;

    if (label == 'Adresse:') {
      data = addLineBreaks(data);
    }

    if (data.length > 0) {
      return (
        <CardParagraphWrapper type={type}>
          <span>{label}</span>
          <span className="p-text" dangerouslySetInnerHTML={createMarkup(data)}></span>
        </CardParagraphWrapper>
      )
    } else {
      return (null)
    }
  }
}

export default CardParagraph;
