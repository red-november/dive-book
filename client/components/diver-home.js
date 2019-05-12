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
import Loading from './styling/Loading'
import ExpansionPanel from './styling/ExpansionPanel'

/**
 * COMPONENT
 */
class DiverHome extends Component {
  async componentDidMount() {
    await this.props.loadDiverLogs(this.props.diver.id)
    await this.props.loadDiverCerts(this.props.diver.id)
    await this.props.loadDiverBadges(this.props.diver.id)
    await this.props.loadAllLogs()
  }

  reload = async () => {
    await this.props.loadDiverLogs(this.props.diver.id)
    await this.props.loadDiverCerts(this.props.diver.id)
    await this.props.loadDiverBadges(this.props.diver.id)
    await this.props.loadAllLogs()
  }

  render() {
    const {firstName, id} = this.props.diver
    const {diverLogs, diverCerts, diverBadges, allLogs} = this.props

    if (!diverLogs.length === 0 || !diverCerts || !diverBadges) {
      this.reload()
    }

    const ObservationsQuery = function(logs) {
      let query = {}
      let found = []
      logs.forEach(log => {
        log.observations.reduce((accum, obs) => {
          if (found.indexOf(obs.name) === -1) {
            accum[obs.name] = 1
            found.push(obs.name)
          } else {
            accum[obs.name] = 1 + accum[obs.name]
          }
          return accum
        }, query)
        return query
      })
      console.log(query)
      return query
    }

    if (allLogs.length === 0) {
      return <Loading />
    }

    let result = {}
    let sights = []

    if (diverLogs.length > 0) {
      result = ObservationsQuery(diverLogs)
      sights = Object.keys(result)
    }

    return (
      <div className="page-container">
        <h3 className="welcome-bar">Welcome {firstName}!</h3>
        <div>
          <ExpansionPanel
            itemArr={[
              {
                name:
                  diverLogs.lengght == 1
                    ? '1 Logged Dive'
                    : `${diverLogs.length} Logged Dives. ${getBottomTime(
                        diverLogs
                      )} total bottom time.`,
                content: [
                  diverLogs.map(log => (
                    <li key={log.id}>
                      <Link to={`/logs/${log.id}`}>{log.diveName}</Link>
                    </li>
                  ))
                ]
              },
              {
                name:
                  sights.length === 1
                    ? '1 Sighting'
                    : `${sights.length} Sightings`,
                content: sights.map(sight => (
                  <li key={sight}>{`${sight} - ${result[sight]} times`}</li>
                ))
              }
            ]}
          />
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

function getBottomTime(logArr) {
  return logArr.reduce((accum, log) => accum + (log.timeIn - log.timeOut), 0)
}

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
