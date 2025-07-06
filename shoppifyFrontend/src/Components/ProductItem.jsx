import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart, Removefromcart, totalprice } from "./Reduxslice";
import { useNavigate } from "react-router-dom";

function ProductItem({ item }) {
  const dispatch = useDispatch();
  const jwtToken= useSelector((state) => state.Productlist.jwtToken);
  // const cartbuttxt = useSelector((state) => state.Productlist.cartbuttext);
  const [productbut, setProductbut] = useState("Add to Cart");
  const navigate = useNavigate();

  const Cartitemshandler = async() => {
    const cartbody = {
      cartitem: item,
      token:jwtToken
    }
    const response = await fetch('http://127.0.0.1:5000/api/user/cart/addtocart/', {
      method: "POST",
      headers: {
        'Content-Type':"application/json"
      },
      body:JSON.stringify(cartbody)
    }) 
    const data = await response.json();

    if (response.status == 200)
    {
      dispatch(Addtocart(data.newItem))
      dispatch(totalprice());
    }
    else {
      window.alert(`${data.message}`)
    }

  }

  // const navigatehandler = () => {
  //   navigate(`/productdetails`);
  //   // console.log(item.title)
  // }

  return (
    <div id="Itemcontainer">
      <img
        src={item.images}
        alt="image.png"
        onClick={() => {
          navigate(`/productdetails/${item._id}`);
        }}
      ></img>

      <div
        style={{ textAlign: "center", fontWeight: "bold" }}
        onClick={() => {
          navigate(`/productdetails/${item._id}`);
        }}
      >
        {item.title}
      </div>
      <br />
      {item.brand ? (
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "grey" }}>
          Brand : {item.brand}
        </div>
      ) : null}
      <br />

      <div
        style={{ fontSize: "14px", fontWeight: "bold", color: "grey" }}
        onClick={() => {
          navigate(`/productdetails/${item._id}`);
        }}
      >
        price :Rs. {Math.floor(item.price)}
      </div>
      <button
        type="button"
        onClick={() => {
          if (productbut == "Add to Cart") {
            // dispatch(Addtocart(item));
            
              Cartitemshandler();
              // dispatch(totalprice(item));
              setProductbut("Remove");

            
          } else {
            dispatch(Removefromcart(item));
            dispatch(totalprice());
            setProductbut("Add to Cart");
          }
          // console.log(cartitems)
        }}
      >
        {productbut}
      </button>
    </div>
  );
}

export default ProductItem;
