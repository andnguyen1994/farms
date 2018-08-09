import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import 'App.css'
import history from 'History.jsx'
import { Layout } from 'antd'
import NavBar from 'components/NavBar'
import WrappedAddFarm from 'components/AddFarm.jsx'
import ConnectedTableWrapper from 'containers/TableWrapper'
import ConnectedUserAddr from 'containers/UserAddrWrapper'
import FarmInfo from 'components/FarmInfo.jsx'

const { Header, Content, Footer } = Layout

class App extends Component {
  render () {
    const divStyle = {
      background: '#fff',
      padding: 24,
      minHeight: 280,
      textAlign: 'center'
    }
    return (
      <Router history={history}>
        <Layout className='layout'>
          <Header>
            <NavBar />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div style={divStyle}>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <ConnectedUserAddr version='Main' />}
                />
                <Route
                  path='/Search/:location'
                  component={ConnectedTableWrapper}
                />
                <Route path='/AddFarm' component={WrappedAddFarm} />
                <Route path='/Farms/key=:KEY' component={FarmInfo} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }} />
        </Layout>
      </Router>
    )
  }
}

export default App
