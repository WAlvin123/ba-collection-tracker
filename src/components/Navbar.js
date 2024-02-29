import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { auth } from '../config/firestore'
import { signOut } from 'firebase/auth'
import { useCharacter } from '../Custom hooks/useCharacter'

export const Navbar = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState('')

  useEffect(() => {
    setPage(localStorage.getItem('page'))
  })

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
      localStorage.setItem('page', 'collection')
    })
  }

  return (
    <div className='navbar'>
      <h1 className='title-2'>
        Your<span className='title'>Archive</span>
      </h1>
      <div className='links'>
        <button className={page === 'collection' ? 'navbar-button-clicked' : 'navbar-button'}
          onClick={() => {
            navigate('/')
            localStorage.setItem('page', 'collection')
          }}>
          Collection
        </button>
        <button className={page === 'profiles' ? 'navbar-button-clicked' : 'navbar-button'}
          onClick={() => {
            navigate('/profiles')
            localStorage.setItem('page', 'profiles')
          }}>
          Profiles
        </button>
        <button className={page === 'banners' ? 'navbar-button-clicked' : 'navbar-button'}
          onClick={() => {
            navigate('/banners')
            localStorage.setItem('page', 'banners')
          }}>
          Banners
        </button>
        <button className={page === 'planner' ? 'navbar-button-clicked' : 'navbar-button'}
          onClick={() => {
            navigate('/planner')
            localStorage.setItem('page', 'planner')
          }}>
          Planner
        </button>

        {auth.currentUser == null && (
          <button className={page === 'signin' ? 'navbar-button-clicked' : 'navbar-button'}
            onClick={() => {
              navigate('/signin')
              localStorage.setItem('page', 'signin')
            }}>
            Sign in
          </button>
        )}

        {auth.currentUser == null && (
          <button className={page === 'register' ? 'navbar-button-clicked' : 'navbar-button'}
            onClick={() => {
              navigate('/register')
              localStorage.setItem('page', 'register')
            }}>
            Register
          </button>
        )}


        {auth.currentUser !== null && (
          <button className='navbar-button' onClick={() => {
            handleSignOut()
          }}>Sign out</button>
        )}
      </div>
    </div>
  )
}