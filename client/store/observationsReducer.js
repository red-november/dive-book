import axios from 'axios'
import history from '../history'

const initialState = []

const GET_OBSERVATIONS = 'GET_OBSERVATIONS'

const getObservations = observations => ({type: GET_OBSERVATIONS, observations})

export const getObservationsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/observations')
    dispatch(getObservations(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case GET_OBSERVATIONS:
      newState = action.observations
      return newState
    default:
      return state
  }
}
