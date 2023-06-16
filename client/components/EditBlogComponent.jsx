import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom"

export default function EditBlogComponent({ username }) {
  const navigate = useNavigate();
  const { blogSlug } = useParams();
  const [blogDetails, setBlogDetails] = useState();
  const [imageURL, setImageURL] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [excerpt, setExcerpt] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetch('/api/get-blog-details', {
      method: 'POST',
      body: JSON.stringify({
        slug: blogSlug
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setBlogDetails(data.blog)

        setImageURL(data.blog.image)
        setTitle(data.blog.title)
        setText(data.blog.text)
        setExcerpt(data.blog.excerpt)
        setCategory(data.blog.category)
      })

    // fetching category
    fetch('/api/get-categories', {
      method: 'GET',
    }).then(res => res.json())
      .then(data => {
        setCategories(data.categories)
      })
  },[])
  const editBlog = e => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('text', text);
    formData.append('image', image);
    formData.append('excerpt', excerpt);
    formData.append('slug', blogSlug);
    fetch('/api/edit-blog', {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        alert(data.msg)
        document.forms[0].reset()
        setImageURL('')
        navigate(`/blog/${blogSlug}`)
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
    <div className="edit-blog py-5">
      <div className="container">
        {blogDetails ?
          <>
            {blogDetails.author == username ?
              <div className="edit-blog-form">
                <form onSubmit={editBlog}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" autoFocus autoComplete="off" defaultValue={title} onChange={e => setTitle(e.target.value)} id="blog-title" placeholder="name@example.com" required />
                        <label htmlFor="blog-title">Enter Blog Title</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select className="form-select" id="blog-category" value={category} required onChange={e => setCategory(e.target.value)}>
                          <option>-- Select Category --</option>
                          {categories?.map((category, key) => {
                            return (
                              category.slug != 'other' && <option key={key} value={category.name}>{category.name}</option>
                            )
                          })}
                          <option value="Other">Other</option>
                        </select>
                        <label htmlFor="blog-category">Select Category</label>
                      </div>
                      <div className="form-floating mb-3">
                        <textarea type="text" style={{ height: '110px' }} autoComplete="off" className="form-control" defaultValue={excerpt} onChange={e => setExcerpt(e.target.value)} id="blog-excerpt" placeholder="name@example.com" />
                        <label htmlFor="blog-excerpt">Enter Blog Excerpt (Optional)</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        {imageURL
                          ? <img src={imageURL} className="img-fluid mb-3" style={{ height: '182px', width: "100%", backgroundColor: '#d4d4d4', objectFit: "contain", objectPosition: 'center' }} alt="" id="file-ip-1-preview" />
                          : <div className="mb-3" style={{ height: "182px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: '#d4d4d4' }}>Image Priview</div>}
                        <input type="file" onChange={fileChangeHandler} className="form-control" id="blog-title" />
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
              </div> :
              <div className="container">Error 404, page not found</div>}</>
          : <div className="container">Error 404, page not found</div>}
      </div>
    </div>
  )
}