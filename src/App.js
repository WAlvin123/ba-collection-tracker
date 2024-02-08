import './App.css';
import { Navbar } from './components/Navbar';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Search } from './components/pages/Search';
import { Collection } from './components/pages/Collection';

// TODO: Search page

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Collection/>}/>
          <Route path={'/search'} element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;