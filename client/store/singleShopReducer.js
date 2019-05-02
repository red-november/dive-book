import axios from 'axios'

//ACTION TYPE

const SET_SINGLE_SHOP = 'SET_SINGLE_SHOP'

//ACTION CREATOR

const setSingleShop = singleShop => ({
    type: SET_SINGLE_SHOP,
    singleShop
})


export const getSingleShopThunk = (shopId) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/diveshops/${shopId}`)
        dispatch(setSingleShop(data))
    } catch (error) {
        console.error('error in singleShop thunk')
    }
}

const initialState = {}

const singleShopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SINGLE_SHOP:
            return action.singleShop
        default:
            return state

    }
}

export default singleShopReducer