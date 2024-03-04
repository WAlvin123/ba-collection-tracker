import { useEffect, useState } from 'react'
import './Banners.css'
import './CurrentTable.css'
import TLBanners from '../resources/TLBanners'
import { useCharacter } from '../Custom hooks/useCharacter'
import { usePlanner } from '../Custom hooks/usePlanner'
import { auth, db } from '../config/firestore'
import { setDoc, doc } from 'firebase/firestore'

export const Banners = () => {

  const [characters, setCharacters, getCharacters] = useCharacter()

  useEffect(() => {

    getCharacters()

    const sortedJPBanners = [...TLBanners.current, ...TLBanners.ended, ...TLBanners.upcoming].sort((a, b) => b.startAt - a.startAt)
    setAllJPBanners(sortedJPBanners.map(banner => {
      const startDate = new Date(banner.startAt)
      const startDay = startDate.toLocaleDateString()
      const startHour = startDate.toLocaleTimeString()
      const globalStartDate = new Date(banner.startAt)
      globalStartDate.setMonth(globalStartDate.getMonth() + 6)
      globalStartDate.setDate(globalStartDate.getDate() + 6)
      const globalStartDay = globalStartDate.toLocaleDateString()
      const endDate = new Date(banner.endAt)
      const endDay = endDate.toLocaleDateString()
      const endHour = endDate.toLocaleTimeString()
      return { ...banner, startAt: `${startDay}, ${startHour}`, endAt: `${endDay}, ${endHour}`, globalStartAt: `~${globalStartDay}` }
    }))

    fetch('https://api.ennead.cc/buruaka/banner')
      .then(res => {
        return res.json()
      })
      .then(data => {
        const sortedBanners = [...data.current, ...data.upcoming, ...data.ended].sort((b, a) => a.startAt - b.startAt)
        const convertedDateBanners = sortedBanners.map(banner => {
          const startDate = new Date(banner.startAt)
          const endDate = new Date(banner.endAt)
          const startDay = startDate.toLocaleDateString()
          const startHour = startDate.toLocaleTimeString()
          const endDay = endDate.toLocaleDateString()
          const endHour = endDate.toLocaleTimeString()
          return { ...banner, startAt: `${startDay}, ${startHour}`, endAt: `${endDay}, ${endHour}` }
        })

        setAllENBanners(convertedDateBanners.map(banner => {
          const convertedNames = banner.rateups.map(rateup => {
            if (rateup === 'Aris') {
              return 'Arisu'
            } else if (rateup === 'Aris (Maid)') {
              return 'Arisu (Maid)'
            } else if (rateup === 'Toki (Bunny)') {
              return 'Toki (Bunny Girl)'
            } else if (rateup === 'Shiroko (Cycling)') {
              return 'Shiroko (Riding)'
            } else if (rateup === 'Yuuka (Track)') {
              return 'Yuuka (Sportswear)'
            } else if (rateup === 'Mari (Track)') {
              return 'Mari (Sportswear)'
            } else if (rateup === 'Karin (Bunny)') {
              return 'Karin (Bunny Girl)'
            } else if (rateup === 'Asuna (Bunny)') {
              return 'Asuna (Bunny Girl)'
            } else if (rateup === 'Akane (Bunny)') {
              return 'Akane (Bunny Girl)'
            } else if (rateup === 'Neru (Bunny)') {
              return 'Neru (Bunny Girl)'
            } else if (rateup === 'Utaha (Cheer Squad)') {
              return 'Utaha (Cheerleader)'
            } else {
              return rateup
            }
          })
          return { ...banner, rateups: convertedNames }
        }))
      })


    const storedCharacters = JSON.parse(localStorage.getItem('characters'))
    if (storedCharacters) {
      setCharacters(storedCharacters)
    }

    getPlannedBanners()
    localStorage.setItem('page', 'banners')
  }, [])

  const [currentBannerEN, setCurrentBannerEN] = useState({})
  const [allJPBanners, setAllJPBanners] = useState([])
  const [allENBanners, setAllENBanners] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredBanners, setFilteredBanners] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [plannedBanners, setPlannedBanners, getPlannedBanners] = usePlanner()
  const [bannerRegion, setBannerRegion] = useState('JP')

  const handleSearch = () => {
    if (bannerRegion == 'JP') {
      const splitBanners = allJPBanners.map(banner => {
        const splitRateups = banner.rateups.join(',')
        return { ...banner, rateups: splitRateups }
      })

      const splitBannersFiltered = splitBanners.filter(banner => banner.rateups.toLowerCase().includes(searchInput.toLowerCase()))

      setFilteredBanners(splitBannersFiltered.map(banner => {
        return { ...banner, rateups: banner.rateups.split(',') }
      }))
    } else {
      const splitBanners = allENBanners.map(banner => {
        const splitRateups = banner.rateups.join(',')
        return { ...banner, rateups: splitRateups }
      })

      const splitBannersFiltered = splitBanners.filter(banner => banner.rateups.toLowerCase().includes(searchInput.toLowerCase()))

      setFilteredBanners(splitBannersFiltered.map(banner => {
        return { ...banner, rateups: banner.rateups.split(',') }
      }))
    }
  }

  const handleAddToPlanner = async (banner) => {
    if (auth.currentUser === null)
      if (plannedBanners.some(existingBanner => existingBanner.startAt === banner.startAt && existingBanner.endAt === banner.endAt && existingBanner.rateups[0] === banner.rateups[0])) {
        console.log('This banner is already in the planner ')
      } else {
        setPlannedBanners(prevBanners => {
          const updatedBanners = [...prevBanners, { ...banner, id: Math.random() }]
          localStorage.setItem('plannedBanners', JSON.stringify(updatedBanners))
          return updatedBanners
        })
      } else {
      if (plannedBanners.some(existingBanner => existingBanner.startAt === banner.startAt && existingBanner.endAt === banner.endAt && existingBanner.rateups[0] === banner.rateups[0])) {
        console.log('This banner is already in the planner ')
      } else {
        const updatedBanners = [...plannedBanners, { ...banner, id: Math.random() }]
        setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s planned banners`), {
          plannedBanners: updatedBanners
        })
        getPlannedBanners()
      }
    }
  }

  return (
    <div className='Banners'>
      <div className='centered-container'>
        {showAll === true && (
          <p className='caution-text'>
            Predicted EN dates may be inaccurate due to scheduling changes, view actual EN banners for reference.
          </p>
        )}
      </div>
      <div className='centered-container'>
        {showAll === true && (<div className='banner-search-container'>
          <p className='search-prompt'>Got a specific rate up you're looking for?</p>
          <input className='search-input'
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setShowAll(false)
                handleSearch()
                setSearchInput('')
              }
            }}
            placeholder='e.g. Saori...'
          />
          <button className='search-button' onClick={() => {
            setShowAll(false)
            handleSearch()
          }}>Search</button>
        </div>)}
        <div>
          <h1></h1>
          {showAll === false && (
            <button
              className='search-button'
              onClick={() => {
                setShowAll(true)
                setSearchInput('')
                if (bannerRegion == 'EN') {
                  setBannerRegion('EN')
                } else {
                  setBannerRegion('JP')
                }
              }}>
              Return
            </button>
          )}
        </div>
      </div>


      {currentBannerEN.length >= 0 && showAll === true && (
        <>
          <p className='text'>Current banner (EN)</p>
          <div className='centered-container'>
            <table className='current-table'>
              <th className='current-table-header'>Rate ups</th>
              <th className='current-table-header'>Start</th>
              <th className='current-table-header'>End</th>
              {
                currentBannerEN.map(banner => {
                  return (
                    <tr className='current-table-row'>
                      <td className='current-table-detail'>
                        {banner.rateups.map(rateup => {
                          const indexOfCharacter = characters.findIndex(character => rateup === character.name)
                          if (indexOfCharacter !== 1) {
                            return (
                              <div>
                                <img src={characters[indexOfCharacter].photoUrl} className='current-character-img'></img>
                                <p>{rateup}</p>
                              </div>
                            )
                          } else {
                            return null
                          }
                        })}
                      </td>
                      <td className='current-table-detail'>{banner.startAt}</td>
                      <td className='current-table-detail'>{banner.endAt}</td>
                    </tr>
                  )
                })
              }
            </table>
          </div>
        </>)}
      <h1></h1>
      {showAll === true && (
        <select
          onChange={(event) => {
            setBannerRegion(event.target.value)
          }}
          className='select-font'
          value={bannerRegion}
        >
          <option>JP</option>
          <option>EN</option>
        </select>
      )}

      {showAll === true && bannerRegion == 'JP' && (
        <>
          <p className='text'>All Banners (JP)</p>
          <div className='centered-container'>
            <table className='banner-table'>
              <th className='banner-table-header'>Rate ups</th>
              <th className='banner-table-header'>Start (JP)</th>
              <th className='banner-table-header'>End (JP)</th>
              <th className='banner-table-header'>Start (EN)</th>
              <th className='banner-table-header'>Planner</th>
              {allJPBanners.map(banner => {
                return (
                  <tr className='banner-table-row'>
                    <td className='banner-table-detail'>
                      {banner.rateups.map(rateup => {
                        const indexOfCharacter = characters.findIndex(character => character.name === rateup)
                        if (indexOfCharacter !== -1) {
                          return (
                            <>
                              <img src={characters[indexOfCharacter].photoUrl} className='banner-table-img'></img>
                              <p>{rateup} [{banner.gachaType}]</p>
                            </>
                          )
                        } else {
                          return null
                        }
                      })}
                    </td>
                    <td className='banner-table-detail'>{banner.startAt}</td>
                    <td className='banner-table-detail'>{banner.endAt}</td>
                    <td className='banner-table-detail'>{banner.globalStartAt}</td>
                    <td className='banner-table-detail'>
                      <button
                        className='add-remove-button'
                        onClick={() => {
                          handleAddToPlanner(banner)
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                )
              })}
            </table>
          </div>
        </>
      )}

      {showAll === true && bannerRegion == 'EN' && (
        <>
          <p className='text'>All Banners (EN)</p>
          <div className='centered-container'>
            <table className='banner-table'>
              <th className='banner-table-header'>Rate ups</th>
              <th className='banner-table-header'>Start</th>
              <th className='banner-table-header'>End</th>
              {allENBanners.map(banner => {
                return (
                  <tr className='banner-table-row'>
                    <td className='banner-table-detail'>
                      {banner.rateups.map(rateup => {
                        const indexOfCharacter = characters.findIndex(character => character.name === rateup)
                        if (indexOfCharacter !== -1) {
                          return (
                            <>
                              <img src={characters[indexOfCharacter].photoUrl} className='banner-table-img'></img>
                              <p>{rateup}</p>
                            </>
                          )
                        } else {
                          return <p>{rateup}</p>
                        }
                      })}
                    </td>
                    <td className='banner-table-detail'>{banner.startAt}</td>
                    <td className='banner-table-detail'>{banner.endAt}</td>
                  </tr>
                )
              })}
            </table>
          </div>
        </>
      )}

      {showAll === false && filteredBanners.length > 0 && bannerRegion == 'JP' && (
        <div className='centered-container'>
          <table className='banner-table'>
            <th className='banner-table-header'>Rate ups</th>
            <th className='banner-table-header'>Start (JP)</th>
            <th className='banner-table-header'>End (JP)</th>
            <th className='banner-table-header'>Start (EN)</th>
            <th className='banner-table-header'>Add to Planner</th>

            {filteredBanners.map(banner => {
              return (
                <tr className='banner-table-row'>
                  <td className='banner-table-detail'>
                    {banner.rateups.map(rateup => {
                      const indexOfCharacter = characters.findIndex(character => character.name === rateup)
                      if (indexOfCharacter !== -1) {
                        return (
                          <>
                            <img src={characters[indexOfCharacter].photoUrl} className='banner-table-img'></img>
                            <p>{characters[indexOfCharacter].name} [{banner.gachaType}]</p>
                          </>
                        )
                      } else {
                        return null
                      }
                    })}
                  </td>
                  <td className='banner-table-detail'>{banner.startAt}</td>
                  <td className='banner-table-detail'>{banner.endAt}</td>
                  <td className='banner-table-detail'>{banner.globalStartAt}</td>
                  <td className='banner-table-detail'>
                    <button
                      className='add-remove-button'
                      onClick={() => {
                        handleAddToPlanner(banner)
                      }}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              )
            })}
          </table>
        </div>)}

      {showAll === false && filteredBanners.length > 0 && bannerRegion == 'EN' && (
        <div className='centered-container'>
          <table className='banner-table'>
            <th className='banner-table-header'>Rate ups</th>
            <th className='banner-table-header'>Start (EN)</th>
            <th className='banner-table-header'>End (EN)</th>


            {filteredBanners.map(banner => {
              return (
                <tr className='banner-table-row'>
                  <td className='banner-table-detail'>
                    {banner.rateups.map(rateup => {
                      const indexOfCharacter = characters.findIndex(character => character.name === rateup)
                      if (indexOfCharacter !== -1) {
                        return (
                          <>
                            <img src={characters[indexOfCharacter].photoUrl} className='banner-table-img'></img>
                            <p>{characters[indexOfCharacter].name} [{banner.gachaType}]</p>
                          </>
                        )
                      } else {
                        return null
                      }
                    })}
                  </td>
                  <td className='banner-table-detail'>{banner.startAt}</td>
                  <td className='banner-table-detail'>{banner.endAt}</td>
                </tr>
              )
            })}
          </table>
        </div>)}


      {showAll === false && filteredBanners.length == 0 && (
        <div className='centered-container'>
          <h1 className='text'>No results found</h1>
        </div>)}
      <p>API: https://api.ennead.cc/buruaka/banner and https://api.ennead.cc/buruaka/banner?region=japan</p>
    </div>
  )
}