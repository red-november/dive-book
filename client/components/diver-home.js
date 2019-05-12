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
import {TimeStringToFloat, Bubbles} from '../../utilities/d3Utils'
import * as d3 from 'd3'

/**
 * COMPONENT
 */
class DiverHome extends Component {
  constructor () {
    super()
    this.state = {
      BubblifyActivated: false
    }
  }
  async componentDidMount() {
    await this.props.loadDiverLogs(this.props.diver.id)
    await this.props.loadDiverCerts(this.props.diver.id)
    await this.props.loadDiverBadges(this.props.diver.id)
    await this.props.loadAllLogs()
  }

  BubblifyObservations = async (data) => {
    const canvas = d3.select('.canva')
    if(!this.state.BubblifyActivated) {
      await Bubbles(canvas, data)
      this.setState({
        BubblifyActivated: true
      })
    }
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

    if(!diverLogs.length === 0 || !diverCerts || !diverBadges) {
      this.reload()
    }

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
      return query
    }

    if (allLogs.length === 0) {
      return <h1>LOADING...</h1>
    }

    let result = {}
    let sights = []
    let data = {children: []}

    if (diverLogs[0]) {
      result = ObservationsQuery(diverLogs)
      sights = Object.keys(result)
      sights.forEach(sight => {
        data.children.push({
          Name: sight,
          Count: result[sight]
        })
      })
    }

    setTimeout(async () => {
        await this.BubblifyObservations(data)
      }, 50)

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
            {/* <ul>
              {sights.map(sight => (
                <li key={sight}>{`${sight} - ${result[sight]} Found`}</li>
              ))}
            </ul> */}
            <div className="canva"/>
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

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
