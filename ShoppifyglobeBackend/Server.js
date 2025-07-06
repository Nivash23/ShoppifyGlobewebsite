import mongoose from "mongoose";

import app from "./index.js";

import { MongoDB_URL, PORT } from './Utils/config.js'


mongoose.connect(MongoDB_URL)
    .then(() => {
    console.log('Database Connected')
    })
    .catch((e) => {
    console.log(e)
})

// const db = mongoose.connection;

// db.addListener('open', () => {
//     console.log('DataBase Connected')
// })
// db.addListener('error', (e) => {
//     console.log(e)
// })

app.listen(PORT, () => {
    console.log(`Server is Running to the Port is ${PORT}`)
})