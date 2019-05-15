import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getDiverLogsWithObservationsThunk,
  getDiverCertsThunk,
  getLogsThunk
} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import {LineChart, BarChart} from './D3Components'
import {TimeStringToFloat, Bubbles} from '../../utilities/d3Utils'
import * as d3 from 'd3'
import Loading from './styling/Loading'
import ExpansionPanel from './styling/ExpansionPanel'
import moment from 'moment'

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

  componentDidUpdate() {
    if (this.props.diverLogs.length > 0) {
      let data = ObservationsQuery(this.props.diverLogs)
      this.BubblifyObservations(data)
    }
  }

  BubblifyObservations = async data => {
    const canvas = d3.select('.canva')
    let success = await Bubbles(canvas, data)
    let svgAll = document.querySelectorAll('svg')
    let counter = svgAll.length
    console.log(counter)
    while (counter > 1) {
      svgAll = document.querySelectorAll('svg')
      let svgSelected = document.querySelectorAll('svg')[1]
      svgSelected.parentNode.removeChild(svgSelected)
      counter--
      console.log(counter)
    }
    return success
  }

  render() {
    if (!this.props.diver.id) {
      return <Loading />
    }
    const {firstName, id, createdAt} = this.props.diver
    let {diverLogs, diverCerts, diverBadges, allLogs} = this.props
    let data = ObservationsQuery(diverLogs)
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
                content: diverLogs.map(log => (
                  <li key={log.id}>
                    <Link className="rrLink" to={`/logs/${log.id}`}>
                      {log.diveName}: {log.date.slice(0, 10)}
                    </Link>
                  </li>
                ))
              },

              {
                name: `${data.children.length} Sightings.`,
                content: (
                  <div>
                    <div className="canva bubbles" />
                  </div>
                )
              }

              // {
              //   name:
              //     sights.length === 1
              //       ? '1 Sighting'
              //       : `${sights.length} Sightings`,
              //   content: sights.map(sight => (
              //     <li key={sight}>
              //       {
              //         <Link
              //           className="rrLink"
              //           to={`observations/${sight[1].id}`}
              //         >
              //           {sight[0]} - {sight[1].count} times
              //         </Link>
              //       }
              //     </li>
              //   ))
              // }
            ]}
          />
        </div>
        <div>
          {' '}
          <h3>Badges:</h3>
          {diverBadges.map(badge => (
            <ul key={badge.id}>
              <li className="Badge">
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
                <Link className="rrLink" to={`/certs/${cert.id}`}>
                  {cert.provider} {cert.level}
                </Link>
              </li>
            </ul>
          ))}
          <button type="button" className="btn-main btn-cert">
            <Link className="rrLink-btn" to="/certs/create">
              Add Certification
            </Link>
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
          accum[obs.name] = {
            id: obs.id,
            count: 1,
            imageUrl: obs.imageUrl,
            name: obs.name
          }
        } else {
          accum[obs.name].count = 1 + accum[obs.name].count
        }
        return accum
      }, query)
    return query
  })
  return {children: Object.values(query)}
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
