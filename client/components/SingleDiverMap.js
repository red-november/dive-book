import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
// import dotenv from 'dotenv'

// dotenv.config()

class SingleDiverMap extends Component {
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 1.8
    }
  }

  render() {
    let coordArr = [
      {
        Location: 'Sipadan Island, Malaysia',
        Latitude: 4.114683,
        Longitude: 118.628756
      },
      {Location: 'Palau, Micronesia', Latitude: 7.5, Longitude: 134.616667},
      {
        Location: 'Belize City, Belize',
        Latitude: 17.498611,
        Longitude: -88.188611
      },
      {Location: 'Yongala, Australia', Latitude: -33.0255, Longitude: 138.7581},
      {
        Location: 'Ras Mohammed, Egypt',
        Latitude: 27.722222,
        Longitude: 34.253889
      },
      {
        Location: 'Sharm El Sheikh, Egypt',
        Latitude: 27.912222,
        Longitude: 34.329722
      },
      {Location: 'Honolulu, Hawaii', Latitude: 21.3, Longitude: -157.816667},
      {
        Location: 'Navy Pier, Western Australia',
        Latitude: -21.817378,
        Longitude: 114.191304
      },
      {Location: 'Bali, Indonesia', Latitude: -8.335, Longitude: 115.088056},
      {
        Location: 'Galapagos Islands, Ecuador',
        Latitude: -0.666667,
        Longitude: -90.55
      },
      {
        Location: 'Verde Island, Philippines',
        Latitude: 13.549722,
        Longitude: 121.070833
      },
      {Location: 'Palawan, Philippines', Latitude: 10, Longitude: 118.83},
      {Location: 'Monterey Bay, California', Latitude: 36.8, Longitude: -121.9},
      {
        Location: 'Santa Catalina Island, California',
        Latitude: 33.383333,
        Longitude: -118.416667
      },
      {
        Location: 'Channel Islands National Park',
        Latitude: 34.008333,
        Longitude: -119.416667
      },
      {
        Location: 'Florida Keys, Florida',
        Latitude: 24.666944,
        Longitude: -81.544167
      },
      {Location: 'New York, NY', Latitude: 40.7127, Longitude: -74.0059}
    ]
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFycmlzb25jb2xlIiwiYSI6ImNqdmZlNzU4ZDJ0NmwzeW9qMXc5dmN0Z2IifQ.dvn1e9WbmgwBDgbbJ1OCfQ"
      >
        {coordArr.map(coord => (
          <Marker
            key={coord.Location}
            latitude={coord.Latitude}
            longitude={coord.Longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <i className="fas fa-flag diveflag" />
          </Marker>
        ))}{' '}
      </ReactMapGL>
    )
  }
}

export default SingleDiverMap

// <Marker
//   latitude={37.78}
//   longitude={-122.41}
//   offsetLeft={-20}
//   offsetTop={-10}
// >
//   <i className="fas fa-flag diveflag" />
// </Marker>
