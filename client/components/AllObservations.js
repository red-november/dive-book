import React, {Component} from 'react'
import {getObservationsThunk} from '../store/observationsReducer'
import {connect} from 'react-redux'
import {BarChart} from './BarChartAllObservations'
import {FillObservationCategory} from '../../utilities/d3Utils'
import {CircleChart, CircleChartObservation} from './D3Test'
import {log} from 'util'

class AllObservations extends Component {
  componentDidMount() {
    this.props.onLoadObservations()
  }
  render() {
    const {observations} = this.props
    const headers = ['Name', 'Category', 'Occurence']
    // console.log(observations)
    let categoryFound = []
    // let categoryData = [
    // {quantity: 0, name: 'flora', id: 1},
    // {quantity: 0, name: 'mollusks', id: 2},
    // {quantity: 0, name: 'fish', id: 3},
    // {quantity: 0, name: 'coral', id: 4},
    // {quantity: 0, name: 'mammals', id: 5},
    // {quantity: 0, name: 'other living things', id: 6},
    // {quantity: 0, name: 'sponges', id: 7},
    // {quantity: 0, name: 'inanimate objects', id: 8}
    // ]
    // observations.forEach(obs => {
    //   if (!categoryFound.indexOf(obs.category)) {
    //     categoryFound.push(obs.category)
    //     categoryData.push({
    //       quantity: 0,
    //       name: obs.category,
    //       id: categoryFound.length + 1
    //     })
    //   }
    // })

    // console.log('categoryDataaaa', categoryData)
    // observations.forEach(obs => {
    //   let {category} = obs
    //   categoryData = FillObservationCategory(categoryData, category)
    // })

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
        <div className="ChartContainer">
          <CircleChart data={chartCategoryData} />
          <CircleChartObservation data={chartObsData} />
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
