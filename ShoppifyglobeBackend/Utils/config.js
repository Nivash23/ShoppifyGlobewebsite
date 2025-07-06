import dotenv from 'dotenv'
dotenv.config();

const MongoDB_URL = process.env.MongoDB_URI;
const PORT = process.env.PORT;
const jwtkey=process.env.Jwt_secret

export {MongoDB_URL,PORT,jwtkey}

