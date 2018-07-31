import React, { Component } from "react";
import firebase from "../firebase.js";
import { Table, Button } from "antd";

const farmRef = firebase.database().ref("Farms");

class GetFarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      locations: []
    };
  }

  componentDidMount() {
    //getting farm data
    farmRef.on("value", snapshot => {
      let farms = snapshot.val();
      let newState = [];
      if (this.props.locations.length === 0) {
        for (let farm in farms) {
          newState.push({
            key: farm,
            name: farms[farm].name,
            email: farms[farm].email,
            location: farms[farm].location,
            website: farms[farm].website
          });
        }
      } else {
        for (let i in this.props.locations) {
          let key = this.props.locations[i];
          newState.push({
            key: key,
            name: farms[key].name,
            email: farms[key].email,
            location: farms[key].location,
            website: farms[key].website
          });
        }
      }
      this.setState({ farms: newState });
    });
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location"
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website"
      }
    ];
    return (
      <div>
        <Table
          bordered={true}
          dataSource={this.state.farms}
          columns={columns}
        />
      </div>
    );
  }
}

export default GetFarms;
