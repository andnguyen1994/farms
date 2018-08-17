import React, { Component } from 'react'
import firebase from 'API/firebase.js'
import FarmInfo from 'components/FarmDetails/FarmInfo'

class FarmInfoWrapper extends Component {
  constructor(props) {
    super(props)
    this.key = this.props.match.params.KEY
    this.state = {}
  }

  componentDidMount() {
    const farmRef = firebase.database().ref('Farms/' + this.key)
    farmRef.on('value', snapshot => {
      let farm = snapshot.val()
      this.setState({ farm })
    })
  }

  render() {
    return this.state.farm ? <FarmInfo farm={this.state.farm} /> : null
  }
}

export default FarmInfoWrapper
