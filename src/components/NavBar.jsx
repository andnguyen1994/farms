import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/Main">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/AddFarm">Add Farms</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/Farms/5">Farm # 5</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
