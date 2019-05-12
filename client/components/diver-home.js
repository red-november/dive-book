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
import moment from 'moment'
import Button from '@material-ui/core/Button'

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

  render() {
    if (!this.props.diver.id) {
      return <Loading />
    }
    const {firstName, createdAt} = this.props.diver
    let {diverLogs, diverCerts, diverBadges, allLogs} = this.props
    let sights = ObservationsQuery(diverLogs)
    diverLogs = sortLogsByDate(diverLogs).reverse()

    return (
      <div className="page-container">
        <h3 className="welcome-bar">Welcome {firstName}!</h3>
        <h6 className="member-date">
          memeber since {moment(createdAt).format('YYYY')}
        </h6>
        <div>
          <ExpansionPanel
            itemArr={[
              {
                name:
                  diverLogs.length == 1
                    ? '1 Logged Dive'
                    : `${
                        diverLogs.length
                      } Logged Dives. Total bottom time: ${getBottomTime(
                        diverLogs
                      )} hours.`,
                content: [
                  diverLogs.map(log => (
                    <li key={log.id}>
                      <Link to={`/logs/${log.id}`}>
                        {log.diveName}: {log.date.slice(0, 10)}
                      </Link>
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
                  <li key={sight}>
                    {
                      <Link to={`observations/${sight[1].id}`}>
                        {sight[0]} - {sight[1].count} times
                      </Link>
                    }
                  </li>
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
  return Math.round(
    logArr.reduce((accum, log) => {
      let hrIn = Number(log.timeIn.slice(0, 2))
      let minIn = Number(log.timeIn.slice(3, 5))
      let timeIn = moment()
        .hour(hrIn)
        .minute(minIn)

      let hrOut = Number(log.timeOut.slice(0, 2))
      let minOut = Number(log.timeOut.slice(3, 5))
      let timeOut = moment()
        .hour(hrOut)
        .minute(minOut)

      let bottomTime = moment.duration(timeOut.diff(timeIn))
      let minutesUnder = bottomTime._data.minutes + bottomTime._data.hours * 60
      console.log('mins:', minutesUnder)
      if (minutesUnder > 0 && minutesUnder < 300) {
        return accum + minutesUnder
      }
    }, 0) / 60
  )
}

function ObservationsQuery(logs) {
  let query = {}
  logs.forEach(log => {
    log.observations &&
      log.observations.reduce((accum, obs) => {
        if (!accum[obs.name]) {
          accum[obs.name] = {id: obs.id, count: 1}
        } else {
          accum[obs.name].count = 1 + accum[obs.name].count
        }
        return accum
      }, query)
    return query
  })
  return Object.entries(query)
}

function sortLogsByDate(logs) {
  return logs.sort((a, b) => b.date - a.date)
}

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
