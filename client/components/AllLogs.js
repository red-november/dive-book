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
    const headers = ['Dive Name', 'Date', 'Location', 'Link' ]
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
    console.log(logs)

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

            <table>
            <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
              {logs.map(log => (
              <tr key={log.id}>
                <td>{log.diveName}</td>
                <td>{log.date.slice(0,10)}</td>
                <td>{log.location}</td>
                {/* <Link to={`/observations/${log.id}`}> */}
                <td>Link to Entry</td>
                {/* </Link> */}
              </tr>
            ))}
          </table>
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
