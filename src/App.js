import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import newCharacters from './resources/characters';


function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120').then((res) => {
      const adjusted = res.data.data.map(character => {
        return { ...character, clicked: false }
      })
      setCharacters([...adjusted, ...newCharacters])
    })
  }, [])

  const handleClick = (id) => {
    setCharacters(prevCharacters => {
      const updatedCharacters = prevCharacters.map(character => {
        if (id == character._id) {
          return { ...character, clicked: !character.clicked }
        } else {
          return character
        }
      })
      return updatedCharacters
    })
  }

  return (
    <div className="App">
      <div className='characters-container'>
        {characters.map(character => {
          return (
            <div>
              <button
                className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                onClick={() => { handleClick(character._id) }}
              >
                <img src={character.photoUrl} width={'120vw'} />
              </button>
              <p className='character-name'>{character.name}</p>
            </div>
          )
        })}
      </div>
      <p>API: https://api-blue-archive.vercel.app/</p>
    </div>
  );
}

export default App;
