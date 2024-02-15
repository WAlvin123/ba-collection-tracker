import axios from "axios"
import { useState, useEffect } from "react"
import './Search.css'

export const Search = () => {
  useEffect(() => {
    const storedCharacters = localStorage.getItem('characters')
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters))
    } else {
      console.log('How are you here?')
    }
  }, [])

  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [userInput, setUserInput] = useState('')

  const onSearch = (name) => {
    setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(name)))
    setUserInput('')
  }

  const handleClick = (id) => {
    setFilteredCharacters(prevCharacters => {
      const updatedCharacters = prevCharacters.map(character => {
        if (id == character._id) {
          return { ...character, clicked: !character.clicked }
        } else {
          return character
        }
      })
      return updatedCharacters
    })
    setCharacters(prevCharacters => {
      const updatedCharacters = prevCharacters.map(character => {
        if (id == character._id) {
          return { ...character, clicked: !character.clicked }
        } else {
          return character
        }
      })
      localStorage.setItem('characters', JSON.stringify(updatedCharacters))
      return updatedCharacters
    })
  }

  return (
    <div className="Search">
      <p className="text">
        Enter the name of the character below to search for them
      </p>
      <input
        value={userInput}
        onChange={(event) => {
          setUserInput(event.target.value)
          console.log(userInput)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch(userInput.toLowerCase())
          }
        }}
        className="search-input"
      />
      <button
        onClick={() => {
          onSearch(userInput.toLowerCase())
        }}
        className="search-button"
      >
        Search
      </button>
      <div className="characters-container">
        {(
          filteredCharacters.map(character => {
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
          }))}
      </div>
    </div>
  )
}