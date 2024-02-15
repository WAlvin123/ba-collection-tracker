import { useEffect, useState } from 'react'
import './Banners.css'
import axios from 'axios'
import TLBanners from '../../resources/TLBanners'

// TODO: get currentBanners from the API and render

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
  }, [])

  const [currentBannerEN, setCurrentBannerEN] = useState({})
  const [allBanners, setAllBanners] = useState([])
  const [characters, setCharacters] = useState([])


  return (
    <div className='Banners'>
      <h2 className='text'>EN start times may not be entirely accurate, as they were calculated <br />
        under the assumption of a 6 month difference between servers</h2>
      <p className='text'>Current banner (EN)</p>

      <div className='centered-container'>
        {currentBannerEN.length >= 0 && (
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
                              <img src={characters[indexOfCharacter].photoUrl} className='character-img'></img>
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
          </table>)}
      </div>
      <h1></h1>
      <div className='centered-container'>
        <table className='banner-table'>
          <th className='banner-table-header'>Rate ups</th>
          <th className='banner-table-header'>Gacha type</th>
          <th className='banner-table-header'>Start time (JP)</th>
          <th className='banner-table-header'>End time (JP)</th>
          <th className='banner-table-header'>Projected start time (EN)</th>
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
              </tr>
            )
          })}
        </table>
      </div>
      <p>API: https://api.ennead.cc/buruaka/banner and https://api.ennead.cc/buruaka/banner?region=japan</p>
    </div>
  )
}