import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getDiverLogsThunk,
  getDiverCertsThunk,
  // getBadgesThunk,
  getLogsThunk
} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import {LineChart, BarChart} from './D3Components'

import {TimeStringToFloat} from '../../utilities/d3Utils'
import Loading from './styling/Loading'

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

    if (allLogs.length === 0) {
      return <Loading />
    }

    return (
      <div className="page-container">
        <h3 className="welcome-bar">Welcome {firstName}!</h3>
        <div>
          {' '}
          <h3 className="title">Logs:</h3>
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
    dispatch(getDiverLogsThunk(diverId))
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
