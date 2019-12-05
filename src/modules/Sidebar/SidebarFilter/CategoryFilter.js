import React, { Component } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { styled as styledUi } from '@material-ui/core/styles';

import { getCategoryLabel, getSubCategoryLabel } from '~/state/dataUtils';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SubCategoryTags from '~/components/SubCategoryTags'

const StyledCheckbox = styled(Checkbox)`
  font-family: ${props => props.theme.fonts.sansBold};
`;

const StyledFormControlLabel = styledUi(FormControlLabel)({
  fontSize: '13px !important',
  marginBottom: '10px'
});

import Actions from '~/state/Actions';

const CategoryFilterWrapper = styled.div`
  margin-left: ${props => props.theme.margin[0]};
`;

class CategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: true,
      media: true,
      app: true,
      hardware: true,
    }
  }

  onChange(category) {
    this.props.toggleCategoryFilter(category);
    this.setState({
      [category]: !this.state[category]
    })
  }

  render() {
    const { categories, subCategoryList, filter } = this.props;


    return (
      <FormGroup aria-label="position" row>
      { categories.map((category,i) => {
        return (
          <CategoryFilterWrapper>
            <StyledFormControlLabel
              value={category}
              checked={this.state[category]}
              key={`CategoryFilter__${i}__${category}`}
              onClick={() => {this.onChange(category)}}
              control={<StyledCheckbox color="primary" />}
              label={getCategoryLabel(category)}
              labelPlacement="end"
            />
            { this.state[category] &&
              <SubCategoryTags
                categories={ subCategoryList[category] }
                key={`SubCategoryTags__${i}__${category}`}
                category={category}
              />
            }
          </CategoryFilterWrapper>
        )
      }) }
      </FormGroup>
    )
  }
}

export default connect(state => ({
  categories: state.categories,
  subCategoryList: state.subCategoryList,
  colorizer: state.colorizer,
  filter: state.filter,
}), Actions)(CategoryFilter);