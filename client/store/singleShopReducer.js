import axios from 'axios'

//ACTION TYPE

const GET_SINGLE_SHOP = 'GET_SINGLE_SHOP'

//ACTION CREATOR

const getSingleShop = singleShop => ({
    type: GET_SINGLE_SHOP,
    singleShop
})


export const getSingleShopThunk = (shopId) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/diveshops/${shopId}`)
        dispatch(getSingleShop(data))
    } catch (error) {
        console.error('error in singleShop thunk')
    }
}

const initialState = {}

const singleShopReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_SHOP:
            return action.singleShop
        default:
            return state

    }
}

export default singleShopReducer
