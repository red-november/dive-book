import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import {getDiverLogsThunk, getNearestDiveThunk} from '../store'
// import dotenv from 'dotenv'

// dotenv.config()

class SingleDiverMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  async componentDidMount() {
    if ('geolocation' in navigator) {
      await navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          curLong: pos.coords.longitude,
          curLat: pos.coords.latitude,
          showNearest: true
        })
      })
    }
  }

  async componentDidUpdate() {
    if (this.props.logs.length === 0 && this.props.diver.id) {
      await this.props.fetchDiverLogs(this.props.diver.id)
      if (this.state.showNearest) {
        this.props.fetchNearest(`${this.state.curLong},${this.state.curLat}`)
        console.log('here:')
      }
    }
  }

  render() {
    const {logs, diver} = this.props
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
        {diver.nearest && (
          <Marker
            key={diver.nearest.dist}
            latitude={diver.nearest.geog.coordinates[1]}
            longitude={diver.nearest.geog.coordinates[0]}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <i className="fas fa-flag nearflag" />
            {/* <img src="../../public/diveflag.svg" /> */}
          </Marker>
        )}
      </ReactMapGL>
    )
  }
}

const mapStateToProps = state => ({
  diver: state.diver,
  logs: state.diverLogs
})

const mapDispatchToProps = dispatch => ({
  fetchDiverLogs: id => {
    dispatch(getDiverLogsThunk(id))
  },
  fetchNearest: coords => {
    dispatch(getNearestDiveThunk(coords))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDiverMap)
