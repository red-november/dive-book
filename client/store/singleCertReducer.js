import axios from 'axios'
import history from '../history'

const initialState = {}

const GET_CERTIFICATION = 'GET_CERTIFICATION'
const DELETE_CERTIFICATION = 'DELETE_CERTIFICATION'

const getCertification = cert => ({
  type: GET_CERTIFICATION,
  cert
})

const deleteCertification = () => ({
  type: DELETE_CERTIFICATION
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
    dispatch(getCertification(res.data))
    history.push('/home')
  } catch (error) {
    console.error('error in updateCertificationThunk')
  }
}

export const createCertificationThunk = newData => async dispatch => {
  try {
    const res = await axios.post('/api/certs', newData)
    dispatch(getCertification(res.data))
    history.push('/home')
  } catch (error) {
    console.log('error in createCertificationThunk')
  }
}
export const deleteCertificationThunk = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/certs/${id}`)
    dispatch(deleteCertification(res.data))
    history.push('/home')
  } catch (error) {
    console.log('error in deleteCertificationThunk')
  }
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_CERTIFICATION:
      newState = action.cert
      return newState
    case DELETE_CERTIFICATION:
      newState = {}
      return newState
    default:
      return state
  }
}
