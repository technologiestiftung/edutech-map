import React, { PureComponent, Fragment } from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { connect } from "unistore/react";
import Actions from "~/state/Actions";

const layout = {
  // 'text-field': ['get', 'description'],
  // 'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
  // 'text-radial-offset': 0.5,
  // 'text-justify': 'auto',
  "icon-image": "airfield-15"
};

const symbolLayout = {
  "text-color": "black"
};

class IconLayer extends PureComponent {

  renderFeat(feat, i) {
    const feature = (
      <Feature
        coordinates={feat.geometry.coordinates}
        key={`feat-${i}`}
        // onClick={evt => (this.timeoutClick(evt, feat))} // isMobile ? noop() :
        // onMouseEnter={evt => this.handleMouseEnter(evt, feat)}
        // onMouseLeave={evt => this.handleMouseLeave(evt)}
        // onTouchStart={evt => this.handleClick(evt)}
        properties={feat.properties}
      />
    );
    return feature;
  }
  
  filterCategory(data, category) {
    return data.features
      .filter(
        d =>
          !d.properties.isFiltered &&
          d.properties.category === category &&
          d.properties.homeschooling
      )
      .map((feat, i) => this.renderFeat(feat, i))
  }


  render() {
    const { data, detailData, highlightData } = this.props;
    return (
      <Fragment>
        {data && (
          <Layer
            type="symbol"
            id="icon"
            layout={{ "icon-image": "edutech-app", "icon-size": 1.25 }}
          >
            {this.filterCategory(data, 'app')}
          </Layer>
        )}
      </Fragment>
    );
  }
}

export default connect(state => state, Actions)(IconLayer);
