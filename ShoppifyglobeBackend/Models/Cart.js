import mongoose from "mongoose";

const CartitemSchema = new mongoose.Schema({
    id: Number,
    userid:String,
    title: String,
    description: String,
    category: String,
    price: Number,
    stock: Number,
    brand: String,
    availabilityStatus: String,
    quantity:Number,
    images:[],
})

const CartItems = mongoose.model('cartitems', CartitemSchema);

export default CartItems;