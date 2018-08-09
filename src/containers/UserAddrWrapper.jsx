import React, { Component } from 'react'
import history from 'History'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { geocode } from 'actions/Geocode'
import setGeoQuery from 'actions/Geoquery.jsx'
import UserAddr from 'components/UserAddr'
import NavBarSearch from 'components/NavBarSearch'

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
  componentDidMount() {
    // Clears GeoQuery to make top bar search disappear
    if (this.props.version === 'Main') {
      //this.props.updateQueryInfo('CLEAR_GEOQUERY')
    }
  }

  updateQueryInfo = async (address, range) => {
    await this.props.geocode(address)
    let location =
      'LAT=' +
      this.props.userCoords[0] +
      '&LNG=' +
      this.props.userCoords[1] +
      '&ADDR=' +
      this.props.address +
      '&RAD=' +
      range
    history.push('/Search/' + location)
  }

  renderVersion = () => {
    if (this.props.version === 'Main') {
      return <UserAddr sendUserInfo={this.updateQueryInfo} />
    } else if (this.props.version === 'Nav') {
      return (
        this.props.location.pathname !== '/' && (
          <NavBarSearch
            address={this.props.queryAddress}
            page={this.props.location.pathname}
            sendUserInfo={this.updateQueryInfo}
          />
        )
      )
    }
  }

  render() {
    return <React.Fragment>{this.renderVersion()}</React.Fragment>
  }
}

const ConnectedUserAddr = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserAddrWrapper)
)

export default ConnectedUserAddr
