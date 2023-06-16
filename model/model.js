const mongoose = require('mongoose');


// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
})
const User = new mongoose.model('users', userSchema);


//Category Schema

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

const Category = new mongoose.model('categories', categorySchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default:'',
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
})

const Blog = new mongoose.model('blogs', blogSchema);

module.exports = { User, Category, Blog };