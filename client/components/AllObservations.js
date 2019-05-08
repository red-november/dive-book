import React, {Component} from 'react'
import {getObservationsThunk} from '../store/observationsReducer'
import {connect} from 'react-redux'
import {BarChart} from './BarChartAllObservations'
import {FillObservationCategory} from '../../utilities/d3Utils'
import {CircleChart} from './D3Test'

class AllObservations extends Component {
  componentDidMount() {
    this.props.onLoadObservations()
  }
  render() {
    const {observations} = this.props
    const headers = ['Name', 'Category', 'Occurence']
    // console.log(observations)

    let data = [
      {quantity: 0, name: 'flora', id: 1},
      {quantity: 0, name: 'mollusks', id: 2},
      {quantity: 0, name: 'fish', id: 3},
      {quantity: 0, name: 'coral', id: 4},
      {quantity: 0, name: 'mammals', id: 5},
      {quantity: 0, name: 'other living things', id: 6},
      {quantity: 0, name: 'sponges', id: 7},
      {quantity: 0, name: 'inanimate objects', id: 8}
    ]

    observations.forEach(obs => {
      let {category} = obs
      data = FillObservationCategory(data, category)
    })
    console.log('dataaaa', data)

    if (observations.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
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
        <CircleChart
          data={data}
          // data={[
          //   {
          //     value: 1,
          //     name: 'glittering'
          //   },
          //   {
          //     value: 5,
          //     name: 'luminous'
          //   }
          // ]}
        />
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
