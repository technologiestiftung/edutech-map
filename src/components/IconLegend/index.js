import React, { PureComponent } from 'react';
import styled from 'styled-components';
import regular from '!file-loader!~/../public/images/edutech-regular.svg'; // eslint-disable-line
import homeschoolIcon from '!file-loader!~/../public/images/edutech-homeschool.svg'; // eslint-disable-line
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import Paragraph from '~/components/Paragraph';
import { createMarkup } from '~/state/dataUtils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LegendWrapper = styled.div`
  display: flex;
  padding-left: ${props => props.theme.padding[1]};
  img {
    margin-right: 10px;
    min-width: 15px;
    width: 15px;
    ${'' /* transform: translateY(2px); */}
  }

  span {
    line-height: 160%;
    font-size: 14px;
  }
`;

const IconLegend = p => {
  const { content, isVisible } = p;
  const { homeschool } = content;
  return (
    <>
      {isVisible && (
        <>
        <Paragraph dangerouslySetInnerHTML={createMarkup(homeschool)}></Paragraph>
        <LegendWrapper>
          <img src={regular} />
          <span>Reguläres Angebot</span>
        </LegendWrapper>
        <LegendWrapper>
          <img src={homeschoolIcon} />
          <span>Homeschooling Angebot</span>
        </LegendWrapper>
        </>
      )}
    </>
  )
}

export default connect(state => ({
  content: state.content,
}), Actions)(IconLegend);