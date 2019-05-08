import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = ''

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
        onViewportChange={(viewport) => this.setState({viewport})} mapboxApiAccessToken='pk.eyJ1IjoiYXp1cmVzb2x1dGUiLCJhIjoiY2p0NGluc3Y5MWFuZTQ0bWp4cWpuczJibSJ9.6gFyZERSJnukMTuti2vJSQ'/>
    );
  }
}

export default TestMap
