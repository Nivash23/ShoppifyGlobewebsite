import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';

function Cart() {
      const {alllists,beautylists,furnitures,groceries,cartItems,totalpriceofcart} = useSelector((state) => state.Productlist);
    
    // const [totalprice, setTotalprice] = useState(totalpriceofcart);
  return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          {
              cartItems.length == 0 ? <h4 style={{textAlign:"center"}}>No Items Added in Cart</h4> : null
          }
          <div >
              {
                  cartItems.map((val) => (
                      <CartItem item={val}   />
                  ))
              }
          </div>
          {
              cartItems.length!== 0 ? <h2>Total Price :Rs. {totalpriceofcart}</h2> : null
          }
          
          
          
    </div>
  )
}

export default Cart