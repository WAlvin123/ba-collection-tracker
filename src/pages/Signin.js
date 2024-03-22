import { useState } from 'react'
import './Signin.css'
import { auth } from '../config/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { flushSync } from 'react-dom'

export const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, `${username}@mail.com`, password)
      navigate('/')
      localStorage.setItem('page', 'collection')

    } catch (error) {
      switch (error.code) {
        case 'auth/missing-password':
          setErrorMessage('Username or password is invalid');
          break;
        case 'auth/invalid-credential':
          setErrorMessage('Username or password is invalid');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Username does not exist')
          break;
      }
      console.log(error)
    }
  }

  return (
    <div className="signin">
      <div className='register-container'>
        <p className='register-prompt'>Username</p>
        <input
          onChange={(event) => {
            setUsername(event.target.value)
          }}
          value={username}
          className='register-value'
        />
        <p className='register-prompt'>Password</p>
        <input
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          value={password}
          type='password'
          className='register-value'
        />
        <h1></h1>

        <button
          onClick={() => {
            handleSignin()
          }}
          className='search-button'
        >Sign in</button>
        <p>{errorMessage}</p>
        <p style={{ fontSize: 'large' }}>Don't have an account? Register <button className='signin-link'
          onClick={() => {
             navigate('/register')
            localStorage.setItem('page', 'register')
            }}
        >here</button></p>
      </div>

    </div>
  )
}