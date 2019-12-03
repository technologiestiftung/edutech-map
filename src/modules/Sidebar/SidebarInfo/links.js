import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import Actions from '~/state/Actions';

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


class SidebarLinks extends PureComponent {
  render() {
    const { data } = this.props
    return (
      <LinksWrapper>
        { data.map((d,i) => {
          const LinkWrapper = styled.a.attrs({
              href: 'https://technologiestiftung-berlin.de',
              target: '_blank'
            })`
            margin-bottom: ${props => props.theme.margin[1]};
            padding-left: ${props => props.theme.padding[1]};
            font-size: ${props => props.theme.fontSizes[1]};
            color: black;
            font-family: ${props => props.theme.fonts.sansBold};

            &:hover {
              color: ${props => props.theme.colors.textgrey};
            }
          `;

          return (
            <LinkWrapper key={`link-${i}`}>{d.labellink}</LinkWrapper>
          )

        }
        ) }
      </LinksWrapper>
    )
  }
}

export default connect(state => ({
  content: state.content
}), Actions)(SidebarLinks);