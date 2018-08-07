import { RSAA } from "redux-api-middleware";
import GEOCODE_KEY from "../API/GoogleConfig";

export const REQUEST = "@@geocode/REQUEST";
export const SUCCESS = "@@geocode/SUCCESS";
export const FAILURE = "@@geocode/FAILURE";

export const geocode = address => {
  return {
    [RSAA]: {
      endpoint: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODE_KEY}`,
      method: "GET",
      types: [REQUEST, SUCCESS, FAILURE]
    }
  };
};
