import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import { getSubCategoryLabel } from '~/state/dataUtils';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryLabel = styled.div`
  display: block;
  font-size: ${props => props.theme.fontSizes[0]};
  margin: 0 5px 5px 0;
  padding: 7px 10px 6px 24px;
  border-radius: 12px;
  color: ${props => props.color || '#000'};
  position: relative;
  line-height: 1;
  background: ${props => (props.colorLight)};

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

class SubCategoryTags extends PureComponent {

  onChange(subCat) {
    this.props.toggleSubCategoryFilter(this.props.category, subCat);
  }

  render() {
    const {
      categories, colorizer, colorizerLight, type, className, category
    } = this.props;

    return (
        <CategoryLabelWrapper className={className}>
          {categories.map(subCategory => (
            <CategoryLabel
              key={`CategoryLabel__${subCategory}`}
              color={colorizer(category)}
              onClick={() => this.onChange(subCategory)}
              colorLight={colorizerLight(category)}
            >
              {getSubCategoryLabel(category, subCategory)}
            </CategoryLabel>
          ))}
        </CategoryLabelWrapper>
    );

  }
}

export default connect(state => ({
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight
}), Actions)(SubCategoryTags);
