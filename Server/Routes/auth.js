const express = require('express')
const bcrypt = require('bcryptjs')
// const jwt = require("jsonwebtoken");
const Router = express.Router()
// const cookieParser = require("cookie-parser");
const Authenticate = require('../Middleware/authenticate')
require('../Database/connection')

const User = require('../Models/userSchema')
const News = require('../Models/newsSchema')
// Router.use(cookieParser());

Router.get('/', async function (req, res) {
  const data = await User.find()
  res.status(200).send(data)
})

Router.get('/getNewsData', async function (req, res) {
  const data = await News.find()
  res.status(200).send(data)
})

Router.post('/setNewsData', async function (req, res) {
  const { content, author, niche } = req.body
  if (!content || !author || !niche) {
    return res.status(422).json({ message: 'All fields are required' })
  }
  try {
    const news = new News({
      content,
      author,
      niche,
    })
    const newsRegister = await news.save()
    if (newsRegister) {
      res.status(201).json({ message: 'News Registered Successfully' })
    } else {
      res.status(500).json({ error: 'Failed to Register News' })
    }
  } catch (error) {
    console.log(error)
  }
})

Router.post('/register', async function (req, res) {
  const {
    username,
    email,
    password,
    phoneNumber,
    gender,
    language,
    maritalStatus,
    dob,
    tob,
  } = req.body
  if (
    !username ||
    !email ||
    !password ||
    !phoneNumber ||
    !gender ||
    !language ||
    !maritalStatus ||
    !dob ||
    !tob
  ) {
    return res.status(422).json({ message: 'All fields are required' })
  }
  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({ error: 'User is already registered' })
    }
    const user = new User({
      username,
      email,
      password,
      phoneNumber,
      gender,
      language,
      maritalStatus,
      dob,
      tob,
    })
    const userRegister = await user.save()
    if (userRegister) {
      res.status(201).json({ message: 'User Registered Successfully' })
    } else {
      res.status(500).json({ error: 'Failed to Register User' })
    }
  } catch (error) {
    console.log(error)
  }
})

Router.post('/login', async function (req, res) {
  try {
    let token
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill all the Details' })
    }
    const userLogin = await User.findOne({ email: email })
    if (userLogin) {
      const isMatched = await bcrypt.compare(password, userLogin.password)
      token = await userLogin.generateAuthToken()
      console.log(token)
      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      })
      if (!isMatched) {
        res
          .status(400)
          .json({ error: 'User Login Faied - Invalid Credentials' })
      } else {
        res.status(200).json({ message: 'User Logged In Successfully' })
      }
    } else {
      res.status(400).json({ error: 'User Login Faied - Invalid Credentials' })
    }
  } catch (error) {
    console.log(error)
  }
})

Router.get('/profile', Authenticate, (req, res) => {
  res.send(req.rootUser)
})

Router.get('/logout', (req, res) => {
  console.log('Hello Logout Page')
  res.clearCookie('jwtoken', { path: '/' })
  res.status(200).send('User Logged Out Successfully')
})

module.exports = Router

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
