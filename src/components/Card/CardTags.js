import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import { targetGroupsArraySelector } from '~/state/Selectors';
import CategoryLabels from '../CategoryLabels'

const StyledCategoryLabels = styled(CategoryLabels)`
  padding: ${props => props.theme.padding[1]} 0 0 0;
`;


const CardTagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.margin[2]};

  span {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${props => props.theme.colors.textgrey}
  }
`

class CardTags extends PureComponent {
  render() {
    const { label, targetGroups } = this.props;
    return (
      <CardTagsWrapper>
        <span>{label}</span>
        <StyledCategoryLabels categories={targetGroups} category={'targetGroup'}/>
      </CardTagsWrapper>

    )
  }
}


export default connect(state => ({
  targetGroups: targetGroupsArraySelector(state)
}))(CardTags);