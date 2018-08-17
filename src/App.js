import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import 'App.css'
import history from 'History.jsx'
import { Layout } from 'antd'
import WrappedAddFarm from 'containers/FarmRegistrationWrapped'
import ConnectedTableWrapper from 'containers/SearchResultsWrapped'
import AddressQuery from 'containers/AddressQueryWrapped'
import FarmInfoWrapper from 'containers/FarmDetailsWrapped'
import NavBar from 'containers/NavBarWrapped'

const { Header, Content, Footer } = Layout

class App extends Component {
  render () {
    const divStyle = {
      minHeight: 280,
      height: '100%',
      textAlign: 'center',
      backgroundColor: 'white',
      fontFamily: 'PT Sans Caption'
    }

    const contentStyle = { height: '100%' }

    return (
      <Router history={history}>
        <Layout className='layout'>
          <Header style={{ backgroundColor: 'white', padding: 0 }}>
            <NavBar />
          </Header>
          <Content style={contentStyle}>
            <div style={divStyle}>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <AddressQuery version='Main' />}
                />
                <Route path='/Search/query' component={ConnectedTableWrapper} />
                <Route path='/AddFarm' component={WrappedAddFarm} />
                <Route path='/Farms/key=:KEY' component={FarmInfoWrapper} />
              </Switch>
            </div>
          </Content>
          <Footer
            style={{ textAlign: 'center', backgroundColor: 'light grey' }}
          />
        </Layout>
      </Router>
    )
  }
}

export default App
