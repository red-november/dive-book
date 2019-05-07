import React from 'react'
import {connect} from 'react-redux'
import {getObservationsThunk} from '../store'

const ObservationSearch = props => {
  return <h1>Add Observation:</h1>
}

const mapStateToProps = state => ({
  observations: state.observations
})

const mapDispatchToProps = dispatch => ({
  fetchObservations: () => dispatch(getObservationsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(ObservationSearch)
