const getFarmData = (status, farmData) => ({
  type: status,
  payload: farmData
});

export default getFarmData;
