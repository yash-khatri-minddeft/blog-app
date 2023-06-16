import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent({setEmail,setProcessing}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const loginHandle = e => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data.err) {
          alert(data.err)
        } else {
          setEmail(data.email);
          setProcessing(true);
        }
      })
  }
  return (
    <div className="form-page" >
      <div className="contianer">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={loginHandle} className="form">
              <div className="title">Welcome</div>
              <div className="subtitle">Please Login with details!</div>
              <div className="input-container">
                <input id="username" className="input" type="username" onChange={e => { setUsername(e.target.value) }} placeholder=" " required />
                <div className="cut"></div>
                <label htmlFor="username" className="form-placeholder">Username</label>
              </div>
              <div className="input-container">
                <input id="password" className="input" type="password" onChange={e => { setPassword(e.target.value) }} placeholder=" " required />
                <div className="cut"></div>
                <label htmlFor="password" className="form-placeholder">Password</label>
              </div>
              <button type="text" className="btn btn-primary d-block mt-5 w-100">Submit</button>
              <p className="text-center text-white mt-4 mb-0">Don't have an account? <Link to='/signup'>Click here to create One</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}