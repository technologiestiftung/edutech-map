import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const CategoryLabel = styled.div`
  display: block;
  font-size: ${props => props.theme.fontSizes[0]};
  margin: 0 5px 5px 0;
  padding: 7px 10px 6px 24px;
  border-radius: 12px;
  color: white;
  position: relative;
  line-height: 1;
  background: ${props => (props.color)};

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

class CategoryLabels extends PureComponent {
  render() {
    const {
      categories, colorizer, colorizerLight, type, className, category/*, hasBorder*/
    } = this.props;

    if (category === 'targetGroup') {
      return (
        <CategoryLabelWrapper className={className}>
          {categories.map((cat, i) => (
            <CategoryLabel
              key={`CategoryLabel__${cat}__${i}`}
              color={'#000000'}
              colorLight={'#e1e1e1'}
              type={type}
            >
              {cat}
            </CategoryLabel>
          ))}
        </CategoryLabelWrapper>
      )
    } else {
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
}

export default connect(state => ({
  colorizer: state.colorizer,
  colorizerLight: state.colorizerLight
}))(CategoryLabels);
