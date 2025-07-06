import express from 'express';
import cors from 'cors'
import UserRouter from './Controllers/Users.js';
import ProductsRouter from './Controllers/Products.js';
import CartRouter from './Controllers/Cart.js';

const app = new express();

app.use(cors())
app.use(express.json());

app.use('/api/users/', UserRouter);
app.use('/api/products/', ProductsRouter);
app.use('/api/user/cart/',CartRouter)

export default app;