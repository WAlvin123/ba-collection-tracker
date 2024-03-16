import './App.css';
import { Navbar } from './components/Navbar';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Search } from './pages/Search';
import { Collection } from './pages/Collection';
import { Banners } from './pages/Banners';
import { Planner } from './pages/Planner';
import { Register } from './pages/Register';
import { Signin } from './pages/Signin';
import { SignoutConfirmation } from './components/SignoutConfirmation';
import { useState } from 'react';
import { auth } from './config/firestore';
import { signOut } from 'firebase/auth';
import { Profile } from './pages/Profile';


function App() {
  const [visibleConfirmation, setVisibleConfirmation] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
  const [page, setPage] = useState('')

  const handleSignOut = () => {
    signOut(auth)
    setVisibleConfirmation(false)
    window.location.reload()
  }



  return (
    <div className="App">
      <Router>
        <SignoutConfirmation
          visibleConfirmation={visibleConfirmation}
          setVisibleConfirmation={setVisibleConfirmation}
          handleSignOut={handleSignOut}
        />
        <Navbar
          visibleConfirmation={visibleConfirmation}
          setVisibleConfirmation={setVisibleConfirmation}
          loggedin={loggedin}
          setLoggedin={setLoggedin}
          handleSignOut={handleSignOut}
          page={page}
          setPage={setPage}
        />

        <Routes>
          <Route path={'/'} element={<Collection />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/banners'} element={<Banners />} />
          <Route path={'/planner'} element={<Planner />} />
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/profile'} element={<Profile/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;

