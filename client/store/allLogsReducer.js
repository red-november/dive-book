import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION TYPES
 */
const GET_LOGS = 'GET_LOGS'

/**
 * ACTION CREATORS
 */
const getLogs = logs => ({type: GET_LOGS, logs})

/**
 * THUNK CREATORS
 */
export const getLogsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/logs')
    dispatch(getLogs(res.data))
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
    case GET_LOGS:
      newState = action.logs
      return newState
    default:
      return state
  }
}
