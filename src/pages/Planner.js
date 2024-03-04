import { useEffect, useState } from "react"
import './Planner.css'
import { useCharacter } from "../Custom hooks/useCharacter"
import { usePlanner } from "../Custom hooks/usePlanner"
import { auth, db } from "../config/firestore"
import { doc, setDoc } from "firebase/firestore"

export const Planner = () => {
  useEffect(() => {
    getCharacters()
    getPlannedBanners()
    localStorage.setItem('page', 'planner')
  }, [])

  const [plannedBanners, setPlannedBanners, getPlannedBanners] = usePlanner()
  const [characters, setCharacters, getCharacters] = useCharacter()

  const handleRemove = (idToRemove) => {
    if (auth.currentUser === null) {
      setPlannedBanners(prevBanners => {
        const updatedBanners = prevBanners.filter(banner => banner.id !== idToRemove)
        localStorage.setItem('plannedBanners', JSON.stringify(updatedBanners))
        return updatedBanners
      })
    } else {
      const updatedBanners = plannedBanners.filter(banner => banner.id !== idToRemove)
      setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s planned banners`), {
        plannedBanners: updatedBanners
      }).then(() => {
        getPlannedBanners()
      })
    }
  }

  return (
    <div>
      <div className="Planner">
        <>
          <h1></h1>
          <div className="banner-search-container">
            <p className="planner-text">Upcoming Planned Banners  : {plannedBanners.length}</p>
            <p className="planner-text">Projected Cost  : {plannedBanners.length * 24000} <img src='https://static.miraheze.org/bluearchivewiki/3/3b/Currency_Icon_Gem.png' className="pyro-img"></img></p>
          </div>
          <h1></h1>
          {plannedBanners.length !== 0 && (
            <div className='centered-container'>
              <table className='banner-table'>
                <th className='banner-table-header'>Rate ups</th>
                <th className='banner-table-header'>Start (JP)</th>
                <th className='banner-table-header'>End (JP)</th>
                <th className='banner-table-header'>Start (EN)</th>
                <th className='banner-table-header'>Planner</th>
                {plannedBanners.map(banner => {
                  return (
                    <tr className='banner-table-row'>
                      <td className='banner-table-detail'>
                        {banner.rateups.map(rateup => {
                          const indexOfCharacter = characters.findIndex(character => rateup === character.name)
                          if (indexOfCharacter !== 1) {
                            return (
                              <div>
                                <img src={characters[indexOfCharacter].photoUrl} className='banner-table-img'></img>
                                <p>{rateup} [{banner.gachaType}]</p>
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
                          className='add-remove-button'
                          onClick={() => { handleRemove(banner.id) }}
                        >Remove</button>
                      </td>
                    </tr>
                  )
                })
                }
              </table>
            </div>
          )}

          {plannedBanners.length === 0 && (
            <h1>No upcoming banners...</h1>
          )}
          <h1></h1>
        </>
      </div>
    </div>
  )
}