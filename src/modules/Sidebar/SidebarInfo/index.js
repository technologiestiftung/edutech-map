import React, { Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { createMarkup } from '~/state/dataUtils';

import Logo from '~/components/BeBerlinLogo';
import LogoIBB from '~/components/IBBLogo';
import Paragraph from '~/components/Paragraph';
import SidebarTitle from '../SidebarTitle';
import SidebarLinks from './SidebarInfoLinks';

import SidebarInfoParagraph from './SidebarInfoParagraph';


const SidebarInfo = (p) => {
  const { content, activeP } = p;

  if (content) {
    return (
      <Fragment>
        <SidebarTitle>EduTechMap Berlin</SidebarTitle>
        
        <SidebarInfoParagraph 
          title={content.abouttitle}
          text={content.about}
          intro={content.aboutintro}
          active={activeP}
          id={1}
        ></SidebarInfoParagraph>

        <SidebarInfoParagraph
          iconLegend={true} 
          title={content.worktitle}
          text={content.work}
          intro={content.workintro}
          active={activeP}
          id={0}
        ></SidebarInfoParagraph>
        
        <SidebarInfoParagraph 
          title={content.systitle}
          text={content.sys}
          intro={content.sysintro}
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
        <SidebarTitle>EduTechMap Berlin</SidebarTitle>
        <Paragraph>Lade Inhalte ...</Paragraph>
      </Fragment>
    )
  }
};

export default connect(state => ({
  content: state.content,
  activeP: state.activeP,
}), Actions)(SidebarInfo);
