import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import { dataAsArraySelector } from '~/state/Selectors'

import CardCompact from '~/components/Card/CardCompact';
import DetailCard from '~/components/Card/Detail';
import Logo from '~/components/TSBLogo';
import SidebarTitle from '../SidebarTitle';
import SidebarLinks from './links';

const StyledParagraph = styled.p`
  padding-left: ${props => props.theme.padding[1]};
  line-height: ${props => props.theme.lineHeight};
  font-size: ${props => props.theme.fontSizes[1]};
  color: ${props => props.theme.colors.textgrey};
  margin-bottom: ${props => props.theme.margin[3]};
`;

const ListItems = styled.div``;

class SidebarInfo extends PureComponent {

  createMarkup(content) {
    return {__html: content};
  }

  render() {
    const { content } = this.props;

    if (content) {
      return (
        <Fragment>
          <SidebarTitle>Über das Projekt</SidebarTitle>
          <StyledParagraph dangerouslySetInnerHTML={this.createMarkup(content.introtext)}></StyledParagraph>
          <Logo/>
          <StyledParagraph dangerouslySetInnerHTML={this.createMarkup(content.contacttext)}></StyledParagraph>
          <SidebarLinks data={content.links}/>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <SidebarTitle>Über das Projekt</SidebarTitle>
          <StyledParagraph>Lade Inhalte ...</StyledParagraph>
        </Fragment>
      )
    }

  }

};

export default connect(state => ({
  content: state.content
}), Actions)(SidebarInfo);