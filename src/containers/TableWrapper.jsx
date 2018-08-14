import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { farmRef, locationRef } from 'API/databases.js'
import GeoFire from 'geofire'
import setGeoQuery from 'actions/Geoquery'
import GetFarms from 'components/GetFarms'

const mapStateToProps = state => {
  return {
    failure: state.geocodeReducer.failure
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQueryInfo: (type, address, userCoords, range) =>
      dispatch(setGeoQuery(type, address, userCoords, range))
  }
}

class TableWrapper extends Component {
  constructor(props) {
    super(props)
    this.geoQuery = ''
    this.location = this.userCoords()
    this.state = {
      keys: [],
      rawFarmData: [],
      error: ''
    }
  }

  // TODO: clean up function
  // Takes location from URL and returns object containing location information
  userCoords = () => {
    const S = this.props.match.params.location
    const lat = Number(S.substring(S.indexOf('LAT=') + 4, S.indexOf('&LNG')))
    const lng = Number(S.substring(S.indexOf('&LNG=') + 5, S.indexOf('&ADDR')))
    const address = S.substring(S.indexOf('&ADDR=') + 6, S.indexOf('&RAD='))
    const rad = Number(S.substring(S.indexOf('&RAD=') + 5))
    this.props.updateQueryInfo('NEW_GEOQUERY', address, [lat, lng], rad)
    return { userCoords: [lat, lng], address: address, rad: rad }
  }

  componentDidMount() {
    //On receiving updated snapshot, update the local database in state
    if (this.props.failure || !this.location.address) {
      this.setState({ error: 'Please enter a valid location' })
    } else {
      farmRef.on('value', snapshot => {
        let farms = snapshot.val()
        this.setState({ rawFarmData: farms })
      })
      this.geoQuery = new GeoFire(locationRef).query({
        center: this.location.userCoords,
        radius: this.location.rad
      })
      this.geoQuery.on('key_entered', (key, location, distance) => {
        this.setState({ keys: this.state.keys.concat({ key, distance }) })
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.location !== prevProps.match.params.location) {
      if (this.props.failure || !this.location.address) {
        this.setState({ error: 'Please enter a valid location' })
      } else {
        this.setState({ error: '' })
        this.location = this.userCoords() //Gets new location
        if (this.geoQuery) {
          this.geoQuery.cancel()
          this.setState({ keys: [] })
        }
        this.geoQuery = new GeoFire(locationRef).query({
          center: this.location.userCoords,
          radius: this.location.rad
        })
        this.geoQuery.on('key_entered', (key, location, distance) => {
          this.setState({ keys: this.state.keys.concat({ key, distance }) })
        })
      }
    }
  }

  componentWillUnmount() {
    farmRef.off()
    if (this.geoQuery) {
      this.geoQuery.cancel()
    }
  }

  //Input: Keys and raw farm data
  //Output: array of farms data for farms in query
  getFarmsTableData = () => {
    let farmsTableData = []
    for (let i in this.state.keys) {
      let key = this.state.keys[i].key
      farmsTableData.push({
        key: key,
        name: (
          <Link to={`/Farms/key=${key}`}>
            {this.state.rawFarmData[key].name}
          </Link>
        ),
        email: this.state.rawFarmData[key].email,
        location: this.state.rawFarmData[key].location,
        website: this.state.rawFarmData[key].website,
        distance: this.state.keys[i].distance
      })
    }
    return farmsTableData
  }

  render() {
    return (
      <GetFarms
        farmsTableData={this.getFarmsTableData()}
        error={this.state.error}
      />
    )
  }
}

const ConnectedTableWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableWrapper)

export default ConnectedTableWrapper
