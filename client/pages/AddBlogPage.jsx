import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddBlogComponent({ isLoggedIn }) {
  const [imageURL, setImageURL] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [excerpt, setExcerpt] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetch('/api/get-categories', {
      method: 'GET',
    }).then(res => res.json())
      .then(data => {
        setCategories(data.categories)
      })
  }, [])
  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('text', text);
    formData.append('image', image);
    formData.append('excerpt', excerpt);
    fetch('/api/add-blog', {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        alert(data.msg)
        document.forms[0].reset()
        setImageURL('')
      })
  }
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
  const fileChangeHandler = e => {
    e.target.files.length ? setImageURL(URL.createObjectURL(e.target.files[0])) : setImageURL('');
    e.target.files.length ? setImage(e.target.files[0]) : setImage('');
  }
  return (
    <div className="add-blog py-5">
      <div className="container">
        {isLoggedIn
          ? <div className="add-blog-form">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" autoFocus autoComplete="off" onChange={e => setTitle(e.target.value)} id="blog-title" placeholder="name@example.com" required />
                    <label htmlFor="blog-title">Enter Blog Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select className="form-select" id="blog-category" required onChange={e => setCategory(e.target.value)}>
                      <option defaultValue>-- Select Category --</option>
                      {categories?.map((category, key) => {
                        return (
                          category.slug != 'other' && <option key={key} value={category.name}>{category.name}</option>                          
                        )
                      })}
                      <option value="">Other</option>
                    </select>
                    <label htmlFor="blog-category">Select Category</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea type="text" style={{ height: '110px' }} autoComplete="off" className="form-control" onChange={e => setExcerpt(e.target.value)} id="blog-excerpt" placeholder="name@example.com" />
                    <label htmlFor="blog-excerpt">Enter Blog Excerpt (Optional)</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    {imageURL
                      ? <img src={imageURL} className="img-fluid mb-3" style={{ height: '182px', width: "100%", backgroundColor: '#d4d4d4', objectFit: "contain", objectPosition: 'center' }} alt="" id="file-ip-1-preview" />
                      : <div className="mb-3" style={{ height: "182px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: '#d4d4d4' }}>Image Priview</div>}
                    <input type="file" onChange={fileChangeHandler} className="form-control" id="blog-title" required />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-floating mb-3">
                    <ReactQuill theme="snow" modules={modules} value={text} onChange={setText} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
          : <p>Please <Link to="/login">Login</Link> first to post a blog</p>}
      </div>
    </div>
  )
}