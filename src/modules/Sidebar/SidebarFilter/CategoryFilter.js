import React, { Component } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { styled as styledUi, withStyles } from '@material-ui/core/styles';

import { getCategoryLabel, getSubCategoryLabel } from '~/state/dataUtils';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SubCategoryTags from '~/components/SubCategoryTags'

import Actions from '~/state/Actions';

const CategoryFilterWrapper = styled.div`
  margin-left: ${props => props.theme.margin[0]};
`;

const StyledCheckbox = withStyles({
  root: {
    color: 'black',
  },
  checked: {
    color: '#1f1f1f'
  },
})(Checkbox);

const StyledFormControlLabel = withStyles({
  root: {
    marginBottom: '10px'
  },
  label: {
    fontSize: '13px',
    fontFamily: 'Clan Book'
  },
})(FormControlLabel);



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
          <CategoryFilterWrapper key={`CategoryFilter__${i}__${category}`}>
            <StyledFormControlLabel
              value={category}
              checked={filter.categoryFilter.includes(category)}
              onClick={() => {this.onChange(category)}}
              control={<StyledCheckbox color="default"/>}
              label={getCategoryLabel(category)}
              labelPlacement="end"
            />
            { filter.categoryFilter.includes(category) &&
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