import React,  { useEffect, useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logInWithEmail } from "../firebase-config";
// import { signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      console.log("loading")
      return;
    }
    else if (user) navigate("/admin")
  }, [user, loading]);
  
  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="loginPage">
      <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
    </div>
  );
}

export default Login;
