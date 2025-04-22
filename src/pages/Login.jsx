import './Login.css'
import React, { useState } from 'react';
import DogImage from '../assets/dogs.png'
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/Dogs';

function Login({ onLogin }) {
  const [name, setName] = useState('');       // Local state for form input: name
  const [email, setEmail] = useState('');       // Local state for form input: email
  const navigate = useNavigate();

   // Called when the user submits the form.
  const handleSubmit = async e => {
    e.preventDefault();       
    await loginApi(name, email);        // Hits the login API endpoint with name & email.
    localStorage.setItem('token', 'logged-in');        // Store a simple token so we remember they’re logged in.
    onLogin();        // Tell parent component we’re now logged in.
    navigate('/search');        // Navigate into the app’s main search page (Search Page).
  };


  return (
    <>
      <div className="login-page">
        {/* LEFT: the sign‑in form */}
        <div className="form-container">
          <div className="form-box">
            <h1 className='login-header'>Sign In & Sniff Out Your Paw-fect Companion!</h1>
            <form onSubmit={handleSubmit} className="login-form">
              {/* Name input field */}
              <label>
                <input
                  placeholder='Name...'
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
              {/* Email input field */}
              <label>
                <input
                  placeholder='example@email.com'
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </label>
              {/* Submit button */}
              <button type="submit">Log In</button>
            </form>
          </div>
        </div>

        {/* RIGHT: decorative illustration of a pack of dogs*/}
        <div className="image-container">
          <img src={DogImage} alt="Happy dogs" />
        </div>
      </div>
    </>
  );
}

export default Login;