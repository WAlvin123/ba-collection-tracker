import { signOut } from 'firebase/auth'
import './SignoutConfirmation.css'
import { auth } from '../config/firestore'
import { useNavigate } from 'react-router-dom'

export const SignoutConfirmation = ({ handleSignOut, visibleConfirmation, setVisibleConfirmation }) => {
  const navigate = useNavigate()


  return (
    <div>
      {visibleConfirmation === true && (<div className="confirmation-background">
        <div className="confirmation-container">
          <p className='text-2'>Are you sure you woud like to Logout?</p>
          <button className='search-button' onClick={() => {
            handleSignOut()
            navigate('/')
          }}>Yes</button>
          <button className='search-button'
            onClick={() => {
              setVisibleConfirmation(false)
            }}
          >No</button>
        </div>
      </div>)}
    </div>
  )
}

