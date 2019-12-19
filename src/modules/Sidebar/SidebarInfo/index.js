import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import { createMarkup } from '~/state/dataUtils';
import { dataAsArraySelector } from '~/state/Selectors'

import CardCompact from '~/components/Card/CardCompact';
import DetailCard from '~/components/Card/Detail';
import Logo from '~/components/beBerlinLogo';
import LogoIBB from '~/components/IBBLogo';
import Paragraph from '~/components/Paragraph';
import SidebarTitle from '../SidebarTitle';
import SidebarLinks from './SidebarInfoLinks';


const ListItems = styled.div``;

class SidebarInfo extends PureComponent {

  render() {
    const { content } = this.props;

    if (content) {
      return (
        <Fragment>
          <SidebarTitle>Über das Projekt</SidebarTitle>
          <Paragraph dangerouslySetInnerHTML={createMarkup(content.introtext)}></Paragraph>
          <Logo/>
          <LogoIBB/>
          <Paragraph dangerouslySetInnerHTML={createMarkup(content.contacttext)}></Paragraph>
          <SidebarLinks data={content.links}/>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <SidebarTitle>Über das Projekt</SidebarTitle>
          <Paragraph>Lade Inhalte ...</Paragraph>
        </Fragment>
      )
    }

  }

};

export default connect(state => ({
  content: state.content
}), Actions)(SidebarInfo);