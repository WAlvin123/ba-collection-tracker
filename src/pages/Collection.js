import { useEffect, useState } from 'react';
import axios from 'axios';
import { FilterBar } from '../components/FilterBar'
import newCharacters from '../resources/characters';
import './Collection.css'
import { auth, db } from '../config/firestore';
import { useCharacter } from '../Custom hooks/useCharacter';
import { doc, setDoc } from 'firebase/firestore';
import { click } from '@testing-library/user-event/dist/click';

export const Collection = () => {
  const [characters, setCharacters, getCharacters] = useCharacter()
  const [showAll, setShowAll] = useState(false)
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [schools, setSchools] = useState([])
  const [dmgTypes, setDmgTypes] = useState([])
  const [ownedCharacters, setOwnedCharacters] = useState(0)
  const [schoolFilter, setSchoolFilter] = useState(false)
  const [ownedFilter, setOwnedFilter] = useState(false)
  const [notOwnedFilter, setNotOwnedFilter] = useState(false)
  const [dmgFilter, setDmgFilter] = useState(false)

  useEffect(() => {
    setShowAll(true)
    getCharacters()
  }
    , [])

  useEffect(() => {
    if (showAll == true) {
      setOwnedCharacters(characters.filter(character => character.clicked === true))
    } else {
      setOwnedCharacters(filteredCharacters.filter(character => character.clicked === true))
    }
  }, [characters])

  const handleShowAll = () => {
    setShowAll(true)
    setOwnedCharacters(characters.filter(character => character.clicked === true))
    setFilteredCharacters([])
    setSchools([])
    setDmgTypes([])
    setOwnedFilter(false)
    setNotOwnedFilter(false)
    setSchoolFilter(false)
    setDmgFilter(false)
  }

  const handleClick = async (id) => {
    if (auth.currentUser === null) {
      if (showAll == true) {
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
      } else {
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
    } else {
      if (showAll === true) {
        const updatedCharacters = characters.map(character => {
          if (character._id === id) {
            return { ...character, clicked: !character.clicked }
          } else {
            return character
          }
        })
        await setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s data`), {
          characters: updatedCharacters,
          plannedBanners: []
        })
        getCharacters()
      } else {
        setFilteredCharacters(filteredCharacters.map(character => {
          if (character._id === id) {
            return { ...character, clicked: !character.clicked }
          } else {
            return character
          }
        }))
        const updatedCharacters = characters.map(character => {
          if (character._id === id) {
            return { ...character, clicked: !character.clicked }
          } else {
            return character
          }
        })
        await setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s data`), {
          characters: updatedCharacters,
          plannedBanners: []
        })
      }
      getCharacters()
    }
  }

  const handleFilterBySchool = (school) => {
    setShowAll(false)
    if (ownedFilter === true && notOwnedFilter == false) {
      if (dmgFilter == false) { // School + Owned filter
        if (schools.includes(school)) {
          if (schools.length === 1) {
            setSchools([])
            setFilteredCharacters(characters.filter(character => character.clicked == true))
            setOwnedCharacters(characters.filter(character => character.clicked == true))
            setSchoolFilter(false)
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(filteredSchool => filteredSchool !== school)
              const filteredCharacters = characters.filter(character => {
                if (updatedSchools.includes(character.school) && character.clicked == true) {
                  return true
                } else return false
              })
              setFilteredCharacters(filteredCharacters)
              setOwnedCharacters(filteredCharacters)
              return updatedSchools
            })
          }
        }
        else {
          setSchoolFilter(true)
          setSchools(prevSchools => {
            const updatedSchools = [school, ...prevSchools]
            const filteredCharacters = characters.filter(character => {
              if (updatedSchools.includes(character.school) && character.clicked == true) {
                return true
              } else return false
            })
            setFilteredCharacters(filteredCharacters)
            setOwnedCharacters(filteredCharacters)
            return updatedSchools
          })
        }
      }
      else if (dmgFilter == true) { // All 3 filters
        if (schools.includes(school)) {
          if (schools.length === 1) {
            setSchools([])
            setFilteredCharacters(characters.filter(character => dmgTypes.includes(character.damageType) && character.clicked === true))
            setOwnedCharacters(characters.filter(character => dmgTypes.includes(character.damageType) && character.clicked === true))
            setSchoolFilter(false)
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(filteredSchool => filteredSchool !== school)
              const filteredCharacters = characters.filter(character => {
                if (updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked == true) {
                  return true
                } else return false
              })
              setFilteredCharacters(filteredCharacters)
              setOwnedCharacters(filteredCharacters.filter(character => character.clicked === true))
              return updatedSchools
            })
          }
        }
        else {
          setSchoolFilter(true)
          setSchools(prevFilters => {
            const updatedSchools = [school, ...prevFilters]
            const filteredCharacters = characters.filter(character => {
              if (updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked == true) {
                return true
              } else return false
            })
            setFilteredCharacters(filteredCharacters)
            setOwnedCharacters(filteredCharacters.filter(character => character.clicked === true))
            return updatedSchools
          })
        }
      }
    } else if (notOwnedFilter == true && ownedFilter == false) { // notOwned 
      if (dmgFilter == false) { // School + ~Owned filter
        if (schools.includes(school)) {
          if (schools.length === 1) {
            setSchools([])
            setFilteredCharacters(characters.filter(character => character.clicked == false))
            setOwnedCharacters([])
            setSchoolFilter(false)
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(filteredSchool => filteredSchool !== school)
              const filteredCharacters = characters.filter(character => {
                if (updatedSchools.includes(character.school) && character.clicked == false) {
                  return true
                } else return false
              })
              setFilteredCharacters(filteredCharacters)
              setOwnedCharacters([])
              return updatedSchools
            })
          }
        }
        else {
          setSchoolFilter(true)
          setSchools(prevSchools => {
            const updatedSchools = [school, ...prevSchools]
            const filteredCharacters = characters.filter(character => {
              if (updatedSchools.includes(character.school) && character.clicked == false) {
                return true
              } else return false
            })
            setFilteredCharacters(filteredCharacters)
            setOwnedCharacters([])
            return updatedSchools
          })
        }
      }
      else if (dmgFilter == true) { // All 3 filters
        if (schools.includes(school)) {
          if (schools.length === 1) {
            setSchools([])
            setFilteredCharacters(characters.filter(character => dmgTypes.includes(character.damageType) && character.clicked === false))
            setOwnedCharacters([])
            setSchoolFilter(false)
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(filteredSchool => filteredSchool !== school)
              const filteredCharacters = characters.filter(character => {
                if (updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked == false) {
                  return true
                } else return false
              })
              setFilteredCharacters(filteredCharacters)
              setOwnedCharacters([])
              return updatedSchools
            })
          }
        }
        else {
          setSchoolFilter(true)
          setSchools(prevFilters => {
            const updatedSchools = [school, ...prevFilters]
            const filteredCharacters = characters.filter(character => {
              if (updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked == false) {
                return true
              } else return false
            })
            setFilteredCharacters(filteredCharacters)
            setOwnedCharacters(filteredCharacters.filter(character => character.clicked === true))
            return updatedSchools
          })
        }
      }
    } else if (ownedFilter == false && notOwnedFilter == false) { // No owned filter 
      if (dmgFilter == false) { // School only
        if (schools.includes(school)) {
          if (schools.length === 1) {
            setShowAll(true)
            setSchools([])
            setOwnedCharacters(characters.filter(character => character.clicked === true))
            setSchoolFilter(false)
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(filteredSchool => filteredSchool !== school)
              const filteredCharacters = characters.filter(character => updatedSchools.includes(character.school))
              setFilteredCharacters(filteredCharacters)
              setOwnedCharacters(filteredCharacters.filter(character => character.clicked == true))
              return updatedSchools
            })
          }
        }
        else {
          setSchoolFilter(true)
          setSchools(prevSchools => {
            const updatedSchools = [school, ...prevSchools]
            const filteredCharacters = characters.filter(character => updatedSchools.includes(character.school))
            setFilteredCharacters(filteredCharacters)
            setOwnedCharacters(filteredCharacters.filter(character => character.clicked == true))
            return updatedSchools
          })
        }
      }
      else if (dmgFilter == true) { // dmg + school filter
        if (!schools.includes(school)) {
          setSchools(prevSchools => {
            const updatedSchools = [...prevSchools, school]
            setSchoolFilter(true)
            setFilteredCharacters(characters.filter(character => updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType)))
            setOwnedCharacters(characters.filter(character => updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked === true))
            return updatedSchools
          })
        } else {
          if (schools.length == 1) {
            setSchoolFilter(false)
            setSchools([])
            setFilteredCharacters(characters.filter(character => dmgTypes.includes(character.damageType)))
            setOwnedCharacters(characters.filter(character => dmgTypes.includes(character.damageType) && character.clicked === true))
          } else {
            setSchoolFilter(true)
            setSchools(prevSchools => {
              const updatedSchools = prevSchools.filter(removedSchool => removedSchool !== school)
              setFilteredCharacters(characters.filter(character => updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType)))
              setOwnedCharacters(characters.filter(character => updatedSchools.includes(character.school) && dmgTypes.includes(character.damageType) && character.clicked === true))
              return updatedSchools
            })
          }
        }
      }
    }
  }

  const handlePulled = () => {
    setNotOwnedFilter(false)
    if (dmgFilter == false && schoolFilter == false && ownedFilter == false) { // ownedFilter only
      setShowAll(false)
      setOwnedFilter(true)
      const updatedCharacters = characters.filter(character => character.clicked == true)
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters)
    } else if (schoolFilter == true && ownedFilter == false && dmgFilter == false) { //  school + owned filter
      setOwnedFilter(true)
      const updatedCharacters = characters.filter(character => schools.includes(character.school) && character.clicked == true)
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters)
    } else if (schoolFilter == true && ownedFilter == true && dmgFilter == false) { // disabling owned filter (school)
      const updatedCharacters = characters.filter(character => schools.includes(character.school))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
      setOwnedFilter(false)
    } else if (dmgFilter == true && schoolFilter == false && ownedFilter == false) { // dmg + ownedfilter
      const updatedCharacters = characters.filter(character => dmgTypes.includes(character.damageType) && character.clicked == true)
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
      setOwnedFilter(true)
    } else if (dmgFilter == true && schoolFilter == false && ownedFilter == true) { // disabling owned filter (damage)
      const updatedCharacters = characters.filter(character => dmgTypes.includes(character.damageType))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
      setOwnedFilter(false)
    }
    else if (dmgFilter == true && schoolFilter == true && ownedFilter == false) { // all 3 filters
      const updatedCharacters = characters.filter(character => character.clicked === true && dmgTypes.includes(character.damageType) && schools.includes(character.school))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters)
      setOwnedFilter(true)
    } else if (dmgFilter == true && schoolFilter == true && ownedFilter == true) { // disabling owned filter (damage + school)
      const updatedCharacters = characters.filter(character => dmgTypes.includes(character.damageType) && schools.includes(character.school))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
      setOwnedFilter(false)
    }
    else if (ownedFilter == true && schoolFilter == false && dmgFilter == false) {
      setOwnedFilter(false)
      setOwnedCharacters(filteredCharacters.filter(character => character.clicked == true))
      setShowAll(true)
    }
  }


  const handleNotPulled = () => {
    setOwnedFilter(false)
    if (dmgFilter == false && schoolFilter == false && notOwnedFilter == false) { // ownedFilter only
      setShowAll(false)
      setNotOwnedFilter(true)
      setFilteredCharacters(characters.filter(character => character.clicked == false))
      setOwnedCharacters([])
    } else if (schoolFilter == true && notOwnedFilter == false && dmgFilter == false) { //  school + owned filter
      setNotOwnedFilter(true)
      setFilteredCharacters(characters.filter(character => {
        if (schools.includes(character.school) && character.clicked == false) {
          return true
        } else return false
      }))
      setOwnedCharacters([])
    } else if (schoolFilter == true && notOwnedFilter == true && dmgFilter == false) { // disabling owned filter (school)
      const updatedCharacters = characters.filter(character => schools.includes(character.school))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
      setNotOwnedFilter(false)
    } else if (dmgFilter == true && schoolFilter == false && notOwnedFilter == false) { // dmg + ownedfilter
      setFilteredCharacters(characters.filter(character => {
        if (character.clicked === false && dmgTypes.includes(character.damageType)) {
          return true
        } else return false
      }))
      setOwnedCharacters([])
      setNotOwnedFilter(true)
    } else if (dmgFilter == true && schoolFilter == false && notOwnedFilter == true) { // disabling owned filter (damage)
      const updatedCharacters = characters.filter(character => dmgTypes.includes(character.damageType))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked === true))
      setNotOwnedFilter(false)
    }
    else if (dmgFilter == true && schoolFilter == true && notOwnedFilter == false) { // all 3 filters
      setFilteredCharacters(characters.filter(character => {
        if (character.clicked === false && dmgTypes.includes(character.damageType) && schools.includes(character.school)) {
          return true
        } else return false
      }))
      setOwnedCharacters([])
      setNotOwnedFilter(true)
    } else if (dmgFilter == true && schoolFilter == true && notOwnedFilter == true) { // disabling owned filter (damage + school)
      const updatedCharacters = characters.filter(character => dmgTypes.includes(character.damageType) && schools.includes(character.school))
      setFilteredCharacters(updatedCharacters)
      setOwnedCharacters(updatedCharacters.filter(character => character.clicked === true))
      setNotOwnedFilter(false)
    }
    else if (notOwnedFilter == true && schoolFilter == false && dmgFilter == false) {
      setNotOwnedFilter(false)
      setShowAll(true)
      setOwnedCharacters(characters.filter(character => character.clicked === true))
    }
  }


  const handleFilterByDmg = (dmgType) => {
    setShowAll(false)
    if (ownedFilter == true && notOwnedFilter == false) {
      if (schoolFilter == false) {  // dmgTypes alone
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => character.clicked == true && updatedTypes.includes(character.damageType))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters(updatedCharacters)
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setFilteredCharacters(characters.filter(character => character.clicked === true))
            setOwnedCharacters(characters.filter(character => character.clicked === true))
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => character.clicked == true && updatedTypes.includes(character.damageType))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters(updatedCharacters)
              return updatedTypes
            })
          }
        }
      } else {  // dmgTypes + Schools
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => character.clicked == true && updatedTypes.includes(character.damageType) && schools.includes(character.school))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters(updatedCharacters)
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setFilteredCharacters(characters.filter(character => character.clicked === true && schools.includes(character.school)))
            setOwnedCharacters(characters.filter(character => character.clicked === true && schools.includes(character.school)))
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => character.clicked == true && updatedTypes.includes(character.damageType) && schools.includes(character.school))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters(updatedCharacters)
              return updatedTypes
            })
          }
        }
      }
    } else if (ownedFilter == false && notOwnedFilter == true) {
      if (schoolFilter == false) {  // dmgTypes alone
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => character.clicked == false && updatedTypes.includes(character.damageType))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters([])
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setFilteredCharacters(characters.filter(character => character.clicked === true))
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => character.clicked == false && updatedTypes.includes(character.damageType))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters([])
              return updatedTypes
            })
          }
        }
      } else {  // dmgTypes + Schools
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => character.clicked == false && updatedTypes.includes(character.damageType) && schools.includes(character.school))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters([])
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setFilteredCharacters(characters.filter(character => character.clicked === false && schools.includes(character.school)))
            setOwnedCharacters([])
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => character.clicked == false && updatedTypes.includes(character.damageType) && schools.includes(character.school))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters([])
              return updatedTypes
            })
          }
        }
      }
    } else {
      if (schoolFilter == false) {  // dmgTypes alone
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => updatedTypes.includes(character.damageType))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setShowAll(true)
            setOwnedCharacters(characters.filter(character => character.clicked == true))
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => updatedTypes.includes(character.damageType))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
              return updatedTypes
            })
          }
        }
      } else {  // dmgTypes + Schools
        if (!dmgTypes.includes(dmgType)) {
          setDmgFilter(true)
          setDmgTypes(prevTypes => {
            const updatedTypes = [dmgType, ...prevTypes]
            const updatedCharacters = characters.filter(character => updatedTypes.includes(character.damageType) && schools.includes(character.school))
            setFilteredCharacters(updatedCharacters)
            setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
            return updatedTypes
          })
        } else if (dmgTypes.includes(dmgType)) {
          if (dmgTypes.length == 1) {
            setDmgFilter(false)
            setDmgTypes([])
            setFilteredCharacters(characters.filter(character => schools.includes(character.school)))
            setOwnedCharacters(characters.filter(character => character.clicked == true && schools.includes(character.school)))
          } else {
            setDmgFilter(true)
            setDmgTypes(prevTypes => {
              const updatedTypes = prevTypes.filter(type => type !== dmgType)
              const updatedCharacters = characters.filter(character => updatedTypes.includes(character.damageType) && schools.includes(character.school))
              setFilteredCharacters(updatedCharacters)
              setOwnedCharacters(updatedCharacters.filter(character => character.clicked == true))
              return updatedTypes
            })
          }
        }
      }
    }
  }

  return (
    <>
      {characters !== null && (
        <div className="Collection">
          {auth.currentUser !== null && (<p>Welcome {auth.currentUser.email}</p>)}
          <FilterBar
            handleFilterBySchool={handleFilterBySchool}
            setShowAll={handleShowAll}
            handlePulled={handlePulled}
            handleFilterByDmg={handleFilterByDmg}
            handleNotPulled={handleNotPulled}
          />

          {showAll && (
            <h2 style={{ color: 'white' }}>Currently owned: {ownedCharacters.length}/{characters.length}</h2>
          )}

          {showAll !== true && (
            <h2 style={{ color: 'white' }}>Currently owned: {ownedCharacters.length}/{filteredCharacters.length}</h2>
          )}

          <div className='centered-container'>
            {showAll && (
              <div className='characters-container'>
                {characters.map(character => {
                  return (
                    <div>
                      <button
                        className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                        onClick={() => { handleClick(character._id) }}
                      >
                        <img src={character.photoUrl} className='collection-character-image' />
                      </button>
                      <p className={character.clicked ? 'character-name-clicked' : 'character-name-unclicked'}>{character.name}</p>
                    </div>
                  )
                })}
              </div>
            )}


            {showAll !== true && filteredCharacters.length > 0 && (
              <div className='characters-container'>
                {filteredCharacters.map(character => {
                  return (
                    <div>
                      <button
                        className={character.clicked ? 'character-button-clicked' : 'character-button-unclicked'}
                        onClick={() => { handleClick(character._id) }}
                      >
                        <img src={character.photoUrl} className='collection-character-image' />
                      </button>
                      <p className={character.clicked ? 'character-name-clicked' : 'character-name-unclicked'}>{character.name}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {showAll !== true && filteredCharacters.length === 0 && (
              <p className='text'>No results found...</p>
            )}

          </div>
          <p style={{ fontFamily: 'Lucida Sans' }}>API: https://api-blue-archive.vercel.app/</p>
        </div>
      )}
    </>
  )
}
