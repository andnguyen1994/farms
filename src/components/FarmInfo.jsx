import React, { Component } from 'react'
// import { farmRef, locationRef, offeringsRef } from 'API/databases.js';

class FarmInfo extends Component {
  render () {
    const key = this.props.match.params.KEY
    return (
      <div>
        <h1>{key}</h1>
      </div>
    )
  }
}

export default FarmInfo
