const updateTableData = (keys, farms) => {
  let newState = [];
  //console.log("keys :" + keys);
  //console.log("update data: " + farms);
  for (let i in keys) {
    let key = keys[i];
    newState.push({
      key: key,
      name: farms[key].name,
      email: farms[key].email,
      location: farms[key].location,
      website: farms[key].website
    });
  }
  return newState;
};

export default updateTableData;
