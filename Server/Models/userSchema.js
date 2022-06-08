const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  tob: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

// Hashing the Password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// Generating JWT Token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  } catch (error) {
    console.log(error)
  }
}

const User = mongoose.model('USER', userSchema)
module.exports = User

// Username : String
// Email : String
// Password: String
// Phone Number : numer
// Gender : String
// Language : String
// Marital Status : String
// Date of Birth : String
// Time of Birth : String

// {
//     "username": "Abhishek Verma",
//     "email": "abhishekverma998@gmail.com",
//     "password": "123",
//     "phoneNumber": 8888888888,
//     "gender": "Male",
//     "language": "English",
//     "maritalStatus": "Unmarried",
//     "dob": "12345",
//     "tob": "12345"
// }
