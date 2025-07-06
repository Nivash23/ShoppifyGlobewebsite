import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    category: String,
    price: Number,
    stock: Number,
    brand: String,
    availabilityStatus: String,
    images:[],
})

const Products = mongoose.model('Products', ProductSchema);

export default Products;