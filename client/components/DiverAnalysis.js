import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getDiverLogsThunk,
  getDiverCertsThunk,
  getLogsThunk
} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import {DiveTimeChartWithToolTip, AirEfficiencyChartWithToolTip, BarChart, DepthChartWithToolTip} from './D3Components'
import {TimeStringToFloat} from '../../utilities/d3Utils'
import history from '../history'

class DiverAnalysis extends Component {
  constructor(){
    super()
    this.state = {
      AnomalyDetected: false
    }
  }

  async componentDidMount() {
    await this.props.loadDiverLogs(this.props.diver.id)
    await this.props.loadDiverCerts(this.props.diver.id)
    await this.props.loadDiverBadges(this.props.diver.id)
    await this.props.loadAllLogs()
  }

  RerenderIfAnomaly = async () => {
    let ticks = document.querySelectorAll("g.tick").length
    if(ticks > 5000 && !this.state.AnomalyDetected) {
      console.log("called")
      await this.setState({
        AnomalyDetected: true
      })
      history.push("/loading")
      setTimeout(() =>
      history.push("/home/analysis"), 500)

    }
  }

  render() {
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

    let usersThatDive = []

    const numberOfDivesComparisonData = allLogs.reduce(
      (accum, log) => {
        if (usersThatDive.indexOf(log.diverId) === -1) {
          usersThatDive.push(log.diverId)
        }
        if (log.diverId === id) {
          accum.myDives += 1
        } else {
          accum.otherDives += 1
        }
        return accum
      },
      {myDives: 0, otherDives: 0}
    )

    numberOfDivesComparisonData.otherDives =
      numberOfDivesComparisonData.otherDives / (usersThatDive.length - 1)

    const timeUnderWaterData = {
      dataByTopic: [
        {
          topicName: 'Time Under Water in mintues',
          topic: 'Time Under Water in mintues',
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

    const maxDepthData = diverLogs.reduce((accum, log) => {
      accum.push({
        date: log.date,
        name: 'Max Depth',
        value: log.maxDepth
      })
      return accum
    }, [])

    if (allLogs.length === 0 || diverLogs.length === 0) {
      return <h1>LOADING...</h1>
    }

    setTimeout(() => this.RerenderIfAnomaly(),1)


    return (
      <div className="Container">
        <div className="ChartContainer">
          <h4>Time Under Water Breakdown(mins)</h4>
          <DiveTimeChartWithToolTip data={timeUnderWaterData} />
        </div>
        <div className="ChartContainer">
          <h4>Air Consumption Breakdown (Bar per min)</h4>
          <AirEfficiencyChartWithToolTip data={airEfficiencyData} />
        </div>
        <div className="ChartContainer">
          <h4>Number of Dives Comparison</h4>
          <BarChart
            data={[
              {
                value: numberOfDivesComparisonData.myDives,
                name: 'Your Dives'
              },
              {
                value: numberOfDivesComparisonData.otherDives,
                name: 'Avg Number of Dives for Other Divers'
              }
            ]}
          />
        </div>
        <div className="ChartContainer">
          <h4>Max Depth History</h4>
          <DepthChartWithToolTip
            data={maxDepthData}
          />
        </div>
      </div>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(DiverAnalysis)

