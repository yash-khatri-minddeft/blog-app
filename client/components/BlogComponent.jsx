import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from 'html-react-parser';


export default function BlogComponent({ username }) {
  const { blogSlug } = useParams();
  const [blogDetails, setBlogDetails] = useState();
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
      })
  }, [])
  document.title = blogDetails?.title
  return (
    <>
      <section className="blog-details text-center py-5">
        <div className="container">
          {blogDetails ?
            <>
              <div className="blog-image">
                <img src={'..' + blogDetails.image} alt="" className="img-fluid" />
              </div>
              <h2>{blogDetails.title}</h2>
              <div className="blog-content">
                {parse(blogDetails.text)}
              </div>
              {blogDetails.author == username && <Link to={`/edit/${blogSlug}`}>Edit Page</Link>}
            </>
            : <div className="container">Error 404, page not found</div>}
        </div>
      </section>
    </>
  )
}