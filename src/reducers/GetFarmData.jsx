const initialState = {
  farmData: [],
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FARMS_SUCCESS":
      return { ...state, farmData: action.payload, count: state.count + 1 };
    case "FARMS_FAIL":
      return state;
    default:
      return state;
  }
};
