import React, {Component} from 'react'
import {getObservationsThunk} from '../store/observationsReducer'
import {connect} from 'react-redux'
import {CircleChart, CircleChartObservation} from './D3Components'

class AllObservations extends Component {
  componentDidMount() {
    this.props.onLoadObservations()
  }
  render() {
    const {observations} = this.props
    const headers = ['Name', 'Category', 'Occurence']
    const categoryData = observations.reduce((accum, obs) => {
      if (!accum[obs.category]) {
        accum[obs.category] = {
          id: obs.category,
          name: obs.category,
          quantity: 1
        }
      } else {
        accum[obs.category].quantity += 1
      }
      return accum
    }, {})
    const chartCategoryData = Object.values(categoryData)

    const obsData = observations.reduce((accum, obs) => {
      if (!accum[obs.name]) {
        accum[obs.name] = {
          id: obs.name,
          name: obs.name,
          quantity: obs.logs.length
        }
      } else {
        accum[obs.name].quantity += obs.logs.length
      }
      return accum
    }, {})
    const chartObsData = Object.values(obsData)

    if (observations.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        <div className="Container">
          <div className="ChartContainer">
            <h4>Category Breakdown</h4>
            <CircleChart data={chartCategoryData} />
          </div>
          <div className="ChartContainer">
            <h4>Observations Occurence Breakdown</h4>
            <CircleChartObservation data={chartObsData} />
          </div>
        </div>

        <table>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
          {observations.map(obs => (
            <tr key={obs.name}>
              <td>{obs.name}</td>
              <td>{obs.category}</td>
              <td>{obs.logs.length}</td>{' '}
              {/* We can make this lead to a link containing the list of dives */}
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  observations: state.observations
})

const mapDispatchToProps = dispatch => ({
  onLoadObservations: () => {
    dispatch(getObservationsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllObservations)
