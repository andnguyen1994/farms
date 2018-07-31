import React, { Component } from "react";
import firebase from "../firebase.js";
import GeoFire from "geofire";
import GetFarms from "./GetFarms.jsx";
import WrappedUserAddr from "./UserAddr";
import { Layout, Row, Col } from "antd";
import WrappedAddFarm from "./AddFarm";

/* global google */

const { Header, Content, Footer } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocoder: "",
      farmLocations: [],
      renderTable: false
    };
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = "AIzaSyDiOLnnxOtekMQjLEnVPNgnL2rIUbsFv24";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then(google => {
      let geocoder = new google.maps.Geocoder();
      this.setState({ geocoder: geocoder });
    });
  }

  getFarmLocations = userCoords => {
    this.setState({ renderTable: true });
    let geoQuery = new GeoFire(firebase.database().ref("Locations")).query({
      center: userCoords,
      radius: 10
    });
    console.log(geoQuery.center());
    geoQuery.on("ready", function() {
      console.log(
        "GeoQuery has loaded and fired all other events for initial data"
      );
    });
    geoQuery.on("key_entered", (key, location, distance) => {
      let farmLocations = this.state.farmLocations;
      farmLocations.push(key);
      this.setState({ farmLocations: farmLocations });
    });
  };

  test = () => {
    if (this.state.renderTable === true) {
      console.log("test");
      return <GetFarms locations={this.state.farmLocations} />;
    }
    return null;
  };

  render() {
    let table;
    if (this.state.renderTable === true) {
      table = <GetFarms locations={this.state.farmLocations} />;
    } else {
      table = null;
    }
    return (
      <React.Fragment>
        <Layout className="layout">
          <Header>
            <div>
              <Row>
                <Col offset={6}>
                  {" "}
                  <WrappedUserAddr
                    geocoder={this.state.geocoder}
                    getFarmLocations={this.getFarmLocations}
                  />
                </Col>
              </Row>
            </div>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {" "}
              <WrappedAddFarm geocoder={this.state.geocoder} />
              {table}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }} />
        </Layout>,
      </React.Fragment>
    );
  }
}

export default Main;
