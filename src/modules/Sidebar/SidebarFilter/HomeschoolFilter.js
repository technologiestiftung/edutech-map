import React, { Component } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { styled as styledUi, withStyles } from '@material-ui/core/styles';

import { getHomeschoolType, targetGroups } from '~/state/dataUtils';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TargetGroupTags from '~/components/TargetGroupTags'

import Actions from '~/state/Actions';

const TargetGroupFilterWrapper = styled.div`
  margin-left: ${props => props.theme.margin[0]};
  opacity: ${p => p.active === 'homeschool' ? 1 : .5};
`;

const StyledFormGroup = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
})(FormGroup)

const StyledCheckbox = withStyles({
  root: {
    color: 'black',
  },
  checked: {
    color: '#1f1f1f'
  },
})(Checkbox);

const StyledFormControlLabel = withStyles({
  label: {
    fontSize: '13px',
    fontFamily: 'Clan Book'
  },
})(FormControlLabel);



class HomeschoolFilter extends Component {
  constructor(props) {
    super(props);
  }

  onChange(type) {
    const { setActiveFilter } = this.props;
    console.log(type)
    this.props.toggleHomeschoolFilter(type);
    setActiveFilter('homeschool');
  }

  render() {
    const { homeschoolTypes, filter, activeFilter, setActiveFilter } = this.props
    return (
      <StyledFormGroup aria-label="position" row>
      { homeschoolTypes.map((type,i) => {
        return (
          <TargetGroupFilterWrapper active={activeFilter} key={`HomeSchoolFilter__${i}__${type}`}>
            <StyledFormControlLabel
              value={type}
              checked={filter.homeschoolFilter.includes(type)}
              onClick={() => {this.onChange(type)}}
              control={<StyledCheckbox color="default"/>}
              label={getHomeschoolType(type)}
              labelPlacement="end"
            />
          </TargetGroupFilterWrapper>
        )
      }) }
      </StyledFormGroup>
    )
  }
}

export default connect(state => ({
  homeschoolTypes: state.homeschoolTypes,
  filter: state.filter,
  activeFilter: state.activeFilter,
}), Actions)(HomeschoolFilter);