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
                    <p className='character-name-unclicked'>{character.name}</p>
                  </div>
                )
              }))}
          </div>
        </div>
      )}

      {showAll == false && filteredCharacters.length === 0 && (
        <p className='text'>No results found...</p>
      )}

      {showAll === false && (
        <button className='search-button' onClick={() => {
          setShowAll(true)
          setVisible(false)
        }}>Return</button>
      )}

      <h1></h1>

      {currentProfile !== null && showAll === false && (
        <div className="centered-container">
          <div className="profile-container">
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <p></p>
              <div className="centered-container">
                {visible === true && (<img src={currentProfile.image.lobby} width={'150vw'}></img>)}
              </div>
              <button
                onClick={() => {
                  setVisible(!visible)
                }}
                className="profile-button"
              >Click to view Memolobby preview
              </button>
            </div>
            <p style={{ paddingTop: '20px', color: 'rgb(68, 129, 195)' }}>Name: {currentProfile.character.name}</p>
            <p className="profile-text">School:
              {currentProfile.info.school}
              {currentProfile.info.school == 'Gehenna' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/b/bd/Gehenna.png/50px-Gehenna.png'></img>)}
              {currentProfile.info.school == 'Abydos' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/91/Abydos.png/50px-Abydos.png'></img>)}
              {currentProfile.info.school == 'Arius' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/93/Arius.png/50px-Arius.png'></img>)}
              {currentProfile.info.school == 'Trinity' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/9c/Trinity.png/50px-Trinity.png'></img>)}
              {currentProfile.info.school == 'Millennium' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/2/2a/Millennium.png/50px-Millennium.png'></img>)}
              {currentProfile.info.school == 'SRT' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/5/5a/SRT.png/50px-SRT.png'></img>)}
              {currentProfile.info.school == 'Valkyrie' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/d/d5/Valkyrie.png/50px-Valkyrie.png'></img>)}
              {currentProfile.info.school == 'Shanhaijing' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/b/be/Shanhaijing.png/50px-Shanhaijing.png'></img>)}
              {currentProfile.info.school == 'Hyakkiyako' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/3/36/Hyakkiyako.png/50px-Hyakkiyako.png'></img>)}
              {(currentProfile.info.school == 'RedWinter' || currentProfile.info.school == 'Red Winter') && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/8/8b/Red_Winter.png/50px-Red_Winter.png'></img>)}
            </p>
            <p className="profile-text">Club:
              {currentProfile.info.club}
            </p>
            <p className="profile-text">Base Star: {currentProfile.character.baseStar}</p>
            <p className="profile-text">Armor Type: {currentProfile.character.armorType}</p>
            <p className="profile-text">Damage Type: {currentProfile.character.bulletType}</p>
            <p className="profile-text">Squad: {currentProfile.character.squadType}</p>
            <p className="profile-text">Role: {currentProfile.character.role}</p>
            <div className="centered-container">
              <p className="profile-text">Profile: {currentProfile.character.profile}</p>
            </div>
            <div className='centered-container'>
              <table>
                <th className="profile-text">Street mood</th>
                <th className="profile-text">Outdoor mood</th>
                <th className="profile-text">Indoor mood</th>
                <tr>
                  <td className="profile-text">
                    {currentProfile.stat.streetMood === 'S' && (<p>S</p>)}
                    {currentProfile.stat.streetMood === 'A' && (<p>A</p>)}
                    {currentProfile.stat.streetMood === 'B' && (<p>B</p>)}
                    {currentProfile.stat.streetMood === 'C' && (<p>C</p>)}
                    {currentProfile.stat.streetMood === 'D' && (<p>D</p>)}
                  </td>
                  <td className="profile-text">
                    {currentProfile.stat.outdoorMood === 'S' && (<p>S</p>)}
                    {currentProfile.stat.outdoorMood === 'A' && (<p>A</p>)}
                    {currentProfile.stat.outdoorMood === 'B' && (<p>B</p>)}
                    {currentProfile.stat.outdoorMood === 'C' && (<p>C</p>)}
                    {currentProfile.stat.outdoorMood === 'D' && (<p>D</p>)}
                  </td>
                  <td className="profile-text">
                    {currentProfile.stat.indoorMood === 'S' && (<p>S</p>)}
                    {currentProfile.stat.indoorMood === 'A' && (<p>A</p>)}
                    {currentProfile.stat.indoorMood === 'B' && (<p>B</p>)}
                    {currentProfile.stat.indoorMood === 'C' && (<p>C</p>)}
                    {currentProfile.stat.indoorMood === 'D' && (<p>D</p>)}
                  </td>
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