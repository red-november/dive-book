import axios from 'axios'

const initialState = {}

const GET_SINGLE_OBSERVATION = 'GET_SINGLE_OBSERVATION'


const getSingleObservation = observation => ({type: GET_SINGLE_OBSERVATION, observation})

export const getSingleObservationThunk = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/observations/${id}`)
    dispatch(getSingleObservation(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch(action.type) {
    case GET_SINGLE_OBSERVATION:
      newState = action.observation
      return newState
    default:
      return state
  }
}
