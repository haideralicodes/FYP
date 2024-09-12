import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './SignupOptions.css'

function SignupOptions() {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Signup Failed');
    },
  });

  return (
    <div className='signupOptionBox'>
      <div className="signupBox">
        <h1>Join Business Buddy</h1>
        <div className="signupOptions">
          <button onClick={googleLogin} className="custom-google-button">
            Sign up with Google
          </button>
          <button className='signupEmail'>Sign up with email</button>
        </div>
        <h4>Already </h4>
      </div>
    </div>
  )
}

export default SignupOptions;
