import firebase from "API/firebase.js";

export const farmRef = firebase.database().ref("Farms");
export const locationRef = firebase.database().ref("Locations");
export const offeringsRef = firebase.database().ref("Offerings");
