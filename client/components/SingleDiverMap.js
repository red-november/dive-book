import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import {getLogsThunk} from '../store'
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
    },
    showNearest: false,
    curLong: 0,
    curLat: 0
  }

  async componentDidMount() {
    if (this.props.logs.length === 0) {
      await this.props.fetchLogs()
    }

    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(pos => {
    //     this.setState({
    //       curLong: pos.coords.longitude,
    //       curLat: pos.coords.latitiude,
    //       showNearest: true
    //     })
    //     console.log('new state:', this.state)
    //   })
    // }
  }

  render() {
    const {logs} = this.props
    if (logs.length === 0) {
      return <h1>LOADING</h1>
    }
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFycmlzb25jb2xlIiwiYSI6ImNqdmgyYW1iejBkeW00NG9jZDVidzNraDMifQ.8UJj9FAH_jJiFPcUAJ22KA"
      >
        {logs.map(
          log =>
            log.geog && (
              <Marker
                key={log.id}
                latitude={log.geog.coordinates[1]}
                longitude={log.geog.coordinates[0]}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <i className="fas fa-flag diveflag" />
                {/* <img src="../../public/diveflag.svg" /> */}
              </Marker>
            )
        )}{' '}
      </ReactMapGL>
    )
  }
}

const mapStateToProps = state => ({
  logs: state.logs
})

const mapDispatchToProps = dispatch => ({
  fetchLogs: () => {
    dispatch(getLogsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDiverMap)
