import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getDiverLogsThunk, getDiverCertsThunk, getBadgesThunk} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'

/**
 * COMPONENT
 */
class DiverHome extends Component {
  componentDidMount() {
    this.props.loadDiverLogs(this.props.diver.id)
    this.props.loadDiverCerts(this.props.diver.id)
    this.props.loadDiverBadges(this.props.diver.id)
  }
  render() {
    const {firstName} = this.props.diver
    const {diverLogs, diverCerts, diverBadges} = this.props

    if (!this.props.diver.id) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        <h3>Welcome {firstName}!</h3>
        <div>
          {' '}
          <h3>Logs:</h3>
          {diverLogs.map(log => (
            <ul key={log.id}>
              <li>{log.diveName}</li>
            </ul>
          ))}
        </div>
        <div>
          {' '}
          <h3>Certifications:</h3>
          {diverCerts.map(cert => (
            <ul key={cert.id}>
              <li>
                {cert.provider} {cert.level}
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
        <div className = "canva">

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
    diverBadges: state.diverBadges
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DiverHome)

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
