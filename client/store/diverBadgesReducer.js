import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION TYPES
 */
const GET_DIVER_BADGES = 'GET_DIVER_BADGES'

/**
 * ACTION CREATORS
 */
const getDiverBadges = badges => ({ type: GET_DIVER_BADGES, badges })

/**
 * THUNK CREATORS
 */
export const getDiverBadgesThunk = diverId => async dispatch => {
    try {
        const res = await axios.get(`/api/badges/diver/${diverId}`)
        dispatch(getDiverBadges(res.data))
    } catch (err) {
        console.error("error in getDiverBadgesThunk")
    }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
    let newState = [...state]
    switch (action.type) {
        case GET_DIVER_BADGES:
            newState = action.badges
            return newState
        default:
            return state
    }
}