import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import "../styles/Auth.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
    const { setIsAuth } = props;

    const signInWithGoogle = async () => {
        try {
       const result = await signInWithPopup(auth, provider);
       cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);   
       console.log(result);
        } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth-container">
      <p className="auth-logo" />
      <h1 className="auth-title">Welcome to TalkHub</h1>
      <p className="auth-description">
        Sign in with your Google account to continue and join the conversation.
      </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};
