import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getDiverLogsThunk} from '../store/diverProfileReducer'

/**
 * COMPONENT
 */
class DiverHome extends Component {
  componentDidMount() {
    this.props.loadDiverLogs(this.props.diver.id)
  }
  render() {
    const {firstName} = this.props.diver
    const {diverProfile} = this.props
    console.log(diverProfile)

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
    diverProfile: state.diverProfile
  }
}

const mapDispatchToProps = dispatch => ({
  loadDiverLogs: diverId => {
    dispatch(getDiverLogsThunk(diverId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DiverHome)

/**
 * PROP TYPES
 */
// DiverHome.propTypes = {
//   email: PropTypes.string
// }
