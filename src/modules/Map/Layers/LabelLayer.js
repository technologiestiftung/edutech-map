import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { GeoJSONLayer, Feature } from 'react-mapbox-gl';
import idx from 'idx';

import { isMobile, noop } from '~/utils';

let clickTimeout = null;

let geojson = {
  'type': 'FeatureCollection',
  'features': [
  ]
}

const layoutDistrictText = {
  'text-field': ['get', 'alias'],
  'text-offset': [0, 5.5],
  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
  'text-radial-offset': 0.5,
  'text-justify': 'auto',
  // 'icon-image': ['concat', ['get', 'icon'], '-15']
}

const layoutCountText = {
  'text-field': ['get', 'count'],
  'text-offset': [0, 0.5],
  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
  'text-radial-offset': 0.5,
  'text-justify': 'auto',
  // 'icon-image': ['concat', ['get', 'icon'], '-15']
}

const paintProps = {
  'circle-radius': 7,
  'circle-color': '#937F54',
  'circle-stroke-color': 'white',
  'circle-stroke-width': 3,
  'circle-opacity': 1
}

const symbolPaint = {
  'text-color': 'red'
}


class LabelLayer extends PureComponent {

  renderLabelFeat(feat,i) {
    const feature = (
      <Feature
        coordinates={feat.coordinates}
        properties={feat.properties}
      />
    );
    console.log(feature)
    return feature;
  }

  render() {
    const { data } = this.props;

    if(data) {
      data.forEach(d => {
        geojson.features.push(
          {
            'type': 'Feature',
            'properties': {
              icon: 'marker',
              ...d.properties
            },
            'geometry': {
              'type': 'Point',
              'coordinates': d.coordinates
            }
          }
        )
      })
    }

    return (
      <Fragment>
        { data && (
          <>
          <GeoJSONLayer
            data={geojson}
            id="LabelLayer"
            paint={paintProps}
            minZoom={0}
            maxZoom={10}
            symbolLayout={layoutDistrictText}
            symbolPaint={symbolPaint}
          >
          </GeoJSONLayer>
          <GeoJSONLayer
            data={geojson}
            id="LabelCountLayer"
            paint={paintProps}
            minZoom={0}
            maxZoom={10}
            symbolLayout={layoutCountText}
            symbolPaint={symbolPaint}
          >
          </GeoJSONLayer>
          </>
        ) }
      </Fragment>
    )
  }
}

export default LabelLayer;
