import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {logs: [], singleLog: {}}

/**
 * ACTION TYPES
 */
const GET_LOGS = 'GET_LOGS'
const GET_SINGLE_LOG = 'GET_SINGLE_LOG'

/**
 * ACTION CREATORS
 */
const getLogs = logs => ({type: GET_LOGS, logs})
const getSingleLog = log => ({type: GET_SINGLE_LOG, log})

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

export const getSingleLogThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/${id}`)
    dispatch(getSingleLog(res.data))
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
    case GET_LOGS:
      newState.logs = action.logs
      return newState
    case GET_SINGLE_LOG:
      newState.singleLog = action.log
      return newState
    default:
      return state
  }
}
