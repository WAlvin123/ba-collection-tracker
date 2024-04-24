import { useEffect, useState } from 'react'
import { auth, db } from '../config/firestore'
import './Profile.css'
import { useCharacter } from '../Custom hooks/useCharacter'
import { usePlanner } from '../Custom hooks/usePlanner'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Profiles from '../resources/Profiles'

export const Profile = () => {
  const [characters, setCharacters, getCharacters] = useCharacter()
  const [plannedBanners, setPlannedBanners, getPlannedBanners] = usePlanner()

  useEffect(() => {
    getCharacters()
    getPlannedBanners()
    getFavoriteCharacter()
    getFavoriteSchool()
    getPulls()
    console.log(collectionCompletion)
  }, [])

  const [favoriteStudent, setFavoriteStudent] = useState('')
  const [favoriteSchool, setFavoriteSchool] = useState('')
  const [characterSelectionVisible, setCharacterSelectionVisible] = useState(false)
  const [schoolSelectionVisible, setSchoolSelectionVisible] = useState(false)
  const [pyroxenes, setPyroxenes] = useState('')
  const [tenTickets, setTenTickets] = useState('')
  const [tickets, setTickets] = useState('')
  const [total, setTotal] = useState(0)

  const getFavoriteCharacter = async () => {
    const favoriteCharacterSnapShot = await getDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite character`))
    const favoriteStudent = favoriteCharacterSnapShot.get('favoriteCharacter')
    setFavoriteStudent(favoriteStudent)
  }

  const getFavoriteSchool = async () => {
    const favoriteSchoolSnapShot = await getDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`))
    const favoriteSchool = favoriteSchoolSnapShot.get('favoriteSchool')
    setFavoriteSchool(favoriteSchool)
  }

  const getPulls = async () => {
    const pullsSnapShot = await getDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s total pulls`))
    const totalPulls = pullsSnapShot.get('pulls')
    setTotal(totalPulls)
  }


  const collectionCompletion = (characters.filter(character => character.clicked === true).length / characters.length) * 100
  const plannerProgress = (total / (plannedBanners.length * 24000))

  return (
    <div className="Profile">

      {characterSelectionVisible === true && (
        <div className='centered-container'>
          <div className='characters-container'>
            {characters.map(character => {
              return (
                <div>
                  <button
                    className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                    onClick={() => {
                      setCharacterSelectionVisible(false)
                      setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite character`), {
                        favoriteCharacter: character
                      }).then(() => {
                        getFavoriteCharacter()
                      })
                    }}
                  >
                    <img src={character.photoUrl} className='collection-character-image' />
                  </button>
                  <p className={character.clicked ? 'character-name-clicked' : 'character-name-unclicked'}>{character.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {schoolSelectionVisible === true && (
        <div className='centered-container'>
          <div className='characters-container'>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Abydos'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Abydos
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Arius'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Arius
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Gehenna'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Gehenna
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Hyakkiyako'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Hyakkiyako
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Millennium'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Millennium
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'RedWinter'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              RedWinter
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Shanhaijing'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Shanhaijing
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'SRT'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              SRT
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Trinity'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Trinity
            </button>
            <button onClick={() => {
              setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s favorite school`), {
                favoriteSchool: 'Valkyrie'
              }).then(() => {
                getFavoriteSchool()
              })
              setSchoolSelectionVisible(false)
            }}>
              Valkyrie
            </button>
          </div>
        </div>
      )}

      {auth.currentUser !== null && characterSelectionVisible == false && schoolSelectionVisible == false && (
        <div className='centered-container'>
          <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
            <div>
              <div className='profile-container'>
                <p className='text'>Username: {auth.currentUser.email.slice(0, -9)}</p>
                <div>
                  <p className='planner-text'>Favorite Student:</p>
                  <img src={favoriteStudent.photoUrl} className='profile-character-image' />
                  {favoriteStudent === '' && (
                    <button
                      className='confirmation-button'
                      onClick={() => {
                        setCharacterSelectionVisible(true)
                      }}
                    >
                      Set Student
                    </button>
                  )}
                  {favoriteStudent !== '' && (
                    <>
                      <p
                        className='planner-text'>{favoriteStudent.name}</p>
                    </>
                  )}
                  <button
                    className='confirmation-button'
                    onClick={() => {
                      setCharacterSelectionVisible(true)
                    }}
                  >
                    Set Student
                  </button>
                </div>
              </div>
              <div>
                <p
                  className='planner-text'>Favorite School: </p>
                <div>
                  {favoriteSchool === 'Gehenna' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/b/bd/Gehenna.png/50px-Gehenna.png'></img>)}
                  {favoriteSchool == 'Abydos' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/91/Abydos.png/50px-Abydos.png'></img>)}
                  {favoriteSchool == 'Arius' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/93/Arius.png/50px-Arius.png'></img>)}
                  {favoriteSchool == 'Trinity' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/9/9c/Trinity.png/50px-Trinity.png'></img>)}
                  {favoriteSchool == 'Millennium' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/2/2a/Millennium.png/50px-Millennium.png'></img>)}
                  {favoriteSchool == 'SRT' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/5/5a/SRT.png/50px-SRT.png'></img>)}
                  {favoriteSchool == 'Valkyrie' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/d/d5/Valkyrie.png/50px-Valkyrie.png'></img>)}
                  {favoriteSchool == 'Shanhaijing' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/b/be/Shanhaijing.png/50px-Shanhaijing.png'></img>)}
                  {favoriteSchool == 'Hyakkiyako' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/3/36/Hyakkiyako.png/50px-Hyakkiyako.png'></img>)}
                  {favoriteSchool == 'RedWinter' && (<img src='https://static.miraheze.org/bluearchivewiki/thumb/8/8b/Red_Winter.png/50px-Red_Winter.png'></img>)}
                </div>
                <button
                  className='confirmation-button'
                  onClick={() => {
                    setSchoolSelectionVisible(true)
                  }}
                >
                  Set School
                </button>
              </div>
              {characters.length > 0 && (
                <p
                  className='planner-text'>
                  Owned Characters:{characters.filter(character => character.clicked === true).length} / {characters.length} (~ {Math.round(collectionCompletion)}%)
                </p>
              )}
              {plannedBanners.length > 0 && (
                <p
                  className='planner-text'>
                  Upcoming Banners:{plannedBanners.length}
                </p>
              )}
            </div>
            <h1></h1>
            <div clas>
              <div className='profile-container'>
                <div>
                  <p
                    className='planner-text'>Currently held pyroxenes: </p>
                  <input
                    className='search-input'
                    value={pyroxenes}
                    onChange={(event) => {
                      setPyroxenes(event.target.value)
                    }}
                    placeholder='Pyroxenes....'
                  />
                  <p
                    className='planner-text'>Currently held 10-pull tickets</p>
                  <input
                    className='search-input'
                    value={tenTickets}
                    onChange={(event) => {
                      setTenTickets(event.target.value)
                    }}
                    placeholder='Tenfolds....'
                  />
                  <p
                    className='planner-text'>Currently held single pull tickets</p>
                  <input
                    className='search-input'
                    value={tickets}
                    onChange={(event) => {
                      setTickets(event.target.value)
                    }}
                    placeholder='Tickets....'
                  />

                </div>
                <h1></h1>
                <button
                  onClick={() => {
                    const total = parseInt(pyroxenes) + parseInt(tenTickets * 1200) + parseInt(tickets * 120)
                    setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s total pulls`), {
                      pulls: total
                    }).then(() => {
                      getPulls()
                    })
                  }}
                  className='confirmation-button'
                >Submit</button>
                {total > 0 && (<p className='planner-text'>Current total: {total}  <img src='https://static.miraheze.org/bluearchivewiki/3/3b/Currency_Icon_Gem.png' className="pyro-img"></img> (~{Math.round(total / 120)} pulls)</p>)}
                {plannedBanners.length > 0 && (<p className='planner-text'>Current planner progress: {total} / {plannedBanners.length * 24000} (~{Math.round(plannerProgress * 100)}%)  </p>)}
              </div>
              <h1></h1>
            </div>
          </div>

        </div>
      )}
      {auth.currentUser === null && (<p>Please sign in</p>)}
    </div>
  )
}