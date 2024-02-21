import { useEffect, useState } from "react"
import './Planner.css'

export const Planner = () => {
  useEffect(() => {
    const storedPlannedBanners = JSON.parse(localStorage.getItem('plannedBanners'))
    if (storedPlannedBanners) {
      const sortedBanners = storedPlannedBanners.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
      setPlannedBanners(sortedBanners)
    } else {
      setPlannedBanners([])
    }

    const storedCharacters = JSON.parse(localStorage.getItem('characters'))
    setCharacters(storedCharacters)
  }, [])

  const [plannedBanners, setPlannedBanners] = useState([])
  const [characters, setCharacters] = useState([])

  const handleRemove = (idToRemove) => {
    setPlannedBanners(prevBanners => {
      const updatedBanners = prevBanners.filter(banner => banner.id !== idToRemove)
      localStorage.setItem('plannedBanners', JSON.stringify(updatedBanners))
      return updatedBanners
    })
  }

  return (
    <div className="Planner">
      <>
        <p className='text'>Upcoming Planned Banners  : {plannedBanners.length}</p>
        <p className='text'>Projected Cost  : {plannedBanners.length * 24000} <img src='https://static.miraheze.org/bluearchivewiki/3/3b/Currency_Icon_Gem.png' className="pyro-img"></img></p>

        <div className='centered-container'>
          <table className='banner-table'>
            <th className='banner-table-header'>Rate ups</th>
            <th className='banner-table-header'>Start time</th>
            <th className='banner-table-header'>End time</th>
            <th className='banner-table-header'>Projected Start Time (EN)</th>
            <th className='banner-table-header'>Remove From Planner</th>

            {
              plannedBanners.map(banner => {
                return (
                  <tr className='banner-table-row'>
                    <td className='banner-table-detail'>
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
                    <td className='current-table-detail'>{banner.globalStartAt}</td>
                    <td>
                      <button
                        className='search-button'
                        onClick={() => { handleRemove(banner.id) }}
                      >Remove</button>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <h1></h1>
      </>
    </div>
  )
}