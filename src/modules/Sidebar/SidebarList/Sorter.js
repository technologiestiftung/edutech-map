import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import Select from '~/components/Select';
import Subtitle from '~/components/Subtitle';

// import SidebarItemTitle from '../SidebarItemTitle';

const SorterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
  padding-left: ${props => props.theme.padding[1]};
  padding-right: ${props => props.theme.margin[0]};
`;

const StyledSelect = styled(Select)`
  margin-bottom: ${props => props.theme.margin[0]};

  option {
    font-family: 'Verdana';
    font-size: 12px;
  }
`;

class Sorter extends PureComponent {
  handleChange = (evt) => {
    this.props.setListSorting(evt.target.value);
  }

  render() {
    return (
      <SorterWrapper>
        <Subtitle>Liste sortieren</Subtitle>
        <StyledSelect onChange={this.handleChange} value={this.props.listSorting}>
          <option value="name">Name</option>
          <option value="category">Kategorie</option>
          <option value="isFav">Favoriten</option>
        </StyledSelect>
      </SorterWrapper>
    );
  }
}

export default connect(state => ({
  listSorting: state.listSorting,
}), Actions)(Sorter);
