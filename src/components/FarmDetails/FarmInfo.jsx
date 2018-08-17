import React, { Component } from 'react'
// import { farmRef, locationRef, offeringsRef } from 'API/databases.js';

class FarmInfo extends Component {
  render () {
    return (
      <div>
        <h1>{this.props.farm.name}</h1>
        <h1>{this.props.farm.email}</h1>
        <h1>{this.props.farm.website}</h1>
        <h1>{this.props.farm.location}</h1>
      </div>
    )
  }
}

export default FarmInfo
