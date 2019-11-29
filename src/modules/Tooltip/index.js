import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { Popup } from 'react-mapbox-gl';

import CardHeader from '~/components/Card/CardHeader';

const StyledPopup = styled(Popup)`
  &&& {
    max-width: 250px;
    line-height: 1;
    font-family: ${props => props.theme.fonts.sans};

    .mapboxgl-popup-content {
      background: black;
    }

    .mapboxgl-popup-tip {
      border-top-color: black;
    }
  }
`;

class Tooltip extends PureComponent {
  render() {
    const { tooltipPos, data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <StyledPopup coordinates={tooltipPos} style={{ zIndex: 2000 }}>
        <CardHeader data={data} type='white' />
      </StyledPopup>
    );
  }
}

export default connect(state => ({
  tooltipPos: state.tooltipPos,
  data: state.tooltipData,
}))(Tooltip);
