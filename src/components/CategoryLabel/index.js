import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import { getCategoryLabel } from '~/state/dataUtils'


const CardParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.margin[2]};

  span {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${props => props.theme.colors.textgrey};
    margin-bottom: 4px;
  }
`

const CategoryLabelDiv = styled.div`
  display: block;
  margin-top: 10px;
  font-size: ${props => props.theme.fontSizes[0]};
  margin: 5px 5px 0;
  padding: 7px 10px 6px 24px;
  border-radius: 12px;
  color: white;
  position: relative;
  line-height: 1;
  background: ${props => (props.color)};
  width: fit-content;

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background: ${props => props.color || '#000'};
    border-radius: 100%;
    border: 2px solid ${props => props.type == 'black' ? 'black' : 'white'};
    left: ${props => (props.hasBorder ? '3px' : "7px")};
    top: ${props => (props.hasBorder ? '3px' : '6px')};
  }
`;

const CategoryLabel = p => {
  const { colorizer, colorizerLight, category, label } = p;
  return (
    <CardParagraphWrapper>
      <span>{label}</span>
      <CategoryLabelDiv
        color={colorizer(category)}
        colorLight={colorizerLight(category)}
      >
      {getCategoryLabel(category)}
      </CategoryLabelDiv>
    </CardParagraphWrapper>
  )
}

export default connect(state => ({
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight
}))(CategoryLabel);