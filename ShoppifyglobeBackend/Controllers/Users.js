import { Router } from 'express';
import Users from '../Models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtkey } from '../Utils/config.js'
import CartItems from '../Models/Cart.js';


const UserRouter = new Router();

UserRouter.post('/reg/', async(req, res) => {
    const {Email,Password,Name} = req.body;
    try {
        
        const hasedpass=await bcrypt.hash(Password,10)
        const user = new Users({
            Email: Email,
            Password: hasedpass,
            Name:Name
        });
        await user.save();
        res.status(200).send(user)
    }
    catch {
        res.status(500).send({
         message:"This email is already exists.."   
        })
    }
})
UserRouter.post('/login/', async(req, res) => {
    const { Email, Password } = req.body;

    const isuser = await Users.findOne({ Email: Email })
    
    if (isuser == null)
    {
        return res.status(404).json({
            message:"User doesn't exists"
        })
        
    }
    const isAuth = await bcrypt.compare(Password, isuser.Password);
    
    if (!isAuth)
    {
        res.status(404).send({
            message:"User Not Authenticated.."
        })
    }
    const payload = {
        objectid:isuser._id,
        Email: Email,
        Password:Password
    }
    const jwtToken = jwt.sign(payload, jwtkey,{expiresIn:'1h'});

    const cart=await CartItems.find({userid:isuser._id})

    res.status(200).json({
        message: "User successfully Authenticated..",
        token: jwtToken,
        cartItems:cart
    })
})

export default UserRouter;