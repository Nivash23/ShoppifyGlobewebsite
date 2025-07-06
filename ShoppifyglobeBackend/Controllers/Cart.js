import { Router } from "express";
import CartItems from "../Models/Cart.js";
import { jwtkey } from "../Utils/config.js";
import jwt from 'jsonwebtoken'

const CartRouter = new Router();

CartRouter.post('/addtocart', async (req, res) => {
    const { cartitem, token } = req.body;
    if (token == null)
    {
        return res.status(404).json({
            message:"Please Login on your account.."
        })
    }
    const user = jwt.verify(token, jwtkey)

    if (user == null)
    {
    
        res.status(404).json({
            message:"Invalid Token.."
        })

    }

    const isitem = await CartItems.findOne({ userid: user.objectid, title: cartitem.title })
    
    if (isitem)
    {
        return res.status(404).json({
            message:"Item Already added in cart"
        })
    }

    const newItem = new CartItems({
        id: cartitem.id,
       userid:user.objectid,
       title: cartitem.title,
       description: cartitem.description,
    category: cartitem.category,
    price: cartitem.price,
    stock: cartitem.stock,
    brand: cartitem.brand,
        availabilityStatus: cartitem.availabilityStatus,
    quantity:1,
    images:cartitem.images,
        
    })
    
    await newItem.save();
    res.status(200).json({
        message: "Item Added Sucessfully..",
        newItem:newItem
    })

    
})

CartRouter.put('/:_id', async (req, res) => {
    const { userid,qty } = req.body;
    const productid = req.params._id;

    const Product = await CartItems.findOne({ userid: userid, _id: productid });
    if (Product == null)
    {
        // console.log(productid);
        return;
    }
    
    
    Product.quantity = qty;
    await Product.save();
    res.status(200).json({message:"updated sucessfully.."})
})

CartRouter.delete('/:_id', async (req, res) => {
    const { userid } = req.body;
    const productid = req.params._id;

    const deleted = await CartItems.deleteOne({ userid: userid, _id: productid });

    res.status(200).json({
        message:"Deleted sucessfully"
    })
})

export default CartRouter;