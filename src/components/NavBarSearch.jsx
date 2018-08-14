import React, { Component } from 'react'
import { Input } from 'antd'

const Search = Input.Search

class NavBarSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.address }
  }

  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      this.setState({ value: this.props.address })
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  render() {
    // TODO: add custom rannge
    return (
      <Search
        value={this.state.value}
        onChange={this.handleChange}
        onSearch={value => {
          this.props.sendUserInfo(value, 10)
        }}
      />
    )
  }
}

export default NavBarSearch
