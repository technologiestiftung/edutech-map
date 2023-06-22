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
    padding: ${props => props.theme.padding[0]} 0 0 0;
    margin: 0 15px 0 0;
    line-height: ${props => props.theme.lineHeight};
    font-family: ${props => props.theme.fonts.sansBold};
    letter-spacing: ${props => props.theme.letterSpacing[1]};
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

class CardLinks extends PureComponent {
  render() {
    const { label, links, type } = this.props;
    return (
      <CardParagraphWrapper>
        <span>{label}</span>
        {links.map(link => (
          <WebsiteLink key={link} href={type === 'mailto:' ? `mailto:${link}` : link} target="_blank" rel="noopener">
            <h3>{formatWebsite(link)}</h3>
          </WebsiteLink>
        ))}
      </CardParagraphWrapper>
    )
  }
}

export default CardLinks;
