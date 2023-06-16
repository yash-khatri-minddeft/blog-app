import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard';

export default function CategoryBlog() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    fetch('/api/get-category-blogs', {
      method: 'POST',
      body: JSON.stringify({
        category: category
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setBlogs(data.categoryBlogs);
      })
  }, [])
  return (
    <div className="category-blog-page py-5">
      <div className="container">
        <div className="row gy-5">
          <BlogCard blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
