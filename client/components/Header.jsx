import { Link, NavLink, Navigate, useNavigate } from "react-router-dom"

export default function Header({ setLoggedIn, isLoggedIn, isAdmin, username }) {
  const navigate = useNavigate();
  const logOutHandle = () => {
    fetch('/api/logout', {
      method: 'POST'
    }).then(res => res.json())
      .then(data => {
        setLoggedIn(false)
        navigate('/login')
      })
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav flex-grow-1">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/add-blog">Add Blog</NavLink>
            {isAdmin && <NavLink className="nav-link" to="/add-category">Add Category</NavLink>}
            <div className="header-right ms-lg-auto d-flex align-items-center">
              {isLoggedIn
                ? <><span className="me-3 text-white">Hello, {username}</span><button className="btn btn-danger" onClick={logOutHandle}>Logout</button></>
                : <><Link className="btn btn-success" to="/login">Login</Link>
                  <Link className="btn btn-warning ms-2" to="/signup">Signup</Link></>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}