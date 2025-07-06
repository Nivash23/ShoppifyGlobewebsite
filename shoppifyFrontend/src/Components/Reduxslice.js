import { createSlice } from "@reduxjs/toolkit";


const Productsslice = createSlice({
    name: "Productslists",
    initialState: {
        alllists: [],
        beautylists: [],
        furnitures: [],
        groceries: [],
        cartItems: [],
        totalpriceofcart: 0,
        logoutbutstate: "Logoutinactive",
        loginbutstate: "Loginactive",
        jwtToken: ""
    },
    reducers: {
        setallproducts: (state,action) => {
            state.alllists = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload.Items; 
            
        },
        productsseperation: (state) => {
            const list = state.alllists;

            const b1 = list.filter(val => val.category == "beauty");
            state.beautylists = b1;

            const b2 = list.filter(val1 => val1.category == "furniture");
            state.furnitures = b2;

            const b3 = list.filter(val3 => val3.category == "groceries");
            state.groceries = b3;
        },
        searchproductItem: (state,action) => {
            state.alllists = action.payload;
        },
        Addtocart: (state, action) => {

            state.cartItems.push(action.payload);
            // state.totalpriceofcart=state.totalpriceofcart+Math.floor(action.payload.price)
                

            
        },
        Removefromcart: (state,action) => {
            let cartitems = state.cartItems;
            let c2 = cartitems.filter(val => val.title !== action.payload.title)
            state.cartItems = c2;
            // state.totalpriceofcart = state.totalpriceofcart - Math.floor(action.payload.price);
    
        },
        displaybeautyitems: (state) => {
            let list = state.alllists;
            state.furnitures = [];
            state.groceries = [];
            const b4 = list.filter(val => val.category == "beauty");
            state.beautylists = b4;
        },
        displaybeautyitems: (state) => {
            let list = state.alllists;
            state.furnitures = [];
            state.groceries = [];
            const b4 = list.filter(val => val.category == "beauty");
            state.beautylists = b4;
        },
        displayfurnituresitems: (state) => {
            let list = state.alllists;
            state.beautylists = [];
            state.groceries = [];
            const b5 = list.filter(val => val.category == "furniture");
            state.furnitures = b5;
        },
        displaygroceryitems: (state) => {
            let list = state.alllists;
            state.beautylists = [];
            state.furnitures = [];
            const b6 = list.filter(val => val.category == "groceries");
            state.groceries = b6;
        },
        totalprice: (state) => {
            // state.totalpriceofcart = state.totalpriceofcart + Math.floor(action.payload.price);
            // state.cartItems.map((val) => {
            //     state.totalpriceofcart = state.totalpriceofcart + val.price;
            // })
            // console.log(state.totalpriceofcart)
            state.totalpriceofcart=state.cartItems.reduce((prev,curr)=>prev+Math.floor(curr.price*curr.quantity),0)
        },
        setLogoutbutstate: (state, action) => {
            state.logoutbutstate = action.payload.message;
        },
        setLoginbutstate: (state, action) => {
            state.loginbutstate = action.payload.message;
        },
        jwtToken: (state, action) => {
            state.jwtToken = action.payload.token;
        }
        
    }
})

export const { setallproducts,productsseperation,searchproductItem,Addtocart,Removefromcart,displaybeautyitems,displayfurnituresitems,displaygroceryitems,totalprice,setLogoutbutstate,setLoginbutstate,jwtToken,setCartItems } = Productsslice.actions;

export default Productsslice.reducer;