import React, {Component} from 'react'
import {getObservationsThunk} from '../store/observationsReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CircleChart, CircleChartObservationToolTip} from './D3Components'

class AllObservations extends Component {
  constructor(props) {
    super(props)
    this.state = {activated: false}
  }

  componentDidMount() {
    this.props.onLoadObservations()
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
    const {observations} = this.props
    const {activated} = this.state
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
      <div className="ChartContainer">
        <div className="Container">
          <div className="ChartContainer">
            <h4>Category Breakdown</h4>
            <CircleChart data={chartCategoryData} />
          </div>
          {/* <div className="ChartContainer">
            <h4>Observations Occurence Breakdown</h4>
            <CircleChartObservationToolTip data={chartObsData} />
          </div> */}
        </div>
        {!activated ? (
          <button type="button" onClick={this.activated}>
            {' '}
            Activate Observations List
          </button>
        ) : (
          <button type="button" onClick={this.deActivated}>
            {' '}
            Deactivate Observations List
          </button>
        )}

        {activated ? (
          <table>
            <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
            {observations.map(obs => (
              <tr key={obs.name}>
                <td>
                  <a href={`/observations/${obs.id}`}>{obs.name}</a>
                </td>
                <td>
                  <a href={`/observations/${obs.id}`}>{obs.category}</a>
                </td>
                <td>{obs.logs.length}</td>
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
  observations: state.observations
})

const mapDispatchToProps = dispatch => ({
  onLoadObservations: () => {
    dispatch(getObservationsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllObservations)
