const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Model
let User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    todoLists: [
        {
            type: Schema.Types.ObjectId,
            ref: "todoLists"
        }
    ]
},
)
const UserModel = mongoose.model("User", User);

let RefreshToken = new Schema({
    token: {
        type: String,
        unique: true
    }
})
const RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken)



// export models
module.exports.UserModel = UserModel;
module.exports.RefreshTokenModel = RefreshTokenModel;





