import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import MapUtils from './MapUtils';

const LayerOrder = ['DistrictsLayer', 'FilteredMarkerLayer', 'MarkerLayer', 'HighlightLayer'];

import FilterView from './MapViews/FilterView';
import Tooltip from '../Tooltip';
import UIMap from '../../components/UIMap';
import LogoTile from './Other/LogoTile';

import Actions from '~/state/Actions';
const config = require('../../../config.json');

import 'mapbox-gl/dist/mapbox-gl.css';

const mapConfig = {
    minZoom: 6,
    maxZoom: 17,
    dragRotate: false,
    bearing: 0,
    maxBounds: [
      [10, 50],
      [15, 54]
    ],
    accessToken: process.env.MAP_TOKEN
  };

  const MapGL = ReactMapboxGl({ ...mapConfig });

  const MapWrapper = styled.div`
    height: 100vh;
    width: 100%;
    flex: 1;
    flex-shrink: 1;
    flex-grow: 1;
    position: relative;
    opacity: ${props => (props.isLoading ? 0 : 1)};
`;

class Map extends PureComponent {
    state = {
        map: false,
    };

    posArray(e) {
        const obj = e.lngLat.wrap();
        const lat = obj.lat;
        const lng = obj.lng;
        // console.log(`[${lng},${lat}]`)
    }

    componentDidMount() {
        this.props.loadDataApi();
    }

    onData(map) {
        const { data } = this.props;
        const layerIds = Object.keys(map.style._layers).join(''); // eslint-disable-line

        if (layerIds !== this.lastLayerIds) {
        MapUtils.orderLayers(map, LayerOrder);
        }

        this.lastLayerIds = layerIds;
    }

    onStyleLoad = (map) => {
        map.resize();
        this.setState({map});

        map.jumpTo({
            center: this.props.mapCenter,
            zoom: this.props.mapZoom[0]
        });
    }

    render() {
        const {
            mapZoom,
            mapCenter,
          } = this.props;

        const isLoading = this.props.isLoading;

        return (
            <MapWrapper isLoading={isLoading}>
                <MapGL
                    zoom={mapZoom}
                    center={mapCenter}
                    style={process.env.MAP_STYLE} // eslint-disable-line
                    containerStyle={{ height: '100%', width: '100%' }}
                    onStyleLoad={map => this.onStyleLoad(map)}
                    onData={map => this.onData(map)}
                    onClick={(map, e) => {this.posArray(e)}}
                    flyToOptions={config.map.flyToOptions}
                >
                    <Route exact path={['/', '/suche', '/liste', '/favoriten', '/info']} component={FilterView} />
                    <Tooltip />
                    <UIMap map={this.state.map}/>
                </MapGL>
                <LogoTile/>
            </MapWrapper>
        )
    }
}

export default withRouter(connect(state => ({
    mapZoom: state.mapZoom,
    mapCenter: state.mapCenter,
    data: state.data
  }), Actions)(Map));