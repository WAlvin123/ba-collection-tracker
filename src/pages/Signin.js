import { useState } from 'react'
import './Signin.css'
import { auth } from '../config/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="signin">
      <p>Sign in below</p>
      <div className='banner-search-container'>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Email</p>
          <input
            onChange={(event) => {
              setEmail(event.target.value)
            }} value={email} />
          <p>Password</p>
          <input
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            value={password} />
          <h1></h1>
          <button
            onClick={() => {
              handleRegister()
            }}
            className='search-button'
          >Sign in</button>
        </form>
      </div>
    </div>
  )
}