import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <h1 className='text-2'>
        Your<span className='text'>Archive</span>
      </h1>
      <button className='navbar-button' onClick={() => {
        navigate('/')
      }}>
        Collection
      </button>
      <button className='navbar-button' onClick={() => {
        navigate('/search')
      }}>
        Search
      </button>
      <button className='navbar-button' onClick={() => {
        navigate('/banners')
      }}>
        Banners
      </button>
    </div>
  )
}