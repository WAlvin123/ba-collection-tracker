import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <h1 className='text-2'>
        Your<span className='text'>Archive</span>
      </h1>
      <button className='search' onClick={() => {
        localStorage.setItem('Page', 'Collection')
        navigate('/')
        }}>
        Collection
      </button>
      <button className='search' onClick={() => {
        localStorage.setItem('Page', 'Search')
        navigate('/search')
        }}>
        Search
      </button>
    </div>
  )
}