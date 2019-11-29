import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl from 'react-mapbox-gl';

import FilterView from './MapViews/FilterView';
import Tooltip from '../Tooltip';

import Actions from '~/state/Actions';
const config = require('../../../config.json');

const mapConfig = {
    minZoom: 8,
    maxZoom: 17,
    dragRotate: false,
    bearing: 0,
    maxBounds: [
      [10, 50],
      [15, 54]
    ],
    accessToken: config.map.token
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

    componentDidMount() {
        this.props.loadDataApi();
    }

    onStyleLoad = (map) => {
        map.resize();
        this.setState({ isLoading: false});

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
                    // bearing={mapConfig.bearing}
                    style={config.map.style} // eslint-disable-line
                    containerStyle={{ height: '100%', width: '100%' }}
                    onStyleLoad={map => this.onStyleLoad(map)}
                    // flyToOptions={config.map.flyToOptions}
                    // onData={map => this.onData(map)}
                    // fitBounds={districtBounds}
                    // maxBounds={mapConfig.maxBounds}
                    // onMoveEnd={() => this.onMoveEnd()}
                >
                    <Route exact path={['/', '/suche', '/liste', '/favoriten', '/info']} component={FilterView} />
                    <Tooltip />
                </MapGL>
            </MapWrapper>
        )
    }
}

export default withRouter(connect(state => ({
    mapZoom: state.mapZoom,
    data: state.data,
    mapCenter: state.mapCenter
  }), Actions)(Map));