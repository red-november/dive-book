import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getDiverLogsThunk,
  getDiverCertsThunk,
  getBadgesThunk,
  getLogsThunk
} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import {LineChart, BarChart} from './D3Components'
import {timeDay} from 'd3-time'
import {TimeStringToFloat} from '../../utilities/d3Utils'
import AllLogs from './AllLogs'

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
    const timeUnderWaterDateData = diverLogs.reduce((accum, log) => {
      if (log) {
        accum.push({
          date: log.date,
          value:
            (TimeStringToFloat(log.timeOut) - TimeStringToFloat(log.timeIn)) *
            60
        })
      }
      return accum
    }, [])

    const airEfficiencyDateData = diverLogs.reduce((accum, log) => {
      if (log) {
        accum.push({
          date: log.date,
          value:
            (log.tankPressureStart - log.tankPressureEnd) /
            ((TimeStringToFloat(log.timeOut) - TimeStringToFloat(log.timeIn)) *
              60)
        })
      }
      return accum
    }, [])

    // const numberOfDivesComparisonData = allLogs.reduce((accum, log) => {
    //   if (!accum.myDives && log.diverId === id) {
    //     accum.myDives = {
    //       id: log.id,
    //       name: log.diverId,
    //       value: 1
    //     }
    //   } else if(log.) {
    //     accum[log.diverId].value += 1
    //   }
    // })

    const timeUnderWaterData = {
      dataByTopic: [
        {
          topicName: 'Time Under Water',
          topic: 'Time Under Water',
          dates: timeUnderWaterDateData
        }
      ]
    }

    const airEfficiencyData = {
      dataByTopic: [
        {
          topicName: 'Air Consumption per min',
          topic: 'Air Consumption per min',
          dates: airEfficiencyDateData
        }
      ]
    }
    // const chartTimeUnderWaterDate = Object.values(timeUnderWaterData)
    console.log('time under water', airEfficiencyDateData)

    if (this.props.allLogs.length === 0) {
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
        <div className="Container">
          <div className="ChartContainer">
            <h4>Time Under Water Breakdown</h4>
            <LineChart data={timeUnderWaterData} />
          </div>
          <div className="ChartContainer">
            <h4>Air Consumption Bar per min Breakdown</h4>
            <LineChart data={airEfficiencyData} />
          </div>
          <div className="ChartContainer">
            <h4>Number of Dives for All Divers</h4>
            {/* <BarChart data={airEfficiencyData} /> */}
          </div>
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
