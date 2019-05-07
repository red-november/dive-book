import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION TYPES
 */
const GET_SINGLE_LOG = 'GET_SINGLE_LOG'

/**
 * ACTION CREATORS
 */
const getSingleLog = log => ({type: GET_SINGLE_LOG, log})

/**
 * THUNK CREATORS
 */
export const getSingleLogThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/${id}`)
    dispatch(getSingleLog(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addLogThunk = log => async dispatch => {
  try {
    const {data} = await axios.post('/api/logs', log)
    dispatch(getSingleLog(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_SINGLE_LOG:
      newState = action.log
      return newState
    default:
      return state
  }
}
