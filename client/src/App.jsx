import { useEffect, useState } from 'react'
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';
import SignUpPage from '../pages/SignUpPage';
import LoaderComponent from '../components/LoaderComponent';
import AddBlogComponent from '../pages/addBlogPage';
import BlogComponent from '../components/BlogComponent';
import EditBlogComponent from '../components/EditBlogComponent';
import AddCategory from '../components/AddCategory';
import UserBlog from '../pages/UserBlog';
import CategoryBlog from '../pages/CategoryBlog';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  useEffect(() => {
    fetch('/api/check-login', {
      method: 'POST'
    }).then(res => res.json())
      .then(data => {
        setLoggedIn(data.isLoggedin)
        setIsAdmin(data.isAdmin);
        if (data.isLoggedin) {
          setUsername(data.username)
        }
        setLoading(false)
      })
  }, [isLoggedIn]);

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }
  return (
    <>{isLoading
      ? <LoaderComponent />
      : <></>}
      <Header setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} isAdmin={isAdmin} username={username} />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path='/add-blog' element={<AddBlogComponent isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/blog/:blogSlug" element={<BlogComponent username={username} />} />
        <Route path="/edit/:blogSlug" element={<EditBlogComponent username={username} />} />
        <Route path="/add-category" element={<AddCategory isAdmin={isAdmin} />} />
        <Route path="/user/:username" element={<UserBlog />} />
        <Route path="/category/:category" element={<CategoryBlog />} />
        <Route path="*" element={<>404 Error, page not found</>} />
      </Routes>
    </>
  )
}

export default App;
