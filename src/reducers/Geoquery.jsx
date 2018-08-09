const initialState = {
  address: '',
  userCoords: [],
  range: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_GEOQUERY':
      console.log()
      return {
        ...state,
        address: action.payload.address,
        userCoords: action.payload.userCoords,
        range: action.payload.range
      }
    case 'CLEAR_GEOQUERY':
      return {
        ...state,
        address: '',
        userCoords: [],
        range: null
      }
    default:
      return state
  }
}
