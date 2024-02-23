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

    localStorage.setItem('page', 'profiles')
  }, [])

  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentProfile, setCurrentProfile] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [visible, setVisible] = useState(false)

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
      <h1></h1>
      {showAll === true && (
        <div className="banner-search-container">
          <p className="search-prompt">
            Search a name and click an icon to view more details about the unit
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
            placeholder='e.g. Saori...'
          />
          <button
            onClick={() => {
              onSearch(userInput.toLowerCase())
            }}
            className="search-button"
          >
            Search
          </button>
        </div>
      )}
      <h1></h1>
      {filteredCharacters.length > 0 && showAll === true && (
        <div className="centered-container">

          <div className="characters-container">

            {showAll === true && (
              filteredCharacters.map(character => {
                return (
                  <div>
                    <button
                      className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                      onClick={() => { handleClick(character.name) }}
                    >
                      <img src={character.photoUrl} className="collection-character-image" />
                    </button>
                    <p className='character-name'>{character.name}</p>
                  </div>
                )
              }))}
          </div>
        </div>
      )}

      {currentProfile !== null && showAll === false && (
        <div>
          <button className='search-button' onClick={() => {
            setShowAll(true)
            setVisible(false)
          }}>Return</button>
          <h1></h1>
          <div>
            <div>
              <p>Memolobby:</p>
              {visible === true && (<img src={currentProfile.image.lobby} width={'300vw'}></img>)}
              <button
                onClick={() => {
                  setVisible(!visible)
                }}
                className="navbar-button"
              >Click to view Memolobby</button>
            </div>
            <p style={{ paddingTop: '20px' }}>Name: {currentProfile.character.name}</p>
            <p>School: {currentProfile.info.school}</p>
            <p>Club: {currentProfile.info.club}</p>
            <p>Base Star: {currentProfile.character.baseStar}</p>
            <p>Armor Type: {currentProfile.character.armorType}</p>
            <p>Damage Type: {currentProfile.character.bulletType}</p>
            <p>Squad: {currentProfile.character.squadType}</p>
            <p>Role: {currentProfile.character.role}</p>
            <div className="centered-container">
              <p className="profile-text">Profile: {currentProfile.character.profile}</p>
            </div>
            <div className='centered-container'>
              <table>
                <th>Street mood</th>
                <th>Outdoor mood</th>
                <th>Indoor mood</th>
                <tr>
                  <td> {currentProfile.stat.streetMood}</td>
                  <td> {currentProfile.stat.outdoorMood}</td>
                  <td> {currentProfile.stat.indoorMood}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="centered-container">
        <p className="citation">API: https://api.ennead.cc/buruaka/character/ </p>
      </div>
      <div className="centered-container">
        <p className="citation">Memolobby icons: https://bluearchive.wiki/wiki/Memorial_Lobby</p>
      </div>
    </div>
  )
}