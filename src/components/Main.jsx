import React, { Component } from "react";
import { connect } from "react-redux";
import { farmRef, locationRef } from "API/databases.js";
import GeoFire from "geofire";
import { geocode } from "Actions/Geocode";
import setGeoQuery from "Actions/Geoquery.jsx";
import getFarmKeys from "Actions/GetFarmKeys";
import UserAddr from "components/UserAddr.jsx";
import GetFarms from "components/GetFarms.jsx";
import { Layout, Row, Col, Menu } from "antd";
import getFarmData from "Actions/GetFarmData.jsx";
import { Route, Switch, Link } from "react-router-dom";
import history from "History.jsx";

const { Header, Content, Footer } = Layout;

const mapStateToProps = state => {
  return {
    userCoords: [state.geocodeReducer.lat, state.geocodeReducer.lng],
    address: state.geocodeReducer.address,
    geoQueryStatus: state.geoQueryReducer.onStatus,
    farmsTableData: getFarmsTableData(
      state.farmKeyReducer.farmKeys,
      state.farmDataReducer.farmData
    ),
    queryUserCoords: state.geoQueryReducer.userCoords,
    range: state.geoQueryReducer.range
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFarmData: (status, farmData) => dispatch(getFarmData(status, farmData)),
    geocode: address => dispatch(geocode(address)),
    getFarmKeys: (status, farmKeys) => dispatch(getFarmKeys(status, farmKeys)),
    setGeoQuery: (type, address, userCoords, range) =>
      dispatch(setGeoQuery(type, address, userCoords, range))
  };
};

const getFarmsTableData = (farmKeys, farms) => {
  let farmsTableData = [];
  for (let i in farmKeys) {
    let key = farmKeys[i].key;
    farmsTableData.push({
      key: key,
      name: <Link to={`/Farms/${key}`}>{farms[key].name}</Link>,
      email: farms[key].email,
      location: farms[key].location,
      website: farms[key].website,
      distance: farmKeys[i].distance
    });
  }
  return farmsTableData;
};

class ConnectedMain extends Component {
  constructor(props) {
    super(props);
    this.geoQuery = "";
  }

  componentDidMount() {
    //On receiving updated snapshot, update the local database, then update the display.
    farmRef.on("value", snapshot => {
      let farms = snapshot.val();
      this.props.getFarmData("FARMS_SUCCESS", farms);
    });
    if (this.props.geoQueryStatus) {
      this.props.getFarmKeys("KEY_RESET");
      this.geoQuery = new GeoFire(locationRef).query({
        center: this.props.queryUserCoords,
        radius: this.props.range
      });
      this.geoQuery.on("key_entered", (key, location, distance) => {
        this.props.getFarmKeys("KEY_SUCCESS", { key: key, distance: distance });
      });
    }
  }

  getFarmLocations = async (address, range) => {
    if (this.geoQuery) {
      this.geoQuery.cancel();
      this.props.getFarmKeys("KEY_RESET");
    }
    await this.props.geocode(address);
    this.geoQuery = await new GeoFire(locationRef).query({
      center: this.props.userCoords,
      radius: range
    });
    this.geoQuery.on("key_entered", (key, location, distance) => {
      this.props.getFarmKeys("KEY_SUCCESS", { key: key, distance: distance });
    });
    this.props.setGeoQuery(
      "NEW_GEOQUERY",
      this.props.address,
      this.props.userCoords,
      range
    );
    history.push("/Main/Search");
  };

  //History
  renderTable = () => {
    if (!this.props.geoQueryStatus) {
      return <UserAddr sendUserInfo={this.getFarmLocations} />;
    } else {
      return null;
    }
  };

  componentWillUnmount() {
    console.log("test");
    farmRef.off();
    if (this.geoQuery) {
      this.geoQuery.cancel();
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/Main"
            render={() => <UserAddr sendUserInfo={this.getFarmLocations} />}
          />
          <Route
            path="/Main/Search"
            render={() => (
              <GetFarms farmsTableData={this.props.farmsTableData} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedMain);

export default Main;
