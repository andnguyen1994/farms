import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled(Link)`
  display: flex;
  grid-column: 1 / 10;
  border: 1px solid rgba(128, 128, 128, 0.295);
  
  &:hover{
    outline: 1px solid #58b77a;
  }
  `

const Datapoint = styled.div`
  margin: auto 0.5em;
  flex-grow: 1;
  flex-basis: auto;
  `

const ImageContainer = Datapoint.extend`
  display: flex;
  max-width: 100px;
`

const Logo = styled.img`
padding: 2px;
object-fit: contain;
height: 100%;
width: 100%;
margin: auto auto;
`

class DisplayCard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const img1 =
      'https://www.bluehillfarm.com/sites/all/themes/unsemantic/images/logos/bluehillmarket-big.png'
    const img2 =
      'http://static1.squarespace.com/static/517e994de4b0d5eb59e2491a/t/517e9df5e4b0d5eb59e2622d/1526849298700/'
    return (
      <Card to='/Farms/key=LIdy00mgNeH0Go9sHvb'>
        <ImageContainer>
          <Logo src={this.props.val ? img1 : img2} />
        </ImageContainer>
        <Datapoint>
          <h2>Blue Hill Farm</h2>
        </Datapoint>
        <Datapoint>
          <h2>2849 Dover Circle Fitchburg, Wi</h2>
        </Datapoint>
        <Datapoint>
          <h2>Vegetables</h2>
        </Datapoint>
        <Datapoint>
          <h2>June-September</h2>
          <h2>September-November</h2>
        </Datapoint>
        <Datapoint>
          <h2>300-595</h2>
        </Datapoint>
      </Card>
    )
  }
}

export default DisplayCard
