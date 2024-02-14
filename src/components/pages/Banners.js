import { useEffect, useState } from 'react'
import './Banners.css'
import axios from 'axios'
import TLBanners from '../../resources/TLBanners'

// TODO: Translate banners from japanese to english using google translate API, reimplement sorting logic + learn, and convert timestamps to dates.

export const Banners = () => {
  useEffect(() => {
    axios.get('https://api.ennead.cc/buruaka/banner').then((res) => {
      setCurrentBannerEN(res.data.current)
    })

    const sortedBanners = [...TLBanners.current, ...TLBanners.ended, ...TLBanners.upcoming].sort((a, b) => b.startAt - a.startAt)
    setAllBanners(sortedBanners.map(banner => {
      const startDate = new Date(banner.startAt)
      const startDay = startDate.toLocaleDateString()
      const startHour = startDate.toLocaleTimeString()
      const globalStartDate = new Date(banner.startAt)
      globalStartDate.setMonth(globalStartDate.getMonth() + 6)
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

  const [currentBannerJP, setCurrentBannerJP] = useState({})
  const [currentBannerEN, setCurrentBannerEN] = useState({})
  const [pastBanners, setPastBanners] = useState([])
  const [upcomingBanners, setUpcomingBanners] = useState([])
  const [allBanners, setAllBanners] = useState([])
  const [characters, setCharacters] = useState([])


  return (
    <div className='Banners'>
      <h2 className='text'>EN start times may not be entirely accurate, as they were calculated <br />
        under the assumption of a 6 month difference between servers</h2>
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
                          <img src={characters[indexOfCharacter].photoUrl} style={{ width: '160px', paddingTop: '50px' }}></img>
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
    </div>
  )
}





























































/* 
      const sortedBanners = allBanners.sort((a, b) => b.startAt - a.startAt)
      setAllBanners(sortedBanners.map((banner) => {
        const startDate = new Date(banner.startAt)
        const endDate = new Date(banner.endAt)
        const startDay = startDate.toLocaleDateString()
        const startHour = startDate.toLocaleTimeString()
        const endDay = endDate.toLocaleDateString()
        const endHour = endDate.toLocaleTimeString()
        return { ...banner, startAt: `${startDay}, ${startHour}`, endAt:  `${endDay}, ${endHour}` }
      }))

                <th>Rate ups</th>
          <th>Gacha type</th>
          <th>Start</th>
          <th>End</th>

          {allBanners.map(banner => {
            return (
              <tr>
                <td>
                  {banner.rateups.map(rateup => {
                    const indexOfCharacter = characters.findIndex(character => rateup == character.name)
                    if (indexOfCharacter !== -1) {
                      return <img src={characters[indexOfCharacter].photoUrl} width={'120vw'} />
                    } else {
                      return null
                    }
                  })}
                </td>
                <td>{banner.gachaType}</td>
                <td>{banner.startAt}</td>
                <td>{banner.endAt}</td>
              </tr>
            )
          })}
*/