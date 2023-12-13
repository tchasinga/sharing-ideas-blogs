const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        trim: true,
    },
    email: {
        type : String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type : String,
        required: true,
        trim: true,
    },
    avatar: {
        type : String,
        default: "https://imgs.search.brave.com/o-Jr6SJnUB5c5kAUeEbyCkum4-i2470l41dMBXzm-g4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9",
    },
})

const User = mongoose.model("User", userSchema);
module.exports = User;