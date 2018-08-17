import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { farmRef, locationRef } from 'API/databases.js'
import GeoFire from 'geofire'
import setGeoQuery from 'actions/Geoquery'
//import GetFarms from 'components/GetFarms'
import DisplayTable from 'components/SearchResults/DisplayTable'
import queryString from 'query-string'

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
    this.userLocation = this.userCoords()
    this.state = {
      keys: [],
      rawFarmData: [],
      error: ''
    }
  }

  // TODO: clean up function
  // Takes location from URL and returns object containing location information
  userCoords = () => {
    let userLocation = queryString.parse(this.props.location.search)
    userLocation.userCoords = [
      Number(userLocation.latitude),
      Number(userLocation.longitude)
    ]
    userLocation.range = Number(userLocation.range)
    this.props.updateQueryInfo(
      'NEW_GEOQUERY',
      userLocation.address,
      userLocation.userCoords,
      userLocation.range
    )
    return userLocation
  }
  //Can we optimize geolocation by setting pointers to keys with same location ie. multiple places are at seattle, map locations in farms to key
  componentDidMount() {
    //On receiving updated snapshot, update the local database in state
    if (this.props.failure || !this.userLocation.address) {
      this.setState({ error: 'Please enter a valid location' })
    } else {
      farmRef.on('value', snapshot => {
        let farms = snapshot.val()
        this.setState({ rawFarmData: farms })
      })
      this.geoQuery = new GeoFire(locationRef).query({
        center: this.userLocation.userCoords,
        radius: this.userLocation.range
      })
      this.geoQuery.on('key_entered', (key, location, distance) => {
        this.setState({ keys: this.state.keys.concat({ key, distance }) })
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      if (this.props.failure || !this.userLocation.address) {
        this.setState({ error: 'Please enter a valid location' })
      } else {
        this.setState({ error: '' })
        this.userLocation = this.userCoords() //Gets new location
        if (this.geoQuery) {
          this.geoQuery.cancel()
          this.setState({ keys: [] })
        }
        this.geoQuery = new GeoFire(locationRef).query({
          center: this.userLocation.userCoords,
          radius: this.userLocation.range
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
    console.log(farmsTableData)
    return farmsTableData
  }

  render() {
    return <DisplayTable farmsTableData={this.getFarmsTableData()} />
  }

  /*3render() {
    return (
      <GetFarms
        farmsTableData={this.getFarmsTableData()}
        error={this.state.error}
      />
    )
  }*/
}

const ConnectedTableWrapper = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableWrapper)
)

export default ConnectedTableWrapper
