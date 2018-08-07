import React, { Component } from "react";
import Main from "./components/Main";
import WrappedAddFarm from "components/AddFarm.jsx";
import NavBar from "components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import history from "History.jsx";
import FarmInfo from "components/FarmInfo.jsx";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    const divStyle = {
      background: "#fff",
      padding: 24,
      minHeight: 280,
      textAlign: "center"
    };
    return (
      <Router history={history}>
        <div>
          <Layout className="layout">
            <Header>
              <NavBar />
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <div style={divStyle}>
                <Switch>
                  <Route path="/Main" component={Main} />
                  <Route path="/AddFarm" component={WrappedAddFarm} />
                  <Route path="/Farms/:number" component={FarmInfo} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }} />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
