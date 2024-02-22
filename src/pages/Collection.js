import { useEffect, useState } from 'react';
import axios from 'axios';
import { FilterBar } from '../components/FilterBar'
import newCharacters from '../resources/characters';
import './Collection.css'

export const Collection = () => {
  const [characters, setCharacters] = useState([])
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
    axios.get('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120').then((res) => {
      const apiCharacters = res.data.data.map(character => {
        return { ...character, clicked: false }
      })
      const allCharacters = [...apiCharacters, ...newCharacters]
      const sortedCharacters = allCharacters.sort((a, b) => a.name.localeCompare(b.name))
      const storedCharacters = localStorage.getItem('characters')
      if (storedCharacters) {
        setCharacters(JSON.parse(storedCharacters))
      } else {
        localStorage.setItem('characters', JSON.stringify(sortedCharacters))
        //setCharacters(JSON.parse(storedCharacters)) (Why doesnt this work?)
        setCharacters(sortedCharacters)
      }
    })  

    localStorage.setItem('page', 'collection')
  }, [])

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

  const handleClick = (id) => {
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

          <div className='characters-container'>
            {showAll &&
              (characters.map(character => {
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
            {showAll !== true &&
              (filteredCharacters.map(character => {
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
          <p>API: https://api-blue-archive.vercel.app/</p>
        </div>
      )}
    </>
  )
}
