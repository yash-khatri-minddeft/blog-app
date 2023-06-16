import { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { useNavigate } from "react-router-dom";
import OTPComponent from "../components/OTPComponent";

export default function LoginPage({ isLoggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const [isProcessing, setProcessing] = useState(false);
  const [email, setEmail] = useState();
  useEffect(() => {
    document.title = 'Login';
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])
  return (
    <>
      {!isProcessing
        ? <LoginComponent setEmail={setEmail} setProcessing={setProcessing} />
        : <OTPComponent email={email} setProcessing={setProcessing} setLoggedIn={setLoggedIn} />
      }
    </>
  )
}