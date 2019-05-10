import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DIVER = 'GET_DIVER'
const REMOVE_DIVER = 'REMOVE_DIVER'
const GET_NEAREST = 'GET_NEAREST'

/**
 * INITIAL STATE
 */
const defaultDiver = {}

/**
 * ACTION CREATORS
 */
const getDiver = diver => ({type: GET_DIVER, diver})
const removeDiver = () => ({type: REMOVE_DIVER})
const getNearest = dive => ({type: GET_NEAREST, dive})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getDiver(res.data || defaultDiver))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getDiver({error: authError}))
  }

  try {
    dispatch(getDiver(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeDiver())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getNearestDiveThunk = coords => async dispatch => {
  try {
    const {data} = await axios.get(`api/logs/nearest/${coords}`)
    dispatch(getNearest(data))
  } catch (error) {
    console.error('error in nearest dive thunk')
  }
}

/**
 * REDUCER
 */
export default function(state = defaultDiver, action) {
  switch (action.type) {
    case GET_DIVER:
      return action.diver
    case REMOVE_DIVER:
      return defaultDiver

    case GET_NEAREST:
      return {...state, nearest: action.dive[0]}

    default:
      return state
  }
}
