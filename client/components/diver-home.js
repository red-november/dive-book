import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getDiverLogsWithObservationsThunk,
  getDiverCertsThunk,
  // getBadgesThunk,
  getLogsThunk
} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import {LineChart, BarChart} from './D3Components'
import {TimeStringToFloat} from '../../utilities/d3Utils'

/**
 * COMPONENT
 */
class DiverHome extends Component {
  componentDidMount() {
    this.props.loadDiverLogs(this.props.diver.id)
    this.props.loadDiverCerts(this.props.diver.id)
    this.props.loadDiverBadges(this.props.diver.id)
    this.props.loadAllLogs()
  }
  render() {
    console.log('this.propssss', this.props)
    const {firstName, id} = this.props.diver
    const {diverLogs, diverCerts, diverBadges, allLogs} = this.props
    const ObservationsQuery = function (logs) {
      let query = {}
      let found = []
      logs.forEach((log) =>{
        log.observations.reduce((accum, obs) => {
          if(found.indexOf(obs.name) === -1) {
            accum[obs.name] = 1
            found.push(obs.name)
          }
          else {
            accum[obs.name] = 1 + accum[obs.name]
          }
          return accum
        },query)
        return query
      })
      console.log(query)
      return query
    }

    if (allLogs.length === 0) {
      return <h1>LOADING...</h1>
    }

    const result = ObservationsQuery(diverLogs)
    const sights = Object.keys(result)
    console.log("SIGHTS ----> ",sights)
    console.log("RESULT ----> ",result)
    console.log(diverLogs)

    return (
      <div>
        <h3>Welcome {firstName}!</h3>
        <div>
          {' '}
          <h3>Logs:</h3>
          {diverLogs.map(log => (
            <ul key={log.id}>
              <li>
                <Link to={`/logs/${log.id}`}>{log.diveName}</Link>
              </li>
            </ul>
          ))}
        </div>
        <div>
          {' '}
          <h3>Badges:</h3>
          {diverBadges.map(badge => (
            <ul key={badge.id}>
              <li>
                {badge.name} {badge.description}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <h3>Sightings:</h3>
            <ul>
              {sights.map(sight => (
                <li key={sight}>{`${sight} - ${result[sight]} Found`}</li>
              ))}
            </ul>
        </div>
        <div>

          <h3>Certifications:</h3>
          {diverCerts.map(cert => (
            <ul key={cert.id}>
              <li>
                <Link to={`/certs/${cert.id}`}>
                  {cert.provider} {cert.level}
                </Link>
              </li>
            </ul>
          ))}
          <button type="button">
            <Link to="/certs/create">Create New Certification</Link>
          </button>
        </div>

        <div className="canva" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    diver: state.diver,
    diverLogs: state.diverLogs,
    diverCerts: state.diverCerts,
    diverBadges: state.diverBadges,
    allLogs: state.logs
  }
}

const mapDispatchToProps = dispatch => ({
  loadDiverLogs: diverId => {
    dispatch(getDiverLogsWithObservationsThunk(diverId))
  },
  loadDiverCerts: diverId => {
    dispatch(getDiverCertsThunk(diverId))
  },
  loadDiverBadges: diverId => {
    dispatch(getDiverBadgesThunk(diverId))
  },
  loadAllLogs: () => {
    dispatch(getLogsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DiverHome)

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
