import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import { getTargetGroupLabel } from '~/state/dataUtils';
import { tagsCountTargetGroupSelector } from '~/state/Selectors';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  opacity: ${p => p.active === 'target' ? 1 : .5};
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
    const { targetGroupType, toggleTargetGroupTagFilter, activeFilter, setActiveFilter } = this.props;
    toggleTargetGroupTagFilter(targetGroupType, groupTag);
    setActiveFilter('target');
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
      activeFilter,
      tagsCountTargetGroup
    } = this.props;

    const { targetGroupTagsFilter } = filter;

    return (
        <CategoryLabelWrapper active={activeFilter} className={className}>
          {targetGroups.map(t => {

            if (tagsCountTargetGroup) {

              if (tagsCountTargetGroup[targetGroupType]) {

                if (tagsCountTargetGroup[targetGroupType][t] > 0) {
                  return (
                    <CategoryLabel
                    key={`CategoryLabel__${t}`}
                    color={'#000000'}
                    active={targetGroupTagsFilter[targetGroupType].includes(t)}
                    onClick={() => this.onChange(t)}
                    colorLight={'#E3E3E3'}
                  >
                    { getTargetGroupLabel(targetGroupType, t) + ` (${tagsCountTargetGroup[targetGroupType][t]})` }
                  </CategoryLabel>
                  )
                }
              }

            }

          })}
        </CategoryLabelWrapper>
    );
  }
}

export default connect(state => ({
  targetGroupTypes: state.targetGroupTypes,
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight,
  filter: state.filter,
  activeFilter: state.activeFilter,
  tagsCountTargetGroup: tagsCountTargetGroupSelector(state),
}), Actions)(TargetGroupTags);
