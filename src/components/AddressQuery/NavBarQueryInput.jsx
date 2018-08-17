import React from 'react'
import styled from 'styled-components'

const SearchIcon =
  'https://cdn3.iconfinder.com/data/icons/eightyshades/512/11_Search-16.png'

const QueryInput = styled.input`
  background: 15px 22px white url(${SearchIcon}) no-repeat;
  border: 1px solid white;
  flex: auto;
  padding: 0px 20px 0px 40px;
  font: 400 16px 'PT Sans Caption';
  display: block;
  outline: none;
  transition: border .1s ease;

  &:focus {
    border: 1px solid rgba(36, 117, 40, 0.418);
  }
`

const QueryContainer = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
`
const NavBarSearch = props => {
  return (
    <QueryContainer onSubmit={props.handleSubmit}>
      <QueryInput
        type='input'
        value={props.address}
        onChange={props.handleChange}
      />
    </QueryContainer>
  )
}

export default NavBarSearch
