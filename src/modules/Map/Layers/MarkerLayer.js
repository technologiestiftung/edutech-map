import React, { PureComponent, Fragment } from "react";
import { connect } from "unistore/react";
import Actions from "~/state/Actions";
import { Layer, Feature } from "react-mapbox-gl";
import idx from "idx";

import { isMobile, noop } from "~/utils";

let clickTimeout = null;

const layoutIcon = { "icon-image": "marker-15" };

const paintProps = {
  "circle-radius": 10,
  "circle-color": "#223b53",
  "circle-stroke-color": "white",
  "circle-stroke-width": 1,
  "circle-opacity": 1,
};

function getPaintProps(props) {
  const detailId =
    idx(props, (_) => _.detailData.name) ||
    idx(props, (_) => _.highlightData.name) ||
    "";
  const tooltipId = idx(props, (_) => _.tooltipData.name) || "";
  const activeExpr = [
    "case",
    ["==", ["string", ["get", "name"]], detailId],
    2,
    3,
  ];
  const activeExprZoomedIn = [
    "case",
    ["==", ["string", ["get", "name"]], detailId],
    12,
    6,
  ];

  return {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      8,
      activeExpr,
      16,
      activeExprZoomedIn,
    ],
    "circle-color": [
      "case",
      ["==", ["string", ["get", "name"]], detailId],
      ["get", "color"],
      ["get", "isFiltered"],
      "#B8B8B8",
      ["get", "color"],
    ],
    "circle-stroke-color": [
      "case",
      ["==", ["string", ["get", "name"]], detailId],
      ["get", "color"],
      ["get", "isFiltered"],
      "#E8E8E8",
      ["get", "colorLight"],
    ],
    "circle-stroke-width": 4,
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
    }, 50);
  }

  renderFeat(feat, i) {
    const feature = (
      <Feature
        coordinates={feat.geometry.coordinates}
        key={`feat-${i}`}
        onClick={(evt) => this.timeoutClick(evt, feat)} // isMobile ? noop() :
        onMouseEnter={(evt) => this.handleMouseEnter(evt, feat)}
        onMouseLeave={(evt) => this.handleMouseLeave(evt)}
        onTouchStart={(evt) => this.handleClick(evt)}
        properties={feat.properties}
      />
    );
    return feature;
  }

  filterCategory(data, category, isFiltered = false) {
    return data.features
      .filter((d) =>
        isFiltered
          ? d.properties.isFiltered
          : !d.properties.isFiltered &&
            d.properties.category === category &&
            d.properties.homeschool
      )
      .map((feat, i) => this.renderFeat(feat, i));
  }

  renderLayer = (category) => {
    return (
      <Layer
        type="symbol"
        id="icon"
        layout={{ "icon-image": "edutech-app", "icon-size": 1.25 }}
        onMouseMove={(evt) => this.handleMouseMove(evt)}
      >
        {this.filterCategory(data, category)}
      </Layer>
    );
  };

  handleMouseEnter(evt, { properties = {} }) {
    // if (isMobile) {
    //   return this.props.setDetailRoute(properties.id);
    // }

    evt.map.getCanvas().style.cursor = "pointer";

    if (properties && properties.isFiltered) {
      return false;
    }

    this.props.setTooltipData(properties);
  }

  handleMouseLeave(evt) {
    evt.map.getCanvas().style.cursor = "";

    this.props.setTooltipData(null);
  }

  handleClick(evt, { properties = {} }) {
    evt.originalEvent.preventDefault();
    evt.originalEvent.stopPropagation();

    this.props.setDetailRouteWithListPath(properties.autoid);
    this.props.setSelectedData(true);
  }

  handleMouseMove(evt) {
    this.props.setTooltipPos([evt.lngLat.lng, evt.lngLat.lat]);
  }

  render() {
    const { data, highlightData, detailData } = this.props;
    const paintProps = getPaintProps(this.props);
    let highlightFeat = false;
    if (data) {
      highlightFeat = data.features.find(
        (feat) => highlightData && feat.properties.name === highlightData.name
      );
    }

    return (
      <Fragment>
        {/* Circle Marker below! */}
        {data && (
          <Layer
            id="MarkerLayer"
            type="circle"
            paint={paintProps}
            // minZoom={10}
            onMouseMove={(evt) => this.handleMouseMove(evt)}
          >
            {data.features
              .filter(
                (d) => !d.properties.isFiltered && !d.properties.homeschool
              )
              .map((feat) => this.renderFeat(feat))}
          </Layer>
        )}
        {data && (
          <Layer id="FilteredMarkerLayer" type="circle" paint={paintProps}>
            {data.features
              .filter(
                (d) => d.properties.isFiltered && !d.properties.homeschool
              )
              .map((feat) => this.renderFeat(feat))}
          </Layer>
        )}

        {data && (
          <Layer
            type="symbol"
            id="IconAppLayer"
            layout={{ "icon-image": "edutech-app", "icon-size": 1.25 }}
            onMouseMove={(evt) => this.handleMouseMove(evt)}
          >
            {this.filterCategory(data, "app")}
          </Layer>
        )}
        {data && (
          <Layer
            type="symbol"
            id="IconMediaLayer"
            layout={{ "icon-image": "edutech-media", "icon-size": 1.25 }}
            onMouseMove={(evt) => this.handleMouseMove(evt)}
          >
            {this.filterCategory(data, "media")}
          </Layer>
        )}
        {data && (
          <Layer
            type="symbol"
            id="IconServiceLayer"
            layout={{ "icon-image": "edutech-service", "icon-size": 1.25 }}
            onMouseMove={(evt) => this.handleMouseMove(evt)}
          >
            {this.filterCategory(data, "service")}
          </Layer>
        )}
        {data && (
          <Layer
            type="symbol"
            id="IconHardwareLayer"
            layout={{ "icon-image": "edutech-hardware", "icon-size": 1.25 }}
            onMouseMove={(evt) => this.handleMouseMove(evt)}
          >
            {this.filterCategory(data, "hardware")}
          </Layer>
        )}
        {data && (
          <Layer
            type="symbol"
            id="IconFilteredLayer"
            layout={{ "icon-image": "edutech-filtered", "icon-size": 1.25 }}
          >
            {data.features
              .filter((d) => d.properties.isFiltered && d.properties.homeschool)
              .map((feat, i) => this.renderFeat(feat, i))}
          </Layer>
        )}
        {data && highlightFeat && (
          <Layer id="HighlightLayer" type="circle" paint={paintProps}>
            <Feature
              coordinates={highlightFeat.geometry.coordinates}
              key={highlightFeat.properties.name}
              properties={highlightFeat.properties}
            />
          </Layer>
        )}
      </Fragment>
    );
  }
}

export default connect((state) => state, Actions)(MarkerLayer);
