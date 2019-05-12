import axios from 'axios'

const initialState = {
}

const GET_CURRENT_COORDINATES = 'GET_CURRENT_COORDINATES'

const getCoordinates = coord => ({type: GET_CURRENT_COORDINATES, coord})

export const getCoordinatesThunk = () => async dispatch => {
  console.log("can hit this")
  try {
    let coordinates = {}
    if ('geolocation' in navigator) {
      await navigator.geolocation.getCurrentPosition(pos => {
        coordinates.long = pos.coords.longitude
        coordinates.lat = pos.coords.latitude
      })
    }

    setTimeout(async () => {
      if ('geolocation' in navigator) {
          await navigator.geolocation.getCurrentPosition(pos => {
          coordinates = pos.coords})
      }
    }, 50);

    console.log(coordinates)
    console.log(navigator)
    dispatch(getCoordinates(coordinates))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch(action.type) {
    case GET_CURRENT_COORDINATES:
      newState = action.coord
      return newState
    default:
      return state
  }
}
