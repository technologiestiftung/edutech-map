import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';

const paintProps = {
  'circle-radius': 10,
  'circle-color': '#223b53',
  'circle-stroke-color': 'white',
  'circle-stroke-width': 1,
  'circle-opacity': 1
}


class MarkerLayer extends PureComponent {

  renderFeat(feat,i) {
    const feature = (
      <Feature
        coordinates={feat.geometry.coordinates}
        key={`feat-${i}`}
        // onClick={evt => (isMobile ? noop() : this.timeoutClick(evt, feat))}
        onMouseEnter={evt => this.handleMouseEnter(evt, feat)}
        onMouseLeave={evt => this.handleMouseLeave(evt)}
        // onTouchStart={evt => this.handleClick(evt)}
        properties={feat.properties}
      />
    );

    return feature;
  }

  handleMouseEnter(evt, { properties = {} }) {
    // if (isMobile) {
    //   return this.props.setDetailRoute(properties.id);
    // }

    evt.map.getCanvas().style.cursor = 'pointer';

    if (properties && properties.isFiltered) {
      return false;
    }

    this.props.setTooltipData(properties);
  }

  handleMouseLeave(evt) {
    evt.map.getCanvas().style.cursor = '';

    this.props.setTooltipData(null);
  }

  handleMouseMove(evt) {
    console.log([evt.lngLat.lng, evt.lngLat.lat]);
    this.props.setTooltipPos([evt.lngLat.lng, evt.lngLat.lat]);
  }

  render() {
    const { data, detailData } = this.props;

    return (
      <Fragment>
        <Layer
          id="MarkerLayer"
          type="circle"
          paint={paintProps}
          onMouseMove={evt => this.handleMouseMove(evt)}
        >
          {data.features.map((feat,i) => this.renderFeat(feat, i))}
        </Layer>
      </Fragment>
    )
  }
}

export default connect(state => (state), Actions)(MarkerLayer);
