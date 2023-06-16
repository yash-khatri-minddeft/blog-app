import { Link } from 'react-router-dom';

export default function BlogCard({ blogs }) {
  return (
    blogs?.map((blog, key) => {
      const date = new Date(blog.time).toLocaleString('en-us', { day: '2-digit' });
      const month = new Date(blog.time).toLocaleString('en-us', { month: 'short' });
      const year = new Date(blog.time).toLocaleString('en-us', { year: '2-digit' });
      var blogText;
      const regex = /(<([^>]+)>)/gi;
      if (blog.excerpt && /\S/.test(blog.excerpt)) {
        blogText = blog.excerpt;
      } else {
        blogText = blog.text.replace(regex, "");
      }
      return (
        <div className="col-xl-4 col-lg-6 col-md-12" key={key}>
          <article className="blog-card">
            <div className="blog-card__background">
              <div className="card__background--wrapper">
                <Link to={"/blog/" + blog.slug}>
                  <div className="card__background--main" style={{ backgroundImage: `url(${blog.image})` }}>
                    <div className="card__background--layer"></div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="blog-card__head">
              <span className="date__box">
                <span className="date__day">{date}</span>
                <span className="date__month">{month}</span>
                <span className="date__month">'{year}</span>
              </span>
            </div>
            <div className="blog-card__info">
              <Link to={"/blog/" + blog.slug}><h5>{blog.title}</h5></Link>
              <p className="icon-links">
                <Link to={`/user/${blog.author}`} className="icon-link me-3"><i className="fa fa-user me-2"></i> {blog.author}</Link>
                <Link to={`/category/${blog.categorySlug}`} className="icon-link"><i className="fa fa-tag me-2"></i> {blog.category}</Link>
              </p>
              <p className="blog-text">{blogText}</p>
              <Link to={"/blog/" + blog.slug} className="blog-btn btn--with-icon"><i className="btn-icon fa fa-long-arrow-alt-right"></i>READ MORE</Link>
            </div>
          </article>
        </div>
      )
    })
  )
}
