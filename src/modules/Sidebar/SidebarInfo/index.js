import React, { useState, Fragment } from 'react';
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
import SidebarSubtitle from '../SidebarSubtitle';
import SidebarLinks from './SidebarInfoLinks';

import SidebarInfoParagraph from './SidebarInfoParagraph';

const ListItems = styled.div``;

const SidebarInfo = (p) => {
  const [view, setView] = useState(false);

  const { content, activeP } = p;

  if (content) {
    return (
      <Fragment>
        <SidebarTitle>Über das Projekt</SidebarTitle>

        <SidebarInfoParagraph 
          title={content.worktitle}
          text={content.work}
          intro={content.workintro}
          active={activeP}
          id={0}
        ></SidebarInfoParagraph>
        
        <SidebarInfoParagraph 
          title={content.abouttitle}
          text={content.about}
          intro={content.aboutintro}
          active={activeP}
          id={1}
        ></SidebarInfoParagraph>
      
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

};

export default connect(state => ({
  content: state.content,
  activeP: state.activeP,
}), Actions)(SidebarInfo);