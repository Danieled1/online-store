
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;

const manager_schema = new Schema({


    manager_name:{
        type:String,
        required: true,
        unique: true
    },

    manager_email:{
        type:String,
        unique: true,
        lowercase: true,
        required: true
    },

    manager_password:{
        type:String,
        required: true
    },

    tokens: [{ type: Object }],

    permission: {
        type: Number,
        default: 1
    }

})


module.exports = mongoose.model('Managers', manager_schema)