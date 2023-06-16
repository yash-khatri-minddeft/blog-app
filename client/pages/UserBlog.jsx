import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard';

export default function UserBlog() {
  const { username } = useParams();
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    fetch('/api/get-user-blogs', {
      method: 'POST',
      body: JSON.stringify({
        username: username
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setBlogs(data.userBlogs);
      })
  }, [])
  return (
    <div className="user-blog-page py-5">
      <div className="container">
        <div className="row gy-5">
          <BlogCard blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
