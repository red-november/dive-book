import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'

class ObservationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentList: [],
      diverObservations: []
    }
    this.keyup = this.keyup.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchObservations()
  }

  keyup(evt) {
    let word = evt.target.value
    let newList = this.props.observations.filter(obs => {
      if (obs.name.toLowerCase().includes(word.toLowerCase())) {
        return obs.name
      }
    })
    this.setState({currentList: newList})
  }

  handleChange(evt) {
    let currentObs = evt.target.value
    let currentObsArr = [...this.state.diverObservations]
    currentObsArr.push(JSON.parse(currentObs))
    this.setState({
      diverObservations: currentObsArr
    })
  }

  render() {
    return (
      <div>
        <label htmlFor="search">Add an observation</label>
        <input type="text" name="search" onKeyUp={this.keyup} />
        <select onChange={this.handleChange}>
          {this.state.currentList.map(obs => (
            <option value={JSON.stringify(obs)} name={obs.name} key={obs.id}>
              {obs.name}
            </option>
          ))}
        </select>
        <h4>Observations selected:</h4>
        <ol>
          {this.state.diverObservations.map(obs => (
            <li key={obs.id}>{obs.name}</li>
          ))}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  observations: state.observations
})

const mapDispatchToProps = dispatch => ({
  fetchObservations: () => dispatch(getObservationsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(ObservationSearch)
