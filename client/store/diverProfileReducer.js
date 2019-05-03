import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION TYPES
 */
const GET_DIVER_LOGS = 'GET_DIVER_LOGS'

/**
 * ACTION CREATORS
 */
const getDiverLogs = logs => ({type: GET_DIVER_LOGS, logs})

/**
 * THUNK CREATORS
 */
export const getDiverLogsThunk = diverId => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/diver/${diverId}`)
    dispatch(getDiverLogs(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case GET_DIVER_LOGS:
      newState = action.logs
      return newState
    default:
      return state
  }
}
