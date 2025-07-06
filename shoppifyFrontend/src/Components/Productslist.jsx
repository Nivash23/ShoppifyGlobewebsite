import React, { useEffect, useMemo, useState } from 'react'
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { productsseperation, searchproductItem, setallproducts } from './Reduxslice';

function Productslist({categorydisplay,setCategorydisplay,setBrandsdisplay,setMenulinemenudisplay}) {

  const [searchItem, setSearchItem] = useState('');
  const dispatch = useDispatch();
  const {alllists,beautylists,furnitures,groceries}=useSelector((state)=>state.Productlist)
  const Fetchproducts = async () => {
   
      const response = await fetch('http://127.0.0.1:5000/api/products/');
      const data = await response.json();
      if (response.status == 200)
      {
      
        dispatch(setallproducts(data.products))
        console.log(data.products)
        // console.log("Redux",products)
    }
 
  
  }

  const searchhandler = () => {
   
    let product = alllists.filter(val => val.title.toLowerCase().includes(searchItem.toLowerCase()));
    dispatch(searchproductItem(product))
    
  }
  
  const productspliting = useMemo(() => {
  

    dispatch(productsseperation());
    
      
  },[alllists])
    useEffect(() => {
      Fetchproducts();
   
    


    },[])
  return (
    <div id="productcontainer" onClick={() => {
      setCategorydisplay('none');
      setBrandsdisplay('none');
      setMenulinemenudisplay('none');
    }}>
      <div id="searchbar">
        <div>

        <input type="text" placeholder='Search' onChange={(e)=>{setSearchItem(e.target.value)}} value={searchItem}></input>
        </div>
        <div>
          <button type="button" onClick={() => {
            if (searchItem !== "")
            {

              searchhandler();
            
            }
            // console.log(products)
          }}>Search</button>
        </div>


      </div>
      {
        beautylists.length!==0 ? <h2 style={{fontWeight:"bold"}}>Beauty</h2> : null
      }
      
      <div class="lists">
        {
          beautylists.map((val) => (
            <div>

              <ProductItem item={val} />
            </div>
          ))
         }
      </div><br />
      {
        groceries.length!==0 ?  <h2 style={{fontWeight:"bold"}}>Groceries</h2> :null
      }
     
      <div class="lists">
        {
          groceries.map((val) => (
            <ProductItem item={val} />
           ))
        }
      </div>
      {
        furnitures.length!==0 ?  <h2 style={{fontWeight:"bold"}}>Furnitures</h2> :null
      }
      
      <div class="lists">
        {
          furnitures.map((val) => (
            <ProductItem item={val} />
          ))
        }
      </div>

      
      


      
    </div>
  )
}

export default Productslist