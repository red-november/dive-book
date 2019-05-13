import React, {Component} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import {getDiverLogsThunk, getNearestDiveShopThunk} from '../store'
import {Link} from 'react-router-dom'
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
      curLat: 0,
      popupInfo: null
    }
  }

  async componentDidMount() {
    await this.props.fetchDiverLogs(this.props.diver.id)
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

    if (this.state.curLong === 0) {
      await setTimeout(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
              curLong: pos.coords.longitude,
              curLat: pos.coords.latitude,
              showNearest: true
            })
          })
          if (this.state.showNearest) {
            this.props.fetchNearest(
              `${this.state.curLong},${this.state.curLat}`
            )
          }
        }
      }, 50)
    }

    let counter = 0

    // This interval is needed because the pos.coords reset after around 10-30 seconds.
    // Notice that random /200 request pop up instead of /304 - This means new data.
    // That inactivity will cause the page to not render the nearest diveshop.
    // Mitigate this by calling fetchNearest every 5 seconds.
    // This also serves as insurance during unforeseen bugs:
    // Cue the line --> "Sometimes it takes a while to load because of how many data we have

    this.interval = setInterval(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.setState({
            curLong: pos.coords.longitude,
            curLat: pos.coords.latitude,
            showNearest: true
          })
        })
        if (this.state.showNearest) {
          this.props.fetchNearest(`${this.state.curLong},${this.state.curLat}`)
          counter++
        }
      }
    }, 5000)
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

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  renderPopup() {
    const {popupInfo} = this.state
    if (popupInfo && popupInfo.diveName) {
      return (
        <Popup
          tipSize={5}
          latitude={popupInfo.geog.coordinates[1]}
          longitude={popupInfo.geog.coordinates[0]}
          anchor="top"
          onClose={() => this.setState({popupInfo: null})}
          closeOnClick={false}
        >
          <div className="popup">
            <div>
              <strong>{popupInfo.diveName}</strong>
            </div>
            <div>
              <em>{popupInfo.location}</em>
            </div>
            <div>
              <em>{popupInfo.date.split('T')[0]}</em>
            </div>
            {/* add img here */}
            <div>
              <Link to={`/logs/${popupInfo.id}`}>Details</Link>
            </div>
          </div>
        </Popup>
      )
    } else if (popupInfo && popupInfo.storeFrontImgUrl) {
      return (
        <Popup
          tipSize={5}
          latitude={popupInfo.geog.coordinates[1]}
          longitude={popupInfo.geog.coordinates[0]}
          anchor="top"
          onClose={() => this.setState({popupInfo: null})}
          closeOnClick={false}
        >
          <div className="popup">
            <div>
              <strong>{popupInfo.name}</strong>
            </div>
            <div>
              <em>{popupInfo.location}</em>
            </div>
            <div>
              <img
                src={`/pictures/diveshop/${popupInfo.storeFrontImgUrl}`}
                alt="Store Front Image"
              />
            </div>
          </div>
        </Popup>
      )
    }
  }

  renderNearestPopup() {
    const {popupInfo} = this.state
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          latitude={popupInfo.geog.coordinates[1]}
          longitude={popupInfo.geog.coordinates[0]}
          anchor="top"
          onClose={() => this.setState({popupInfo: null})}
          closeOnClick={false}
        >
          <div className="popup">
            <div>
              <strong>{popupInfo.name}</strong>
            </div>
            <div>
              <em>{popupInfo.location}</em>
            </div>
            <div>
              <img src={popupInfo.storeFrontImgUrl} alt="Store Front Image" />
            </div>
          </div>
        </Popup>
      )
    )
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
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {logs.map(
          log =>
            log.geog && (
              <div>
                <Marker
                  key={log.id}
                  latitude={log.geog.coordinates[1]}
                  longitude={log.geog.coordinates[0]}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <i
                    className="fas fa-flag diveflag"
                    onClick={() => this.setState({popupInfo: log})}
                  />
                </Marker>
              </div>
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
            <i
              className="fas fa-flag nearflag"
              onClick={() => this.setState({popupInfo: diver.nearest})}
            />
          </Marker>
        )}
        <div className="mapKey">
          <div className="mapKey-title">Key</div>
          <div>
            <i className="fas fa-flag diveflag" />
            <span className="mapKey-desc">My Dives</span>
          </div>
          <div>
            <i className="fas fa-flag nearflag" />
            <span className="mapKey-desc">Nearest Dive Shop</span>
          </div>
        </div>
        {this.renderPopup()}
        {/* {this.renderNearestPopup()} */}
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
