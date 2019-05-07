import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'

class ObservationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentList: []
    }
    this.keyup = this.keyup.bind(this)
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

  render() {
    return (
      <div>
        <label htmlFor="search">Add an observation</label>
        <input type="text" name="search" onKeyUp={this.keyup} />
        <ul>
          {this.state.currentList.map(obs => <li key={obs.id}>{obs.name}</li>)}
        </ul>
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
