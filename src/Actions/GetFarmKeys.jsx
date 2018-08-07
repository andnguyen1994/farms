const getFarmKeys = (status, farmKey) => ({
  type: status,
  payload: farmKey
});

export default getFarmKeys;
