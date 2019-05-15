import axios from 'axios'

const initialState = []

const GET_OBSERVATION_COORD = 'GET_OBSERVATION_COORD'

const getObservationCoord = observation => ({type: GET_OBSERVATION_COORD, observation})

export const getObservationCoordThunk = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/observations/sightings/${id}`)
    dispatch(getObservationCoord(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch(action.type) {
    case GET_OBSERVATION_COORD:
      newState = action.observation
      return newState
    default:
      return state
  }
}
