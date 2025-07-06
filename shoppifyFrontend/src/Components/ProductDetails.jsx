import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const productname = useParams();
    const lists = useSelector((state) => state.Productlist.alllists);

    const [selecteditem, setSelecteditem] = useState([]);
    useEffect(() => {
        let b1=lists.filter((val)=>val._id==productname._id)
        setSelecteditem(b1);
        console.log(lists)

    
    },[])

  return (
      <div style={{textAlign:"center"}}>
          <div>
              {
                  selecteditem.map((val) => (
                      <div>
                          
                          <img style={{ width: "500px", height: "500px" }} src={val.images}></img>
                          <div>Name : {val.title }</div>
                          <div>Price : {val.price }</div>
                          <div>Brand : {val.brand }</div>
                          <div>Stock : {val.stock}</div>
                          <div>Availablity : {val.availabilityStatus }</div>
                      </div>
                      
                  ))
              }
          </div>
    </div>
  )
}

export default ProductDetails