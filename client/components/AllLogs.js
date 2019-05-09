import React, {Component} from 'react'
import {getLogsThunk} from '../store/allLogsReducer'
import {connect} from 'react-redux'
import {CircleChart} from './D3Components'

class AllLogs extends Component {
  constructor(props) {
    super(props)
    this.state = {activated: false}
  }
  componentDidMount() {
    this.props.onLoadLogs()
  }

  activated = () => {
    this.setState({
      activated: true
    })
  }
  deActivated = () => {
    this.setState({
      activated: false
    })
  }

  render() {
    const {logs} = this.props
    const {activated} = this.state
    const data = logs.reduce((accum, log) => {
      if (!accum[log.diveName]) {
        accum[log.diveName] = {
          id: log.id,
          name: log.diveName,
          quantity: 1
        }
      } else {
        accum[log.diveName].quantity += 1
      }

      return accum
    }, {})
    const chartData = Object.values(data)

    if (logs.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div className="ChartContainer">
        <h4>Number of Dives by Logs</h4>
        <CircleChart data={chartData} className="Chart" />
        {!activated ? (
          <button type="button" onClick={this.activated}>
            Activate All Logs List
          </button>
        ) : (
          <button type="button" onClick={this.deActivated}>
            Deactivate All Logs List
          </button>
        )}

        {activated ? (
          logs.map(log => (
            <ul key={log.id}>
              <li>
                {log.id} {log.diveName}
              </li>
            </ul>
          ))
        ) : (
          <div />
        )}
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
