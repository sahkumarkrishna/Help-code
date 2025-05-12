import mongoose from "mongoose";

const userSchema = new mongoose.Schema
({
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    username: 
    {
        type: String,
        required: true,
        minlength: 8,
        unique: true
    },
    password: 
    {
        type: String,
        required: true,
        minlength: 8,
        validate: 
        {
            validator: function (value) 
            {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            },
            message: props => 'Password must include uppercase, lowercase, number, and special character'
        }
    }
}, 
{ timestamps: true });

export const User = mongoose.model('User', userSchema);
