import React, {Component} from 'react'
import {getLogsThunk} from '../store/allLogsReducer'
import {connect} from 'react-redux'
import {CircleChart} from './D3Test'

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
      <div>
        <CircleChart data={chartData} />
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
