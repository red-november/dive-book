import axios from 'axios'

//ACTION TYPE

const GET_OFFEREDDIVES_BY_SINGLESHOP = 'GET_OFFEREDDIVES_BY_SINGLESHOP'

//ACTION CREATOR

const getOfferedDivesBySingleShop = offeredDives => ({
  type: GET_OFFEREDDIVES_BY_SINGLESHOP,
  offeredDives
})

export const getOfferedDivesBySingleShopThunk = diveshopId => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/alloffereddives/diveshops/${diveshopId}`
    )
    dispatch(getOfferedDivesBySingleShop(data))
  } catch (error) {
    console.log('error in getOfferedDivesBySingleShopThunk')
  }
}

const initialState = []

const offeredDivesBySingleShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFEREDDIVES_BY_SINGLESHOP:
      return action.offeredDives
    default:
      return state
  }
}

export default offeredDivesBySingleShopReducer
