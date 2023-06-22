import React, { useState, Fragment } from 'react';
import { connect } from 'unistore/react';
import { createMarkup } from '~/state/dataUtils';
import Actions from '~/state/Actions';

import SidebarSubtitle from '../SidebarSubtitle/';
import Paragraph from '~/components/Paragraph';
import IconLegend from '~/components/IconLegend';


const SidebarInfoParagraph = p => {
  const { title, intro, text, id, active, iconLegend } = p;
  const boolActive = id === active;
  return (
    <>
      {title && <SidebarSubtitle>{title}</SidebarSubtitle>}
      <IconLegend isVisible={iconLegend} />
      <Paragraph dangerouslySetInnerHTML={createMarkup(intro)}></Paragraph>
      { boolActive && (<Paragraph if={boolActive} dangerouslySetInnerHTML={createMarkup(text)}></Paragraph>) }
    </>
  )
}

export default connect(state => ({
  content: state.content
}), Actions)(SidebarInfoParagraph);
