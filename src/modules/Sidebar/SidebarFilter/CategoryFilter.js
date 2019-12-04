import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { getCategoryLabel } from '~/state/dataUtils';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Actions from '~/state/Actions';

const CategoryFilterWrapper = styled.div`
  margin-left: ${props => props.theme.margin[0]};
`;

const CategoryFilterItem = styled.div`

`;

class CategoryFilter extends PureComponent {
  onChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  render() {
    const { categories } = this.props;
    return (
      <FormGroup aria-label="position" row>
      { categories.map(category => {
        return (
          <FormControlLabel
            value="category"
            onClick={() => {this.onChange(category)}}
            control={<Checkbox color="primary" />}
            label={getCategoryLabel(category)}
            labelPlacement="end"
          />
        )
      }) }
      </FormGroup>
    )
  }
}

export default connect(state => ({
  categories: state.categories,
  colorizer: state.colorizer,
  filter: state.filter,
}), Actions)(CategoryFilter);