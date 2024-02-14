import './App.css';
import { Navbar } from './components/Navbar';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Search } from './components/pages/Search';
import { Collection } from './components/pages/Collection';
import { Banners } from './components/pages/Banners';
import { Raids } from './components/pages/Raids';
import { Citations } from './components/pages/Citations';

// TODO: Search page

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Collection/>}/>
          <Route path={'/search'} element={<Search />} />
          <Route path={'/banners'} element={<Banners/>}/>
          <Route path={'/raids'} element={<Raids/>}/>
          <Route path={'/sources'} element={<Citations/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;