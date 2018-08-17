import React, { Component } from 'react'
import history from 'History'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { geocode } from 'actions/Geocode'
import setGeoQuery from 'actions/Geoquery.jsx'
import AddressEntry from 'components/AddressQuery/AddressEntry'
import NavBarSearch from 'components/AddressQuery/NavBarQueryInput'
import queryString from 'query-string'

const mapStateToProps = state => {
  return {
    userCoords: [state.geocodeReducer.lat, state.geocodeReducer.lng],
    address: state.geocodeReducer.address,
    queryAddress: state.geoQueryReducer.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQueryInfo: type => dispatch(setGeoQuery(type)),
    geocode: address => dispatch(geocode(address))
  }
}

class UserAddrWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { inputValue: props.queryAddress }
  }

  componentDidUpdate (prevProps) {
    if (this.props.address !== prevProps.address) {
      this.setState({ inputValue: this.props.address })
    }
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.updateQueryInfo(this.state.inputValue, 10)
  }

  handleChoice = isDelivery => e => {
    e.preventDefault()
    this.setState({ isDelivery: isDelivery })
  }

  updateQueryInfo = async (address, range) => {
    await this.props.geocode(address)
    const query = queryString.stringify({
      address: this.props.address,
      range: range,
      latitude: this.props.userCoords[0],
      longitude: this.props.userCoords[1]
    })

    history.push('/Search/query?' + query)
  }

  renderVersion = () => {
    if (this.props.version === 'Main') {
      return (
        <AddressEntry
          address={this.state.inputValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleChoice={this.handleChoice}
          isDelivery={this.state.isDelivery}
        />
      )
    } else if (this.props.version === 'Nav') {
      return (
        this.props.location.pathname !== '/' && // if on main page, don't render anything
        <NavBarSearch
          address={this.state.inputValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }

  render () {
    return <React.Fragment>{this.renderVersion()}</React.Fragment>
  }
}

const ConnectedUserAddr = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserAddrWrapper)
)

export default ConnectedUserAddr
