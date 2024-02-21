import { useState, useEffect } from "react"
import './Search.css'
import Profiles from "../resources/Profiles"

export const Search = () => {
  useEffect(() => {
    const storedCharacters = localStorage.getItem('characters')
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters).map(character => {
        return { ...character, clicked: false }
      }))
    } else {
      console.log('How are you here?')
    }
    console.log(currentProfile)
  }, [])

  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentProfile, setCurrentProfile] = useState(null)
  const [showAll, setShowAll] = useState(true)

  const onSearch = (name) => {
    setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(name)))
    setUserInput('')
  }

  const handleClick = (name) => {
    fetch(`https://api.ennead.cc/buruaka/character/${name}`)
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(data => {
              setCurrentProfile(data)
            })
        } else if (Profiles.map(profile => { return profile.character.name }).includes(name)) {
          const indexOfProfile = Profiles.findIndex(profile => profile.character.name === name)
          setCurrentProfile(Profiles[indexOfProfile])
        } else {
          console.log('This character does not currently exist')
        }
      })
    setShowAll(false)
  }

  return (
    <div className="Search">
      {showAll === true && (<>
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
      </>)}

      <div className="characters-container">
        {showAll === true && (
          filteredCharacters.map(character => {
            return (
              <div>
                <button
                  className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                  onClick={() => { handleClick(character.name) }}
                >
                  <img src={character.photoUrl} width={'120vw'} />
                </button>
                <p className='character-name'>{character.name}</p>
              </div>
            )
          }))}
      </div>

      {currentProfile !== null && showAll === false && (
        <div>
          <button className='search-button' onClick={() => {
            setShowAll(true)
          }}>Return</button>
          <h1></h1>
          <div>
            <p>Memolobby:</p>
            <img src={currentProfile.image.lobby} width={'300vw'}></img>
            <p>Name: {currentProfile.character.name}</p>
            <p>School: {currentProfile.info.school}</p>
            <p>Club: {currentProfile.info.club}</p>
            <p>Base Star: {currentProfile.character.baseStar}</p>
            <p>Armor Type: {currentProfile.character.armorType}</p>
            <p>Damage Type: {currentProfile.character.bulletType}</p>
            <p>Squad: {currentProfile.character.squadType}</p>
            <p>Role: {currentProfile.character.role}</p>
            <p>Profile: {currentProfile.character.profile}</p>
            <table>
              <th>Moods</th>
              <tr>
                <td>Street: {currentProfile.stat.streetMood}</td>
                <td>Outdoor: {currentProfile.stat.outdoorMood}</td>
                <td>Indoor: {currentProfile.stat.indoorMood}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
      <h2>API: https://api.ennead.cc/buruaka/character/ </h2>
      <h2>Memolobby icons: https://bluearchive.wiki/wiki/Main_Page </h2>
    </div>
  )
}