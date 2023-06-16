import { Link } from "react-router-dom"

export default function SignUpComponent({signUpHandle, setEmail, setUsername, setPassword}) {
  return (
    <>
    <div className="form-page">
      <div className="contianer">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={signUpHandle} className="form">
              <div className="title">Welcome</div>
              <div className="subtitle">Please Sign Up with details!</div>
              <div className="input-container">
                <input id="email" className="input" type="email" onChange={e => {setEmail(e.target.value)}} placeholder=" " required />
                <div className="cut cut-short"></div>
                <label htmlFor="email" className="form-placeholder">Email</label>
              </div>
              <div className="input-container">
                <input id="username" className="input" type="text" onChange={e => {setUsername(e.target.value)}} placeholder=" " required />
                <div className="cut"></div>
                <label htmlFor="username" className="form-placeholder">Username</label>
              </div>
              <div className="input-container">
                <input id="password" className="input" type="password" onChange={e => {setPassword(e.target.value)}} placeholder=" " required />
                <div className="cut"></div>
                <label htmlFor="password" className="form-placeholder">Password</label>
              </div>
              <button type="text" className="btn btn-primary d-block mt-5 w-100">Submit</button>
              <p className="text-center text-white mt-4 mb-0">already have an account? <Link to='/login'>Click here to Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div></>
  )
}