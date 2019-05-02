import React, {Component} from 'react'
import {getLogsThunk} from '../store/allLogsReducer'
import {connect} from 'react-redux'

class AllLogs extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.onLoadLogs()
  }
  render() {
    const {logs} = this.props

    if (logs.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        {logs.map(log => (
          <ul key={log.id}>
            <li>
              {log.id} {log.diveName}
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  logs: state.logs
})

const mapDispatchToProps = dispatch => ({
  onLoadLogs: () => {
    dispatch(getLogsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLogs)
