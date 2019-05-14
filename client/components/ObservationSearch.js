import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'

// class ObservationSearch extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentList: [],
//       diverObservations: []
//     }
//     this.keyup = this.keyup.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.enterObservation = this.enterObservation.bind(this)
//     this.removeFromList = this.removeFromList.bind(this)
//   }
//   componentDidMount() {
//     this.props.fetchObservations()
//   }

//   keyup(evt) {
//     let word = evt.target.value
//     let newList = this.props.observations.filter(obs => {
//       if (obs.name.toLowerCase().includes(word.toLowerCase())) {
//         return obs.name
//       }
//     })
//     this.setState({currentList: newList})
//   }

//   handleChange(evt) {
//     let currentObs = evt.target.value
//     let currentObsArr = [...this.state.diverObservations]
//     if (!currentObsArr.find(obs => obs.id === JSON.parse(currentObs).id)) {
//       currentObsArr.push(JSON.parse(currentObs))
//       this.setState({
//         diverObservations: currentObsArr
//       })
//     }
//   }

//   removeFromList(id) {
//     let currentObsArr = [...this.state.diverObservations]
//     currentObsArr = currentObsArr.filter(obs => obs.id !== id)
//     this.setState({diverObservations: currentObsArr})
//   }

//   enterObservation(evt) {
//     if (evt.keyCode === 13) {
//       let topSelection = JSON.parse(
//         document.getElementById('observation-selector').value
//       )
//       let currentObsArr = [...this.state.diverObservations]
//       if (!currentObsArr.find(obs => obs.id === topSelection.id)) {
//         currentObsArr.push(topSelection)
//         this.setState({diverObservations: currentObsArr})
//       }
//     }
//   }

//   render() {

const ObservationSearch = ({
  enterObservation,
  keyup,
  handleChange,
  currentList,
  diverObservations,
  removeFromList
}) => {
  return (
    <div>
      <label htmlFor="search">Add an observation</label>
      <input
        type="text"
        name="search"
        onKeyUp={keyup}
        onKeyDown={enterObservation}
      />
      <select
        onChange={handleChange}
        name="search-selector"
        id="observation-selector"
      >
        {currentList.map(obs => (
          <option value={JSON.stringify(obs)} name={obs.name} key={obs.id}>
            {obs.name}
          </option>
        ))}
      </select>
      <h4>Observations selected:</h4>
      <ol>
        {diverObservations.map(obs => (
          <li key={obs.id}>
            {obs.name} <span onClick={() => removeFromList(obs.id)}>X</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
//   }
// }

// const mapStateToProps = state => ({
//   observations: state.observations
// })

// const mapDispatchToProps = dispatch => ({
//   fetchObservations: () => dispatch(getObservationsThunk())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ObservationSearch)

export default ObservationSearch
