import { combineReducers } from 'redux'
import geocodeReducer from './Geocode'
import geoQueryReducer from './Geoquery'

export default combineReducers({
  geocodeReducer,
  geoQueryReducer
})
