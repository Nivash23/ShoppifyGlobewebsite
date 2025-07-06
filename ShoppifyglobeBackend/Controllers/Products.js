import { Router } from "express";
import Products from "../Models/Products.js";

const ProductsRouter = new Router();

ProductsRouter.get('/', async (req, res) => {
    const products = await Products.find();


    res.status(200).json({
        products
    })
})
ProductsRouter.get('/:_id', async (req, res) => {
    const productid = req.params._id;

    const product = await Products.findOne({ _id: productid });

    if (product == null)
    {
        res.status(404).send("Product doesn't exists")
    }
    res.status(200).json({
        product
    })
})

export default ProductsRouter;

