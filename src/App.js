import './App.css';
import { Navbar } from './components/Navbar';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Search } from './pages/Search';
import { Collection } from './pages/Collection';
import { Banners } from './pages/Banners';
import { Planner } from './pages/Planner';
import { Register } from './pages/Register';
import { Signin } from './pages/Signin';

// TODO: Search page

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Collection />} />
          <Route path={'/profiles'} element={<Search />} />
          <Route path={'/banners'} element={<Banners />} />
          <Route path={'/planner'} element={<Planner />} />
          <Route path={'/signin'} element={<Signin/>} />
          <Route path={'/register'} element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;