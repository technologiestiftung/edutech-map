import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

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
  color: ${props => props.color || '#ddd'};
  position: relative;
  line-height: 1;
  background: ${props => (props.colorLight)};

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background: ${props => props.color || '#ddd'};
    border-radius: 100%;
    border: 2px solid white;
    left: ${props => (props.hasBorder ? '3px' : "7px")};
    top: ${props => (props.hasBorder ? '3px' : '6px')};
  }
`;

class CategoryLabels extends PureComponent {
  render() {
    const {
      categories, colorizer, colorizerLight, className, category/*, hasBorder*/
    } = this.props;

    return (
      <CategoryLabelWrapper className={className}>
        {categories.map(cat => (
          <CategoryLabel
            key={`CategoryLabel__${cat}`}
            color={colorizer(category)}
            colorLight={colorizerLight(category)}
          >
            {cat}
          </CategoryLabel>
        ))}
      </CategoryLabelWrapper>
    );
  }
}

export default connect(state => ({
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight,
}))(CategoryLabels);
