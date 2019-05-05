import React, {Component} from 'react'
import {getObservationsThunk} from '../store/observationsReducer'
import {connect} from 'react-redux'

class AllObservations extends Component {
  componentDidMount(){
    this.props.onLoadObservations()
  }
  render() {
    const {observations} = this.props
    const headers = ["Name", "Category", "Occurence"]
    console.log(observations)

    if (observations.length === 0) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        <table>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
          {observations.map(obs => (
            <tr key={obs.name}>
              <td>{obs.name}</td>
              <td>{obs.category}</td>
              <td>{obs.logs.length}</td>  {/* We can make this lead to a link containing the list of dives */}
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
