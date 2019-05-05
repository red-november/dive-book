import axios from 'axios'
import history from '../history'

//INITIAL STATE

const initialState = []

// ACTION TYPES

const GET_ALL_OFFEREDDIVES = 'GET_ALL_OFFEREDDIVES'

//ACTION CREATORS

const getAllOfferedDives = allOffereddives => ({
  type: GET_ALL_OFFEREDDIVES,
  allOffereddives
})

// THUNK CREATORS

export const getAllOfferedDivesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/alloffereddives')
    dispatch(getAllOfferedDives(data))
  } catch (err) {
    console.log('error in getAllOfferedDivesThunk')
  }
}

//REDUCER

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case GET_ALL_OFFEREDDIVES:
      newState = action.allOffereddives
      return newState
    default:
      return state
  }
}
