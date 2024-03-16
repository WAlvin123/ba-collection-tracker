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
          <p className='text-2'>Are you sure you would like to logout?</p>
          <div className='centered-container'>
          <button className='confirmation-button' 
          onClick={() => {
            handleSignOut()
            navigate('/')
          }}>Yes</button>
          <button className='confirmation-button'
            onClick={() => {
              setVisibleConfirmation(false)
            }}
          >No</button>
          </div>
        </div>
      </div>)}
    </div>
  )
}

