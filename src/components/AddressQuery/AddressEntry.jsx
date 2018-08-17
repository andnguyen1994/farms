import React, { Component } from 'react'
import styled from 'styled-components'
import NavIcon from 'styles/NavIcon.png'

const background =
  'https://images.pexels.com/photos/890507/pexels-photo-890507.jpeg?auto=compress&cs=tinysrgb&dpr=2'

const Container = styled.div`
  background: center / cover url(${background}) no-repeat;
  height: 100vh;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
  object-fit: fill;
`

const Tagline = styled.div`
  grid-area: 1 / 2;
  align-self: end;

  & > * { 
    font-size: 2.75vw;
    font-weight: bold;
    color: rgb(255, 255, 255);
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
  }
`

const Form = styled.form`
  height:88px;
  width: 100%;
  grid-area: 2 / 2;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
`

const AddressInput = styled.input`
  grid-area: 1 / 1 / 2 / 3;
  width: 100%;
  padding: 12px 20px 12px 45px;
  background: 8px 10px white url(${NavIcon}) no-repeat;
  box-shadow: 0 15px 46px rgba(26, 26, 29, 0.3), 0 15px 90px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  font-size: 16px;
  color: rgba(31, 28, 28, 0.822);
  outline: none;
  border-radius: 4px;
  border-style: hidden;

  ${Form}:focus-within & {
    border-radius: 4px 4px 0 0;
  }
`

const DeliverySelectionContainer = styled.div`
  z-index: 50;
  grid-area: 2 / 1 / 3 / 3;
  width: stretch;
  display: none;
  border-radius: 0 0 4px 4px;
  overflow: hidden;

  ${Form}:focus-within & {
    display: flex;
    box-shadow: 0 15px 30px rgba(26, 26, 29, 0.3), 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`

const DeliveryButton = styled.button`
  flex: 1;
  background-color: white;
  border: none;
  border-top: 1px solid black;
  border-bottom: ${props => (props.selected ? '2px solid rgba(21, 95, 27, 0.712)' : 'none')};
  font-weight: ${props => (props.selected ? 600 : 400)};
  font-size: 15px;
  outline: none;

  &:hover{
    cursor: pointer;
  }
`

const AddressEntry = props => {
  return (
    <Container>
      <Tagline>
        <h1>Connecting people to their food</h1>
      </Tagline>
      <Form onSubmit={props.handleSubmit}>
        <AddressInput
          type='text'
          onChange={props.handleChange}
          value={props.address}
          autoComplete='off'
          placeholder='Enter your address...'
        />
        <DeliverySelectionContainer>
          <DeliveryButton
            selected={props.isDelivery}
            type='button'
            onClick={props.handleChoice(true)}
          >
            Delivery
          </DeliveryButton>
          <DeliveryButton
            selected={!props.isDelivery}
            type='button'
            onClick={props.handleChoice(false)}
          >
            Pickup
          </DeliveryButton>
        </DeliverySelectionContainer>
      </Form>
    </Container>
  )
}

export default AddressEntry
