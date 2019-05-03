import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getDiverLogsThunk } from '../store/diverProfileReducer'
import { getDiverCertsThunk } from '../store/diverCertsReducer'
import { Certificate } from 'crypto';

/**
 * COMPONENT
 */
class DiverHome extends Component {
  componentDidMount() {
    this.props.loadDiverLogs(this.props.diver.id)
    this.props.loadDiverCerts(this.props.diver.id)
  }
  render() {

    const { firstName } = this.props.diver
    const { diverProfile, diverCerts } = this.props
    console.log(this.props.diverCerts)

    if (diverProfile.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        <h3>Welcome {firstName}!</h3>
        <div>
          {' '}
          <h3>Logs:</h3>
          {diverProfile.map(log => (
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
              <li>{cert.provider} {cert.level}</li>
            </ul>
          ))}
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
    diverProfile: state.diverProfile,
    diverCerts: state.diverCerts
  }
}

const mapDispatchToProps = dispatch => ({
  loadDiverLogs: diverId => {
    dispatch(getDiverLogsThunk(diverId))
  },
  loadDiverCerts: diverId => {
    dispatch(getDiverCertsThunk(diverId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DiverHome)

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
