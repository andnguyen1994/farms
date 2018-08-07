const setGeoQuery = (type, address, userCoords, range) => ({
  type: type,
  payload: { address: address, userCoords, range: range }
});

export default setGeoQuery;
