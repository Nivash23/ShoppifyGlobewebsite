import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Removefromcart, setCartItems, totalprice } from './Reduxslice';
import { useNavigate } from 'react-router-dom';

function CartItem({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productqnty, setProductqnty] = useState(item.quantity);


    const Productupdatehandler = async () => {
        console.log(item.userid)
        const updatebody = {
            userid: item.userid,
            qty:productqnty
        }
        const response = await fetch(`http://127.0.0.1:5000/api/user/cart/${item._id}`, {
            method: "PUT",
            headers: {
                'Content-Type':"application/json"
            },
            body:JSON.stringify(updatebody)
        })

        const data = await response.json();

        if (response.status == 200)
        {
            setProductqnty(data.qty);
        }
    }

    const Removeitemhandler = async () => {
        const itembody = {
            userid:item.userid
        }
        const response = await fetch(`http://127.0.0.1:5000/api/user/cart/${item._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type':"application/json"
            },
            body:JSON.stringify(itembody)
        })
        const data = await response.json();
        if (response.status == 200)
        {
            dispatch(Removefromcart(item));
            dispatch(totalprice());
            
        }
    }
  return (
      <div id="cartItem">
          <div style={{width:"150px",height:"200px"}} onClick={()=>{navigate(`/productdetails/${item.title}`)}}>
              <img src={item.images} style={{height:"100%",width:"100%"}}></img>
          </div>
          <div onClick={()=>{navigate(`/productdetails/${item.title}`)}}>
              <div style={{fontWeight:"bold"}}>{item.title}</div>
              <div>Price :Rs.{Math.floor(item.price) }</div>
              <div>Brand : {item.brand }</div>
          </div>
          <div style={{ textAlign: "center" }}>
              <div style={{marginBottom:"20px",fontWeight:"bold"}}>
                  <div>Quantity :{productqnty} <span onClick={() => {
                      setProductqnty(productqnty + 1); 
                    //   dispatch(totalprice(item));
                      Productupdatehandler();
                  }} style={{padding:"5px",cursor:"pointer",borderRadius:"5px",width:"25px",height:"25px",backgroundColor:"white",color:"black",marginLeft:"5px"}}>+</span><span onClick={() => {
                    setProductqnty(productqnty - 1); 
                  //   dispatch(totalprice(item));
                    Productupdatehandler();
                }} style={{padding:"5px",cursor:"pointer",borderRadius:"5px",width:"25px",height:"25px",backgroundColor:"white",color:"black",marginLeft:"5px"}}>-</span></div>
                  {/* <div></div> */}
              </div>
              <div>
                  
              <button type="button" style={{padding:"5px 10px 5px 10px",backgroundColor:"orange",borderRadius:"7px",cursor:"pointer"}}>Buy</button>
              </div>
              <div style={{marginTop:"20px"}}>
                  
                  <button type="button" onClick={() => {
                      Removeitemhandler();
                      
                  }} style={{padding:"5px 10px 5px 10px",backgroundColor:"orange",borderRadius:"7px",cursor:"pointer"}}>Remove</button>
              </div>
          </div>
    </div>
  )
}

export default CartItem