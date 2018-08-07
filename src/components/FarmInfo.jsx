import React, { Component } from "react";
import { farmRef, locationRef, offeringsRef } from "API/databases.js";

class FarmInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const number = this.props.match.params.number;
    return (
      <div>
        <h1>{number}</h1>
      </div>
    );
  }
}

export default FarmInfo;
