const mongoose = require('mongoose');
const sharingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phonenumber:{
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    publicrole: {
        type: String,
        required: true,
        trim: true,
    },
    dateinstert:{
        type: Date,
        default: Date.now
    },
    typeofideas: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    imageUrls: {
        type: Array,
        trim: true,
    },
},
{timestamps: true});

const Sharing = mongoose.model('Sharing', sharingSchema);
module.exports = Sharing;
