require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const connectDB = require('./db/connect')

const app = express()

const User = require('./models/User')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

const year = require('./middleware/year')
let yearNow = year()

//! ROUTES
app.get('/', (req, res) => {
  res.render('index2', {
    title: 'INDEX2',
    year: yearNow
  })
})

app.get('./places', (req, res) => {
  res.render('places', {
    title: 'PLACES',
    year: yearNow
  })
})

//* Register
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'REGISTER',
    year: yearNow
  })
})

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    if (user == null) {
      res.redirect('/register')
    } else {
      user.save()
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }
})

//* Login
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'LOGIN',
    year: yearNow
  })
})

app.post('/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    res.redirect('/register')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.render('users', {
        title: 'USERS',
        year: yearNow
      })
    } else {
      res.redirect('/register')
    }
  } catch (err) {
    console.log(err)
    res.redirect('/login')
  }

})

//* Users
app.get('/users', (req, res) => {
  res.render('users', {
    title: 'USERS',
    year: yearNow
  })
})



//! SERVER
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()