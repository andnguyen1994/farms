const initialState = {
  address: "",
  userCoords: "",
  range: null,
  onStatus: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_GEOQUERY":
      console.log();
      return {
        ...state,
        address: action.payload.address,
        userCoords: action.payload.userCoords,
        range: action.payload.range,
        onStatus: true
      };
    case "END_GEOQUERY":
      return {
        ...state,
        address: "",
        userCoords: "",
        range: null,
        onStatus: false
      };
    default:
      return state;
  }
};
