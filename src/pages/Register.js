import { useEffect, useState } from 'react'
import './Register.css'
import { auth, db, } from '../config/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import newCharacters from '../resources/characters'

export const Register = () => {
  useEffect(() => {
    fetch('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const allCharacters = [...data.data, ...newCharacters].sort((a, b) => a.name.localeCompare(b.name))
        setCharacters(allCharacters.map(character => {
          return { ...character, clicked: false }
        }))
      })
  }, [])

  const [characters, setCharacters] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, `${username}@mail.com`, password)
        setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s characters`), {
          characters: characters
        })
        setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s planned banners`), {
          plannedBanners: []
        })
        navigate('/')
        localStorage.setItem('page', 'collection')
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('Username already in use');
            break;
          case 'auth/weak-password':
            setErrorMessage('Password must atleast be 6 characters long');
            break;
        }
        console.log(error)
      }
    } else {
      setErrorMessage('Passwords do not match')
    }
  }

  return (
    <div className="register">
      <p>Create an account to sync your data across multiple devices</p>
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
        <p className='register-prompt'>Confirm Password</p>
        <input
          onChange={(event) => {
            setConfirmPassword(event.target.value)
          }}
          value={confirmPassword}
          type='password'
          className='register-value'

        />
        <h1></h1>
        <p className='register-error'>{errorMessage}</p>
        <button
          onClick={() => {
            handleRegister()
          }}
          className='search-button'
        >Register</button>
      </div>
    </div>
  )
}