import React, { PureComponent } from 'react';
import styled from 'styled-components';

import WebsiteLink from '~/components/Link';

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
    padding: ${props => props.theme.padding[1]} 0 0 0;
    margin: 0 15px 0 0;
    line-height: ${props => props.theme.lineHeight};
    font-family: ${props => props.theme.fonts.sansBold};
  }
`;

function formatWebsite(str) {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/https?:\/\//, '')
    .replace(/www\./, '')
    .replace(/\/$/, '');
}

class CardParagraph extends PureComponent {
  render() {
    const { label, data } = this.props;

    console.log(data)

    if (data.length > 0) {
      return (
        <CardParagraphWrapper>
          <span>{label}</span>
          <WebsiteLink href={data} target="_blank" rel="noopener noreferrer">
            <h3>{formatWebsite(data)}</h3>
          </WebsiteLink>
        </CardParagraphWrapper>
      )
    } else {
      return (null)
    }
  }
}

export default CardParagraph;
