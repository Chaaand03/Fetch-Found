import './Login.css'
import React, { useState } from 'react';
import DogImage from '../assets/dogs.png'
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/Dogs'; 

function Login( { onLogin } ) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginApi(name, email);
        localStorage.setItem('token', 'logged-in');
        onLogin(); 
        navigate('/search');
      };


  return (
    <>
    <div className="login-page">

      <div className="form-container">
      {/* <div className='intro-text'>
        <h1>Sign In & Sniff Out Your Perfect Companion</h1>
      </div> */}
        <div className="form-box">
          <h1 className='login-header'>Sign In & Sniff Out Your Perfect Companion!</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <input
                placeholder='Name...'
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder='example@email.com'
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>


      <div className="image-container">
        <img src={DogImage} alt="Happy dogs" />
      </div>
    </div>
    </>
  );
}

export default Login;

