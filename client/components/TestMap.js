import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = '' <--- Provide Access Token to line 22

class TestMap extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 1
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})} mapboxApiAccessToken='PUT TOKEN HERE'/>
    );
  }
}

export default TestMap
