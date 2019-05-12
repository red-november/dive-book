import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION TYPES
 */
const GET_SINGLE_OFFERED_DIVE = 'GET_SINGLE_OFFERED_DIVE'

/**
 * ACTION CREATORS
 */
const getSingleOfferedDive = dive => ({type: GET_SINGLE_OFFERED_DIVE, dive})

/**
 * THUNK CREATORS
 */
export const getSingleOfferedDiveThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/alloffereddives/${id}`)
    dispatch(getSingleOfferedDive(data))
  } catch (err) {
    console.error('getSingleOfferedDiveThunk')
  }
}

/**
 * REDUCER
 */
const singleOfferedDiveReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case GET_SINGLE_OFFERED_DIVE:
      newState = action.dive
      return newState
    default:
      return state
  }
}
export default singleOfferedDiveReducer
