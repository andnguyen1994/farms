import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table } from "antd";
import updateTableData from "Scripts/updateTableData.jsx";

class GetFarms extends Component {
  constructor(props) {
    super(props);
  }

  //TODO: add columns, fix sort
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
          dataSource={this.props.farmsTableData}
          columns={columns}
        />
      </div>
    );
  }
}

export default GetFarms;
