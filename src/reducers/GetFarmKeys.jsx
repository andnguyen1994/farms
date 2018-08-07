const initialState = {
  success: false,
  farmKeys: []
};

//Need to handle removal
export default (state = initialState, action) => {
  switch (action.type) {
    case "KEY_SUCCESS":
      return { ...state, farmKeys: state.farmKeys.concat(action.payload) };
    case "KEY_FAILURE":
      return { ...state, succes: false };
    case "KEY_RESET":
      return { ...state, farmKeys: [] };
    default:
      return state;
  }
};
