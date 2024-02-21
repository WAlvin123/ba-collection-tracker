import { useEffect, useState } from 'react'
import './Banners.css'
import TLBanners from '../resources/TLBanners'
import { all } from 'axios'

// TODO: improve search functionality by displaying all rate ups which includes search input by string input and not by array object comparison

export const Banners = () => {

  useEffect(() => {
    fetch('https://api.ennead.cc/buruaka/banner').then(res => {
      return res.json()
    }).then(data => {
      setCurrentBannerEN(data.current.map(banner => {
        const currentStartDate = new Date(banner.startAt)
        const currentStartDay = currentStartDate.toLocaleDateString()
        const currentStartHour = currentStartDate.toLocaleTimeString()
        const currentEndDate = new Date(banner.endAt + 1)
        const currentEndDay = currentEndDate.toLocaleDateString()
        const currentEndHour = currentEndDate.toLocaleTimeString()
        return { ...banner, startAt: `${currentStartDay}, ${currentStartHour}`, endAt: `${currentEndDay}, ${currentEndHour}` }
      }))
    })

    const sortedBanners = [...TLBanners.current, ...TLBanners.ended, ...TLBanners.upcoming].sort((a, b) => b.startAt - a.startAt)
    setAllBanners(sortedBanners.map(banner => {
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

    const storedCharacters = JSON.parse(localStorage.getItem('characters'))
    if (storedCharacters) {
      setCharacters(storedCharacters)
    }

    const storedPlannedBanners = JSON.parse(localStorage.getItem('plannedBanners'))
    if (storedPlannedBanners) {
      setPlannedBanners(storedPlannedBanners)
    } else {
      setPlannedBanners([])
    }
  }, [])

  const [currentBannerEN, setCurrentBannerEN] = useState({})
  const [allBanners, setAllBanners] = useState([])
  const [characters, setCharacters] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredBanners, setFilteredBanners] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [plannedBanners, setPlannedBanners] = useState([''])

  const handleSearch = () => {
    const lowerCaseBanners = allBanners.map(banner => {
      const lowercaseRateups = banner.rateups.map(rateup => {
        return rateup.toLowerCase()
      })
      return { ...banner, rateups: lowercaseRateups }
    })

    const splitBanners = lowerCaseBanners.map(banner => {
      const splitRateups = banner.rateups.join(',')
      return { ...banner, rateups: splitRateups }
    })

    setFilteredBanners(splitBanners.filter(banner => banner.rateups.includes(searchInput.toLowerCase())).map(banner => {
      return { ...banner, rateups: banner.rateups.split(',') }
    }))
  }

  const handleAddToPlanner = (banner) => {
    if (plannedBanners.some(existingBanner => existingBanner.startAt === banner.startAt && existingBanner.endAt === banner.endAt && existingBanner.rateups === banner.rateups)) {
      console.log('This banner is already in the planner ')
    } else {
      setPlannedBanners(prevBanners => {
        const updatedBanners = [...prevBanners, { ...banner, id: Math.random() }]
        localStorage.setItem('plannedBanners', JSON.stringify(updatedBanners))
        return updatedBanners
      })
    }
  }

  return (
    <div className='Banners'>
      <h2 className='text'>EN start times may not be entirely accurate, as they were calculated <br />
        under the assumption of a 6 month difference between servers</h2>
      <p className='text'>Got a specific rate up you're looking for?</p>
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
        }} />
      <button className='search-button' onClick={() => {
        setShowAll(false)
        handleSearch()
      }}>Search</button>
      <h1></h1>
      {showAll === false && (
        <button className='search-button' onClick={() => {
          setShowAll(true)
          setSearchInput('')
        }}>Return</button>
      )}
      <h1></h1>

      {currentBannerEN.length >= 0 && showAll === true && (
        <>
          <p className='text'>Current banner (EN)</p>
          <div className='centered-container'>
            <table className='current-table'>
              <th className='current-table-header'>Rate ups</th>
              <th className='current-table-header'>Start time</th>
              <th className='current-table-header'>End time</th>
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

      {showAll === true && (
        <>
          <p className='text'>All Banners (JP)</p>
          <div className='centered-container'>
            <table className='banner-table'>
              <th className='banner-table-header'>Rate ups</th>
              <th className='banner-table-header'>Gacha type</th>
              <th className='banner-table-header'>Start time (JP)</th>
              <th className='banner-table-header'>End time (JP)</th>
              <th className='banner-table-header'>Projected start time (EN)</th>
              <th className='banner-table-header'>Add to Planner</th>
              {allBanners.map(banner => {
                return (
                  <tr className='banner-table-row'>
                    <td className='banner-table-detail'>
                      {banner.rateups.map(rateup => {
                        const indexOfCharacter = characters.findIndex(character => character.name === rateup)
                        if (indexOfCharacter !== -1) {
                          return (
                            <>
                              <img src={characters[indexOfCharacter].photoUrl} className='character-img'></img>
                              <p>{rateup}</p>
                            </>
                          )
                        } else {
                          return null
                        }
                      })}
                    </td>
                    <td className='banner-table-detail'>{banner.gachaType}</td>
                    <td className='banner-table-detail'>{banner.startAt}</td>
                    <td className='banner-table-detail'>{banner.endAt}</td>
                    <td className='banner-table-detail'>{banner.globalStartAt}</td>
                    <td className='banner-table-detail'>
                      <button
                        className='search-button'
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

      {showAll === false && filteredBanners.length > 0 && (
        <div className='centered-container'>
          <table className='banner-table'>
            <th className='banner-table-header'>Rate ups</th>
            <th className='banner-table-header'>Gacha type</th>
            <th className='banner-table-header'>Start time (JP)</th>
            <th className='banner-table-header'>End time (JP)</th>
            <th className='banner-table-header'>Projected start time (EN)</th>
            {filteredBanners.map(banner => {
              return (
                <tr className='banner-table-row'>
                  <td className='banner-table-detail'>
                    {banner.rateups.map(rateup => {
                      const indexOfCharacter = characters.findIndex(character => character.name.toLowerCase() === rateup)
                      if (indexOfCharacter !== -1) {
                        return (
                          <>
                            <img src={characters[indexOfCharacter].photoUrl} className='character-img'></img>
                            <p>{characters[indexOfCharacter].name}</p>
                          </>
                        )
                      } else {
                        return null
                      }
                    })}
                  </td>
                  <td className='banner-table-detail'>{banner.gachaType}</td>
                  <td className='banner-table-detail'>{banner.startAt}</td>
                  <td className='banner-table-detail'>{banner.endAt}</td>
                  <td className='banner-table-detail'>{banner.globalStartAt}</td>
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