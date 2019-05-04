import axios from 'axios'

//ACTION TYPES

const SET_SHOPS = 'SET_SHOPS'

//ACTION CREATORS

const setShops = shops => ({
  type: SET_SHOPS,
  shops
})

export const getShopsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/diveshops')
    dispatch(setShops(data))
  } catch (error) {
    console.error('error in allShops thunk')
  }
}

const initialState = []

const allShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOPS:
      return action.shops
    default:
      return state
  }
}

export default allShopReducer
