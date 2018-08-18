import React, { Component } from 'react'
import AddressQuery from 'containers/AddressQueryWrapped'
import { withRouter } from 'react-router-dom'
import history from 'HistoryConfig'
import styled from 'styled-components'

const OuterDiv = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: ${props => props.underline && '1px solid grey'};
`

const Container = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  height: 100%;
`
const NavItem = styled.li`
  flex-basis: auto;
  font: 400 16px 'PT Sans Caption';
  text-align: center;
  margin: auto 0.5em;
  height: 100%;
  width: auto;
  align-self: center;
`

const NavItemSearchContainer = styled(NavItem)`
  flex: 10;
  margin-right: auto;
  border-left: 1px solid rgb(27, 26, 26);
  display: flex;
`

const NavButton = styled.button`
  margin-right: auto;
  margin-left: auto;
  height: 100%;
  background-color: white;
  border: 4px solid white;
  outline: none;
  white-space: nowrap;

  &:hover {
    border-bottom: 4px solid rgba(36, 117, 40, 0.418);
    cursor: pointer;
  }
`

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick = target => e => {
    e.preventDefault()
    history.push(target)
  }

  render () {
    return (
      <OuterDiv underline={this.props.location.pathname !== '/'}>
        <Container role='navigation'>
          <NavItem>
            <NavButton onClick={this.handleClick('/')}>
              Logo
            </NavButton>
          </NavItem>
          <NavItemSearchContainer>
            <AddressQuery version='Nav' />
          </NavItemSearchContainer>
          <NavItem>
            <NavButton onClick={this.handleClick('/AddFarm')}>
              Register Farm
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton onClick={this.handleClick('/Login')}>
              PlaceHolder
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton onClick={this.handleClick('/Login')}>
              PlaceHolder
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton onClick={this.handleClick('/Login')}>
              Login
            </NavButton>
          </NavItem>
        </Container>
      </OuterDiv>
    )
  }
}

export default withRouter(NavBar)
