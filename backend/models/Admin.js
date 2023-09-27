const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;

const admin_schema = new Schema({


    admin_name:{
        type:String,
        required: true,
        unique: true
    },

    admin_email:{
        type:String,
        unique: true,
        lowercase: true,
        required: true
    },

    admin_password:{
        type:String,
        required: true
    },

    tokens: [{ type: Object }],

    permission: {
        type: Number,
        default : 2
    }

})

module.exports = mongoose.model('Admins', admin_schema)