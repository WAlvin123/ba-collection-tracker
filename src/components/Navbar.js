import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { auth } from '../config/firestore'

export const Navbar = ({ loggedin, setLoggedin, page, setPage, handleSignOut, visibleConfirmation, setVisibleConfirmation }) => {
  const navigate = useNavigate()


  useEffect(() => {
    setPage(localStorage.getItem('page'))
  })

  useEffect(() => {
    if (auth.currentUser === null) {
      setLoggedin(false)
    } else {
      setLoggedin(true)
    }
  })




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
            navigate('/search')
            localStorage.setItem('page', 'profiles')
          }}>
          Search
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

        {loggedin === false && (
          <button className={page === 'signin' ? 'navbar-button-clicked' : 'navbar-button'}
            onClick={() => {
              navigate('/signin')
              localStorage.setItem('page', 'signin')
            }}>
            Login
          </button>
        )}

        {loggedin === false && (
          <button className={page === 'register' ? 'navbar-button-clicked' : 'navbar-button'}
            onClick={() => {
              navigate('/register')
              localStorage.setItem('page', 'register')
            }}>
            Register
          </button>
        )}

        {loggedin !== false && (
          <button className={page === 'profile' ? 'navbar-button-clicked' : 'navbar-button'}
          onClick={() => {
            navigate('/profile')
            localStorage.setItem('page', 'profile')
          }}
          >
            Profile
          </button>
        )}

        {loggedin !== false && (
          <button className='navbar-button' onClick={() => {
            setVisibleConfirmation(true)
          }}>Sign out</button>
        )}
      </div>
    </div>
  )
}