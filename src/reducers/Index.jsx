import { combineReducers } from "redux";
import geocodeReducer from "./Geocode";
import farmDataReducer from "./GetFarmData";
import farmKeyReducer from "./GetFarmKeys";
import geoQueryReducer from "./Geoquery";

export default combineReducers({
  geocodeReducer,
  farmDataReducer,
  farmKeyReducer,
  geoQueryReducer
});
