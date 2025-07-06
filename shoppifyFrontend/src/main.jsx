import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NotFound from './Components/NotFound.jsx'
import Cart from './Components/Cart.jsx'
import { Provider } from 'react-redux'
import { datastore } from './Components/Reduxstore.js'
import ProductDetails from './Components/ProductDetails.jsx'
import Loginpage from './Components/Loginpage.jsx'

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
    },
    {
        path: "/cartitems",
        element:<Cart/>
    },
    {
        path: "/productdetails/:_id",
        element:<ProductDetails/>
    },
    {
        path: "/userlogin",
        element:<Loginpage/>
    },
    
]
    
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={datastore}>

    <RouterProvider router={Router}>
        <App />
            <Cart />
            <ProductDetails />
            <Loginpage/>
    </RouterProvider>
    </Provider>
  
)
