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
const UPDATE_DIVER_LOG = 'UPDATE_DIVER_LOG'

/**
 * ACTION CREATORS
 */
const getSingleLog = log => ({type: GET_SINGLE_LOG, log})
const updateDiverLog = log => ({type: UPDATE_DIVER_LOG, log})

/**
 * THUNK CREATORS
 */
export const getSingleLogThunk = (id, newLog) => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/${id}`, newLog)
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

export const updateLogThunk = (id, newData) => async dispatch => {
  try {
    const res = await axios.put(`/api/logs/diver/${id}`, newData)
    dispatch(updateDiverLog(res.data))
    history.push('/home')
  } catch (error) {
    console.error('error in updateLogThunk')
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
    // case UPDATE_DIVER_LOG:
    //   newState = newState.filter(log => {
    //     if (log.id === action.log.id) {
    //       return action.log
    //     } else {
    //       return log
    //     }
    //   })
    //   return newState
    default:
      return state
  }
}
