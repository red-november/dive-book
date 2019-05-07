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
const VERIFY_DIVER_LOG = 'VERIFY_DIVER_LOG'

/**
 * ACTION CREATORS
 */
const getSingleLog = log => ({type: GET_SINGLE_LOG, log})
const updateDiverLog = log => ({type: UPDATE_DIVER_LOG, log})
const verifyDiverLog = log => ({type: VERIFY_DIVER_LOG, log})
/**
 * THUNK CREATORS
 */
export const getSingleLogThunk = (id, newLog) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/logs/${id}`, newLog)
    dispatch(getSingleLog(data))
  } catch (err) {
    console.error(err)
  }
}

export const addLogThunk = log => async dispatch => {
  try {
    const {data} = await axios.post('/api/logs', log)
    dispatch(getSingleLog(data))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

export const updateLogThunk = (id, newData) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/logs/diver/${id}`, newData)
    dispatch(updateDiverLog(data))
    history.push('/home')
  } catch (error) {
    console.error('error in updateLogThunk')
  }
}

export const verifyLogThunk = (logId, scannedId) => async dispatch => {
  console.log('we are in the verify thunk')
  try {
    const {data} = await axios.put(`/api/logs/diver/verify/${logId}`, {
      scannedId
    })
    dispatch(verifyDiverLog({data}))
    history.push(`/logs/${logId}`)
  } catch (error) {
    console.error('error in verifyLogThunk')
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
