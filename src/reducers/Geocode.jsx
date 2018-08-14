import * as geocode from 'actions/Geocode'

const initialState = {
  displayTable: false,
  failure: false,
  address: '',
  lat: null,
  lng: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case geocode.REQUEST:
      if (action.error) {
        return { ...state, failure: true }
      } else {
        return { ...state, failure: false }
      }
    case geocode.SUCCESS:
      if (action.payload.status !== 'OK') {
        console.log('error with request')
        return {
          ...state,
          address: '',
          lat: null,
          lng: null,
          failure: true
        }
      } else {
        let address = action.payload.results[0].formatted_address
        let { lat, lng } = action.payload.results[0].geometry.location
        return {
          ...state,
          address,
          lat,
          lng,
          failure: false
        }
      }
    case geocode.FAILURE:
      return {
        ...state,
        address: '',
        lat: null,
        lng: null,
        failure: true }
    default:
      return state
  }
}
