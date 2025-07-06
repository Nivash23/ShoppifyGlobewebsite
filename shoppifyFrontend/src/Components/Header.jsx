import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { displaybeautyitems, displayfurnituresitems, displaygroceryitems, setallproducts, setLoginbutstate, setLogoutbutstate, totalprice } from './Reduxslice';
import menuicon from '../icons/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'

function Header({categorydisplay,setCategorydisplay,brandsdisplay,setBrandsdisplay,menulinemenudisplay,setMenulinemenudisplay}) {
  const navigate = useNavigate();
  const { alllists, beautylists, furnitures, groceries, cartItems,logoutbutstate,loginbutstate } = useSelector((state) => state.Productlist);
  
  const dispatch = useDispatch();
  return (
      <div>
          <div id="navigation" >
              <div id="logo">ShoppifyGlobe</div>
              <div id="menus">
          <div onClick={() => {
            if (categorydisplay == "none")
            {
              setCategorydisplay('block')
              setBrandsdisplay('none')

            }
            else {
              setCategorydisplay('none')
            }
          }} className="m">Categories</div>
                  <div onClick={() => {
            if (brandsdisplay == "none")
            {
              setBrandsdisplay('block')
              setCategorydisplay('none')

            }
            else {
              setBrandsdisplay('none')
            }
          }} className="m">Brand</div>
          <div id="cartbut" onClick={() => {
            navigate("/cartitems");

          }} className="m" >Cart <span style={{ backgroundColor: "black", color: "white", borderRadius: "7px", padding: "2px 5px 2px 5px" }}>{cartItems.length}</span></div>
          <div  className={loginbutstate} onClick={() => { navigate('/userlogin') }}>Login</div>
          <div className={logoutbutstate} onClick={() => {
            dispatch(setLogoutbutstate({ message: "Logoutinactive" }));
            dispatch(setLoginbutstate({message:"Loginacitve"}))
            navigate('/userlogin')
          
          }}>Logout</div>
        <div id="menuline">

            <img onClick={() => {
              if (menulinemenudisplay == "none")
              {
                setMenulinemenudisplay('block');
                setBrandsdisplay('none');
                setCategorydisplay('none');
              }
              else {
                setMenulinemenudisplay('none');
                setBrandsdisplay('none');
                setCategorydisplay('none');
              }
        }} src={menuicon}></img>
        </div>
        </div>
        
      </div>
      <div id="categoriesmenu" style={{ display: categorydisplay }}>
        <div onClick={() => {
          
          dispatch(displaybeautyitems());
        }}>Beauty</div>
        <div onClick={() => {
          
          dispatch(displayfurnituresitems());
        }}>Furnitures</div>
        <div onClick={() => {
          
          dispatch(displaygroceryitems())
        }}>Groceries</div>
      </div>
      <div id="brandsmenu" style={{ display: brandsdisplay }}>
        <div onClick={()=>{console.log(alllists)}}>Glamour Beauty</div>
        <div> Essence</div>
        <div> Velvet Touch</div>
        <div> Nail Couture</div>
        <div> Chic Cosmetics</div>
        <div> Annibale Colombo</div>
        <div> Knoll</div>
        <div>  Bath Trends</div>
      </div>
      <div style={{display:"flex",justifyContent:"end"}}>

      <div id="menulinemenu" style={{display:menulinemenudisplay}}>
          <div onClick={() => {
            if (categorydisplay == "none")
            {
              setCategorydisplay('block')
              setBrandsdisplay('none')

            }
            else {
              setCategorydisplay('none')
            }
          }}>Categories</div>
        <div onClick={() => {
            if (brandsdisplay == "none")
            {
              setBrandsdisplay('block')
              setCategorydisplay('none')

            }
            else {
              setBrandsdisplay('none')
            }
          }}>Brand</div>
        <div onClick={() => {
            navigate("/cartitems")
          }}>Cart</div>
      </div>
      </div>

    </div>
  )
}

export default Header