import {Link} from 'react-router-dom'
import React from 'react'

const Login = () => {
    const handleAuth=() => {
        window.open("http://localhost:5000/auth/google/callback","_self")
    }
  return (
    <div>
        <h1>Login form</h1>
        <button onClick={handleAuth}>
            <span>sign in with Google</span>
        </button>        
    </div>
  )
}

export default Login