const express = require('express')
require('dotenv').config()

const axios = require('axios')

const userRoutes = require('./routes/authRoutes/user.routes')
const blogRoutes = require('./routes/blogsRoutes/blog.routes')
const premiumBlogsRoutes = require('./routes/premiumBlogRoutes/premiumBlogRoutes')


const app = express()

const mongoose = require('mongoose')



const url = process.env.MONGO_URL

mongoose.connect(url).then(()=> console.log('connected')).catch(err => console.log('mongodb error connection', err))

app.use(express.json())

app.use('/api',userRoutes)
app.use('/api/blogs',blogRoutes)

app.use('/premiumBlogs',premiumBlogsRoutes)

app.listen(process.env.PORT, ()=> console.log('runnnnnn'))