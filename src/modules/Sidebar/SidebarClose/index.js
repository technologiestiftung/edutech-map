import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import Actions from '~/state/Actions';
import history from '~/history';
import config from '../../../../config';

import { connect } from 'unistore/react';

import RoundButton from '~/components/RoundButton';

const StyledLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`;

class SidebarClose extends PureComponent {
  handleClick() {
    const { setDetailData, setMapCenter, setZoom, setHighlightData } = this.props;
    setZoom(config.zoom);
    setMapCenter(config.position);
    setDetailData(false);
    setHighlightData(false);
  }

  render() {
    return (
      <StyledLink onClick={() => {this.handleClick()}} to={{ pathname: '/', search: '' }}>
        <RoundButton aria-label="Leiste schließen" title="Leiste schließen">
          <CloseIcon />
        </RoundButton>
      </StyledLink>
    );
  }
}

// export default withRouter(SidebarClose);

export default withRouter(connect(state => ({
  detailData: state.detailData
}), Actions)(SidebarClose));
