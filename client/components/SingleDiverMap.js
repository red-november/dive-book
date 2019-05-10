import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import {getDiverLogsThunk, getNearestDiveShopThunk} from '../store'
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
      showNearest: true,
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
      if (this.state.showNearest) {
        this.props.fetchNearest(`${this.state.curLong},${this.state.curLat}`)
      }
    }
  }

  async componentDidUpdate() {
    if (this.props.logs.length === 0 && this.props.diver.id) {
      await this.props.fetchDiverLogs(this.props.diver.id)
      if (this.state.showNearest) {
        this.props.fetchNearest(`${this.state.curLong},${this.state.curLat}`)
        // this.props.fetchNearest('100.9925,15.8700')
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
          </Marker>
        )}
        <div className="mapKey">
          <div className="mapKey-title">Key</div>
          <div>
            <i className="fas fa-flag diveflag" />:<span className="mapKey-desc">
              My Dives
            </span>
          </div>
          <div>
            <i className="fas fa-flag nearflag" />:<span className="mapKey-desc">
              Nearest Dive Shop
            </span>
          </div>
        </div>
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
    dispatch(getNearestDiveShopThunk(coords))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDiverMap)
