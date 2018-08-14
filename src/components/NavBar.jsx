import React, { Component } from 'react'
import { Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import ConnectedUserAddr from 'containers/UserAddrWrapper'

class NavBar extends Component {
  render () {
    const divStyle = {
      float: 'left'
    }
    return (
      <React.Fragment>
        <Row>
          <Col span={8}>
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='1'>
                <Link to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link to='/AddFarm'>Add Farms</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={8}>
            <ConnectedUserAddr version='Nav' />
          </Col>
        </Row>
        <div style={divStyle} />
      </React.Fragment>
    )
  }
}

export default NavBar
