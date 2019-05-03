import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION TYPES
 */
const GET_DIVER_CERTS = 'GET_DIVER_CERTS'

/**
 * ACTION CREATORS
 */
const getDiverCerts = certs => ({ type: GET_DIVER_CERTS, certs })

/**
 * THUNK CREATORS
 */
export const getDiverCertsThunk = diverId => async dispatch => {
    try {
        const res = await axios.get(`/api/certs/diver/${diverId}`)
        dispatch(getDiverCerts(res.data))
    } catch (err) {
        console.error("error in getDiverCertsThunk")
    }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
    let newState = [...state]
    switch (action.type) {
        case GET_DIVER_CERTS:
            newState = action.certs
            return newState
        default:
            return state
    }
}
