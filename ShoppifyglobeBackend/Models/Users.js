import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required:true
    },
    Name: {
        type: String,
        require:true
    }
})

const Users = mongoose.model('users', UserSchema)

export default Users; 