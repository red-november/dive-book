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
const UPDATE_DIVER_LOG = 'UPDATE_DIVER_LOG'

/**
 * ACTION CREATORS
 */
const getDiverLogs = logs => ({type: GET_DIVER_LOGS, logs})
const updateDiverLog = id => ({type: UPDATE_DIVER_LOG, id})

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

export const updateLogThunk = (diverId, diveName) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/logs/diver/${diverId}`, diveName)
      dispatch(updateDiverLog(data))
    } catch (err) {
      console.error(err)
    }
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
    case UPDATE_DIVER_LOG:
      newState = newState.map(log => {
        if (log.id === action.log.id) {
          return action.log
        } else {
          return log
        }
      })
      return newState
    default:
      return state
  }
}
