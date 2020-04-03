import React, { useState, Fragment } from 'react';
import { connect } from 'unistore/react';
import { createMarkup } from '~/state/dataUtils';
import styled from 'styled-components';
import Actions from '~/state/Actions';
import Store from '~/state/Store'

import SidebarSubtitle from '../SidebarSubtitle/';
import Paragraph from '~/components/Paragraph';
import IconLegend from '~/components/IconLegend';

const StyledSpan = styled.span`
  min-width: 250px;
  cursor: pointer;
  font-size: 14px;
  padding-left: 10px;
  text-decoration: underline;
  &:hover {
    opacity: .5;
  }
`;

const StyledDiv = styled.div`
  width: 250px;
  margin-bottom: ${props => props.theme.margin[2]};
`;

const SidebarInfoParagraph = p => {
  const { title, intro, text, id, active, iconLegend } = p;
  const boolActive = id === active;

  const spanContent = boolActive ? 'weniger' : 'mehr';

  const handleClick = (id) => {
    const bool = Store.getState().activeP;
    if (bool === id) {
      Store.setState({ activeP: false });
    } else {
      Store.setState({ activeP: id });
    }
  }

  return (
    <>
      <SidebarSubtitle>{title}</SidebarSubtitle>
      <IconLegend isVisible={iconLegend} />
      <Paragraph dangerouslySetInnerHTML={createMarkup(intro)}></Paragraph>
      { boolActive && (<Paragraph if={boolActive} dangerouslySetInnerHTML={createMarkup(text)}></Paragraph>) }
      <StyledDiv>
        <StyledSpan onClick={() => { handleClick(id)}}>{spanContent}</StyledSpan>
      </StyledDiv>
    </>
  )
}

export default connect(state => ({
  content: state.content
}), Actions)(SidebarInfoParagraph);