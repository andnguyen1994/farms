import React, { Component } from 'react'
import DisplayCard from 'components/SearchResults/DisplayCard'
import styled from 'styled-components'

const Table = styled.div`
  padding: 10px 2px 10px 2px;
  display: grid;
  grid-template: repeat(12, 120px) / repeat(12, 1fr);
  grid-auto-rows: 120px;
  grid-row-gap: 10px;
`

class DisplayTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const farmInfo = {
      location: '2849 Dover Circle Fitchburg Wi',
      email: 'test@test.com',
      name: 'test farm',
      offering: {
        cost: 595,
        duration: 10,
        frequency: 1,
        start: 'june',
        end: 'september',
        type: 'vegetable'
      }
    }
    return (
      <Table>
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
        <DisplayCard farmInfo={farmInfo} val={1} />
        <DisplayCard farmInfo={farmInfo} />
      </Table>
    )
  }
}

export default DisplayTable
