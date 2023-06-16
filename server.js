const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const path = require('path');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'yash.khatri1616@gmail.com',
    pass: "dzdkgemilnrxqhtp"
  }
})
const otpGenerator = require('otp-generator')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Category, Blog } = require('./model/model');
// console.log(path.join(__dirname,'uploads')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(session({
  secret: 'tKcOSCwZq7twiFbdxDjVKbD6M0bKOIbKD6GEXdoW',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  }
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await User.findOne({
    username: username,
  });
  if (checkUser) {
    if (bcrypt.compareSync(password, checkUser.password)) {
      req.session.OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      console.log(req.session.OTP)
      if (checkUser.isAdmin) {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      const toEmail = checkUser.email;
      req.session.userName = checkUser.username;
      sendMail(toEmail, req.session.OTP);
      res.json({ email: toEmail });
    } else {
      res.json({ err: 'Invalid Credentials' });
    }
  } else {
    res.json({ err: 'Username not found' });
  }
})
app.post('/api/otp', async (req, res) => {
  const { otp } = req.body;
  if (otp == req.session.OTP) {
    req.session.isLoggedin = true;
    res.json({ isLoggedin: req.session.isLoggedin, isAdmin: req.session.isAdmin })
  } else {
    res.json({ err: 'invalid OTP' });
  }
})
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const userExist = await User.findOne({
    username: username
  })
  if (userExist) {
    res.json({ err: 'User already exist' });
  } else {
    req.session.OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword
    })
    console.log(req.session.OTP);
    sendMail(email, req.session.OTP);
    newUser.save();
    res.json({ msg: "" });
  }
})
app.post('/api/check-login', (req, res) => {
  if (req.session.isLoggedin) {
    if (req.session.isAdmin) {
      res.json({ isLoggedin: req.session.isLoggedin, isAdmin: req.session.isAdmin, username: req.session.userName });
    } else {
      res.json({ isLoggedin: req.session.isLoggedin, username: req.session.userName });
    }
  } else {
    res.json({ isLoggedin: false });
  }
})
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ isLoggedin: false });
})

app.post('/api/add-blog', async (req, res) => {
  const { title, category, text, excerpt } = req.body;
  const image = req.files.image;
  await image.mv(path.join(__dirname, 'uploads', image.name))

  const slug = (title.toLowerCase()).replaceAll('/', '').replace(/\s+/g, '-');
  const getCategory = await Category.findOne({ name: category })
  const categorySlug = getCategory.slug;
  const imagePath = '/uploads/' + image.name;
  const newBlog = await Blog({
    title: title,
    text: text,
    slug: slug,
    excerpt: excerpt,
    image: imagePath,
    author: req.session.userName,
    category: category,
    categorySlug: categorySlug,
    time: new Date()
  });
  await newBlog.save()
  res.json({ msg: 'Blog added successfully' })
})

app.post('/api/edit-blog', async (req, res) => {
  const { title, category, text, excerpt, slug } = req.body;
  const image = req.files?.image;
  const getCategory = await Category.findOne({ name: category })
  const categorySlug = getCategory.slug;
  var update;
  if (image) {
    await image.mv(path.join(__dirname, 'uploads', image.name))
    const imagePath = '/uploads/' + image.name;
    update = {
      title: title,
      text: text,
      excerpt: excerpt,
      image: imagePath,
      category: category,
      categorySlug: categorySlug,
    };
  } else {
    update = {
      title: title,
      text: text,
      excerpt: excerpt,
      category: category,
      categorySlug: categorySlug,
    }
  }
  const filter = { slug: slug };
  await Blog.findOneAndUpdate(filter, update);
  res.json({ msg: 'Blog Edited Succesfully' });
})

app.get('/api/get-blogs', async (req, res) => {
  const blogs = await Blog.find({});
  res.json({ blogs: blogs })
})
app.post('/api/get-blog-details', async (req, res) => {
  const { slug } = req.body;
  const blog = await Blog.findOne({ slug: slug })
  res.json({ blog: blog })
})

app.post('/api/add-category', async (req, res) => {
  const { category } = req.body;
  const slug = (category.toLowerCase()).replaceAll('/', '').replace(/\s+/g, '-');
  const findCategory = await Category.findOne({ slug: slug });
  if (findCategory) {
    res.json({ msg: 'Category already added' })
  } else {
    const newCategory = await Category({
      name: category,
      slug: slug
    })
    await newCategory.save();
    res.json({ msg: 'Category Added' });
  }
})
app.get('/api/get-categories', async (req, res) => {
  const categories = await Category.find({});
  res.json({ categories: categories })
})
app.post('/api/get-user-blogs', async (req, res) => {
  const { username } = req.body;
  const userBlogs = await Blog.find({ author: username });
  res.json({ userBlogs: userBlogs });
})
app.post('/api/get-category-blogs', async (req, res) => {
  const { category } = req.body;
  const categoryBlogs = await Blog.find({ categorySlug: category });
  res.json({ categoryBlogs: categoryBlogs });
})

app.listen(8080, (err) => {
  if (err) throw err;
  mongoose.connect('mongodb://127.0.0.1:27017/newsApp')
    .then(() => {
      console.log('database Connected!')
    }).catch(err => { throw err; })
  console.log('server started on 8080')
})

function sendMail(email, OTP) {
  var mailOptions = {
    from: 'yash.khatri1616@gmail.com',
    to: email,
    subject: 'OTP for Login',
    html: `
    <div className="OTP-template" style="background-color: #fff; padding: 30px; ">
      <h2>Verification Code</h2>
      <p>Please use the verification code below to login.</p>
      <h5 style="font-weight:700">${OTP}</h5>
      <p>If you didn't request this, you can ignore this email. <br />Thanks, <br/>Regards.</p>
    </div>`
  };
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err)
      res.json({ err: 'error while sending OTP email to you. Please try again later' });
      return;
    }
  })
}