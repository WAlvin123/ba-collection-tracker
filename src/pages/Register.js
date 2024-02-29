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
        const allCharacters = [...data.data, ...newCharacters]
        setCharacters(allCharacters.map(character => {
          return { ...character, clicked: false }
        }))
      })
  }, [])

  const [characters, setCharacters] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s data`), {
        characters: characters,
        plannedBanners: []
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register">
      <p>Create an account to sync your data across multiple devices</p>
      <div className='banner-search-container'>
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
        >Register</button>
      </div>
    </div>
  )
}