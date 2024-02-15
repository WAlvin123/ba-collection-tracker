import './App.css';
import { Navbar } from './components/Navbar';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Search } from './pages/Search';
import { Collection } from './pages/Collection';
import { Banners } from './pages/Banners';

// TODO: Search page

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Collection />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/banners'} element={<Banners />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;