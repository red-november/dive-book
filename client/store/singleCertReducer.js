import axios from 'axios'
import history from '../history'

const initialState = {}

const GET_CERTIFICATION = 'GET_CERTIFICATION'
const UPDATE_CERTIFICATION = 'UPDATE_CERTIFICATION'
const CREATE_CERTIFICATION = 'CREATE_CERTIFICATION'

const updateCertification = cert => ({
  type: UPDATE_CERTIFICATION,
  cert
})

const getCertification = cert => ({
  type: GET_CERTIFICATION,
  cert
})

const createCertification = cert => ({
  type: CREATE_CERTIFICATION,
  cert
})

export const getCertificationThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/certs/${id}`)
    dispatch(getCertification(res.data))
  } catch (error) {
    console.error('error in getCertificationThunk')
  }
}

export const updateCertificationThunk = (id, newData) => async dispatch => {
  try {
    const res = await axios.put(`/api/certs/${id}`, newData)
    dispatch(updateCertification(res.data))
    history.push('/home')
  } catch (error) {
    console.error('error in updateCertificationThunk')
  }
}

export const createCertificationThunk = newData => async dispatch => {
  try {
    const res = await axios.post('/api/certs', newData)
    dispatch(createCertification(res.data))
    history.push('/home')
  } catch (error) {
    console.log('error in createCertificationThunk')
  }
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case UPDATE_CERTIFICATION:
    case CREATE_CERTIFICATION:
    case GET_CERTIFICATION:
      newState = action.cert
      return newState
    default:
      return state
  }
}
