import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpComponent from "../components/SignUpComponent";
import OTPComponent from "../components/OTPComponent";

export default function SignUpPage({ isLoggedIn, setLoggedIn }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isProcessing, setProcessing] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up"
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  const signUpHandle = e => {
    e.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data.err) {
          alert(data.err);
        } else {
          setProcessing(true);
        }
      })
  }
  return (
    <>
      {!isProcessing
        ? <SignUpComponent signUpHandle={signUpHandle} setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} />
        : <OTPComponent email={email} setProcessing={setProcessing} setLoggedIn={setLoggedIn} />
      }
    </>
  )
}