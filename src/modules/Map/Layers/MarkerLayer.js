import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';
import idx from 'idx';

import { isMobile, noop } from '~/utils';

let clickTimeout = null;

const paintProps = {
  'circle-radius': 10,
  'circle-color': '#223b53',
  'circle-stroke-color': 'white',
  'circle-stroke-width': 1,
  'circle-opacity': 1
}

function getPaintProps(props) {
  const detailId = idx(props, _ => _.detailData.name) || idx(props, _ => _.highlightData.name) || '';
  const tooltipId = idx(props, _ => _.tooltipData.name) || '';
  const activeExpr = ['case', ['==', ['string', ['get', 'name']], detailId], 10, 2];
  const activeExprZoomedIn = ['case', ['==', ['string', ['get', 'name']], detailId], 16, 12];

  return {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      12, activeExpr,
      18, activeExprZoomedIn
    ],
    'circle-color': [
      'case',
      ['==', ['string', ['get', 'name']], detailId], ['get', 'color'],
      ['get', 'isFiltered'], '#ddd',
      ['get', 'color']
    ],
    'circle-stroke-color': '#fff',
    'circle-stroke-width': [
      'case',
      ['==', ['string', ['get', 'name']], tooltipId], 2,
      ['==', ['string', ['get', 'name']], detailId], 2,
      1
    ],
  };
}


class MarkerLayer extends PureComponent {
  timeoutClick(evt, feat) {
    if (feat.properties && feat.properties.isFiltered) {
      return false;
    }

    clearTimeout(clickTimeout);

    clickTimeout = setTimeout(() => {
      this.handleClick(evt, feat);
    }, 10);
  }

  renderFeat(feat,i) {
    const feature = (
      <Feature
        coordinates={feat.geometry.coordinates}
        key={`feat-${i}`}
        onClick={evt => (isMobile ? noop() : this.timeoutClick(evt, feat))}
        onMouseEnter={evt => this.handleMouseEnter(evt, feat)}
        onMouseLeave={evt => this.handleMouseLeave(evt)}
        onTouchStart={evt => this.handleClick(evt)}
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

  handleClick(evt, { properties = {} }) {
    evt.originalEvent.preventDefault();
    evt.originalEvent.stopPropagation();

    this.props.setDetailRoute(properties.id);
  }

  handleMouseMove(evt) {
    this.props.setTooltipPos([evt.lngLat.lng, evt.lngLat.lat]);
  }

  render() {
    const { data, detailData } = this.props;
    const paintProps = getPaintProps(this.props);

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
