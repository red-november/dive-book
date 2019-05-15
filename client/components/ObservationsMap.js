import React, {Component} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import {getObservationCoordThunk} from '../store'
import {Link} from 'react-router-dom'

class ObservationsMap extends Component {
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
      popupInfo: null
    }
  }

  async componentDidMount() {
    await this.props.fetchObservationsCoords(this.props.match.params.obsId)
  }

  async componentDidUpdate() {
    if (this.props.observations.length === 0) {
      await this.props.fetchObservationsCoords(this.props.match.params.obsId)
    }
  }

  renderPopup() {
    const {popupInfo} = this.state
     if (popupInfo && popupInfo.imageUrl) {
      return (
        <Popup
          tipSize={5}
          latitude={popupInfo.coordinates[1]}
          longitude={popupInfo.coordinates[0]}
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
              {`Sightings: ${popupInfo.counter}`}
            </div>
            <div>
              <img
                src={`${popupInfo.imageUrl}`}
                alt="Observation Image"
              />
            </div>
            <div>
                <Link to={`/observations/${popupInfo.id}`}>Details</Link>
            </div>
          </div>
        </Popup>
      )
    }
  }

  render() {
    const {observations} = this.props

    let query = observations.reduce((accum, obs) => {
      if(!accum[obs.location]) {
        accum[obs.location] = {
          id: obs.observationId,
          location: obs.location,
          coordinates: obs.geog.coordinates,
          counter: 1,
          diveName: obs.diveName,
          date: obs.date,
          logId: obs.logId,
          imageUrl: obs.imageUrl
        }
      }
      else {
        accum[obs.location].counter = 1 + accum[obs.location].counter
      }
      return accum
    },{})

    let data = Object.entries(query)

    if (observations.length === 0) {
      return <h1>LOADING</h1>
    }
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFycmlzb25jb2xlIiwiYSI6ImNqdmgyYW1iejBkeW00NG9jZDVidzNraDMifQ.8UJj9FAH_jJiFPcUAJ22KA"
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {data.map(obs => obs[1].coordinates && (
          <div key={obs[0]}>
            <Marker
              latitude={obs[1].coordinates[1]}
              longitude={obs[1].coordinates[0]}
              offsetLeft={-20}
              offsetTop={-10}
            >
            {obs[1].counter < 6 ?
            <i
              className="fas fa-fish fa-lg tierOne"
              onClick={() => this.setState({popupInfo: obs[1]})}
            />
            :
            obs[1].counter < 11 ?
            <i
              className="fas fa-fish fa-2x tierTwo"
            onClick={() => this.setState({popupInfo: obs[1]})}
            />
            :
            <i
              className="fas fa-fish fa-3x tierThree"
              onClick={() => this.setState({popupInfo: obs[1]})}
            />
            }
            </Marker>
          </div>
        ))}
        <div className="mapKey">
          <div className="mapKey-title">{`Number of Sightings of ${observations[0].name}`}</div>
          <div>
            <i className="fas fa-fish tierOne" />
            <span className="mapKey-desc">1 to 5</span>
          </div>
          <div>
            <i className="fas fa-fish tierTwo" />
            <span className="mapKey-desc">6 to 10</span>
          </div>
          <div>
            <i className="fas fa-fish tierThree" />
            <span className="mapKey-desc">11+</span>
          </div>

        </div>
        {this.renderPopup()}
      </ReactMapGL>
    )
  }
}

const mapStateToProps = state => ({
  observations: state.observationsMap
})

const mapDispatchToProps = dispatch => ({
  fetchObservationsCoords: id => {
    dispatch(getObservationCoordThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ObservationsMap)
