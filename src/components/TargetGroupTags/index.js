import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import { getTargetGroupLabel } from '~/state/dataUtils';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${ props => props.theme.margin[2]};

  &::last-of-type {
    margin-bottom: 0;
  }
`;

const CategoryLabel = styled.div`
  display: block;
  font-size: ${props => props.theme.fontSizes[0]};
  margin: 0 5px 5px 0;
  padding: 7px 10px 6px 24px;
  border-radius: 12px;
  color: ${ props => props.active ? 'white' : `${props.color}` };
  position: relative;
  line-height: 1;
  background: ${ props => props.active ? `${props.color}` : `${props.colorLight}` };
  cursor: pointer;
  transition: all .125s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background: ${ props => props.active ? `${props.color}` : `${props.colorLight}` };
    border-radius: 100%;
    border: 2px solid ${props => props.type == 'black' ? 'black' : 'white'};
    left: ${props => (props.hasBorder ? '3px' : "7px")};
    top: ${props => (props.hasBorder ? '3px' : '6px')};
    transition: all .125s ease-in-out;
  }
`;

class TargetGroupTags extends PureComponent {

  onChange(groupTag) {
    const { targetGroupType, toggleTargetGroupTagFilter } = this.props;
    toggleTargetGroupTagFilter(targetGroupType, groupTag);
  }

  render() {
    const {
      targetGroupTypes,
      colorizer,
      targetGroups,
      colorizerLight,
      type,
      className,
      targetGroupType,
      filter,
    } = this.props;

    const { targetGroupTagsFilter } = filter;

    return (
        <CategoryLabelWrapper className={className}>
          {targetGroups.map(type => (
            <CategoryLabel
              key={`CategoryLabel__${type}`}
              color={'#000000'}
              active={targetGroupTagsFilter[targetGroupType].includes(type)}
              onClick={() => this.onChange(type)}
              colorLight={'#E3E3E3'}
            >
              {getTargetGroupLabel(targetGroupType, type)}
            </CategoryLabel>
          ))}
        </CategoryLabelWrapper>
    );
  }
}

export default connect(state => ({
  targetGroupTypes: state.targetGroupTypes,
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight,
  filter: state.filter
}), Actions)(TargetGroupTags);
