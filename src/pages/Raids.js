import { useEffect, useState } from 'react'
import './Raids.css'
import axios from 'axios'

export const Raids = () => {
  const [globalRaids, setGlobalRaids] = useState([])
  const [jpRaids, setJpRaids] = useState([])

  useEffect(() => {
    fetch('https://api.ennead.cc/buruaka/raid').then(res => {
      return res.json()
    }).then(data => {
      const sortedGlobalRaids = [...data.current, ...data.upcoming, ...data.ended].sort((a, b) => b.startAt - a.startAt)
      setGlobalRaids(sortedGlobalRaids.map(raid => {
        const startDate = new Date(raid.startAt)
        const endDate = new Date(raid.endAt)
        const startDay = startDate.toLocaleDateString()
        const startHour = startDate.toLocaleTimeString()
        const endDay = endDate.toLocaleDateString()
        const endHour = endDate.toLocaleTimeString()
        return { ...raid, startAt: `${startDay}, ${startHour}`, endAt: `${endDay}, ${endHour}` }
      }))
    })
  }, [])


  return (
    <div className='Raids'>
      <table>
        <th>Boss</th>
        <th>Start time</th>
        <th>End time</th>
        {globalRaids.map(raid => {
          return (
            <tr>
              <td>{raid.bossName}</td>
              <td>{raid.startAt}</td>
              <td>{raid.endAt}</td>
            </tr>
          )
        })}
      </table>

    </div>
  )
}