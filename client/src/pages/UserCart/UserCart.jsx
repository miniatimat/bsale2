import React from 'react'
import { useHistory } from 'react-router-dom'
import { Cart } from '../../components/Cart/Cart'

export default function UserCart() {
  const history = useHistory()  

  const handleBack = async (e) =>{
    e.preventDefault();
    history.push("/home");
  }

  return (
    <>
      <Cart/>
      <button onClick={(e) => handleBack(e)}>Go back to the main page</button>
    </>
  )
}
