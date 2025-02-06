import { useState } from 'react'
import './FilterBar.css'

export const FilterBar = ({ handleFilterBySchool, handlePulled, handleNotPulled, handleFilterByDmg, setShowAll }) => {
  const [buttonStates, setButtonStates] = useState({
    b1State: false,
    b2State: false,
    b3State: false,
    b4State: false,
    b5State: false,
    b6State: false,
    b7State: false,
    b8State: false,
    b9State: false,
    b10State: false,
    b11State: false,
    b12State: false,
    b13State: false,
    b14State: false,
    b15State: false,
    b16State: false
  })

  return (
    <div>
        <div className="school-filter-container">
          <button
            onClick={() => {
              handleFilterBySchool('Abydos')
              setButtonStates({ ...buttonStates, b1State: !buttonStates.b1State })
              console.log(localStorage.getItem('confirmVisible'))
            }}
            className={buttonStates.b1State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/9/91/Abydos.png/50px-Abydos.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Arius')
              setButtonStates({ ...buttonStates, b2State: !buttonStates.b2State })
            }}
            className={buttonStates.b2State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/9/93/Arius.png/50px-Arius.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Gehenna')
              setButtonStates({ ...buttonStates, b3State: !buttonStates.b3State })
            }}
            className={buttonStates.b3State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/b/bd/Gehenna.png/50px-Gehenna.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Hyakkiyako')
              setButtonStates({ ...buttonStates, b4State: !buttonStates.b4State })
            }}
            className={buttonStates.b4State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/3/36/Hyakkiyako.png/50px-Hyakkiyako.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Millennium')
              setButtonStates({ ...buttonStates, b5State: !buttonStates.b5State })
            }}
            className={buttonStates.b5State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/2/2a/Millennium.png/50px-Millennium.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Red Winter')
              setButtonStates({ ...buttonStates, b6State: !buttonStates.b6State })
            }}
            className={buttonStates.b6State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/8/8b/Red_Winter.png/50px-Red_Winter.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Shanhaijing')
              setButtonStates({ ...buttonStates, b7State: !buttonStates.b7State })
            }}
            className={buttonStates.b7State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/b/be/Shanhaijing.png/50px-Shanhaijing.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('SRT')
              setButtonStates({ ...buttonStates, b8State: !buttonStates.b8State })
            }}
            className={buttonStates.b8State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/5/5a/SRT.png/50px-SRT.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Trinity')
              setButtonStates({ ...buttonStates, b9State: !buttonStates.b9State })
            }}
            className={buttonStates.b9State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/9/9c/Trinity.png/50px-Trinity.png' />
          </button>
          <button
            onClick={() => {
              handleFilterBySchool('Valkyrie')
              setButtonStates({ ...buttonStates, b10State: !buttonStates.b10State })
            }}
            className={buttonStates.b10State ? 'school-filter-button-clicked' : 'school-filter-button-unclicked'}
          >
            <img src='https://static.miraheze.org/bluearchivewiki/thumb/d/d5/Valkyrie.png/50px-Valkyrie.png' />
          </button>
        </div>
        <div style={{paddingTop:'15px'}}>
          <button
            onClick={() => {
              handleFilterByDmg('Explosive')
              setButtonStates({ ...buttonStates, b12State: !buttonStates.b12State })
            }}
            className={buttonStates.b12State ? 'explosive-clicked' : 'explosive-unclicked'}
          >EXPLOSIVE</button>
          <button
            onClick={() => {
              handleFilterByDmg('Penetration')
              setButtonStates({ ...buttonStates, b13State: !buttonStates.b13State })
            }}
            className={buttonStates.b13State ? 'piercing-clicked' : 'piercing-unclicked'}
          >PIERCING</button>
          <button
            onClick={() => {
              handleFilterByDmg('Mystic')
              setButtonStates({ ...buttonStates, b14State: !buttonStates.b14State })
            }}
            className={buttonStates.b14State ? 'mystic-clicked' : 'mystic-unclicked'}
          >MYSTIC</button>
          <button
            onClick={() => {
              handleFilterByDmg('Sonic')
              setButtonStates({ ...buttonStates, b15State: !buttonStates.b15State })
            }}
            className={buttonStates.b15State ? 'sonic-clicked' : 'sonic-unclicked'}
          >SONIC</button>
          <button
            className={buttonStates.b11State ? 'owned-filter-button-clicked' : 'owned-filter-button-unclicked'}
            onClick={() => {
              handlePulled()
              setButtonStates({ ...buttonStates, b11State: !buttonStates.b11State })
              if (buttonStates.b16State == true) {
                setButtonStates({ ...buttonStates, b16State: false, b11State: !buttonStates.b11State })
              }
            }}
          >Owned</button>
          <button
            className={buttonStates.b16State ? 'owned-filter-button-clicked' : 'owned-filter-button-unclicked'}
            onClick={() => {
              handleNotPulled()
              setButtonStates({ ...buttonStates, b16State: !buttonStates.b16State })
              if (buttonStates.b11State == true) {
                setButtonStates({ ...buttonStates, b11State: false, b16State: !buttonStates.b16State })
              }
            }}
          >Not Owned</button>
          <button
            className='owned-filter-button-unclicked'
            onClick={() => {
              setShowAll(true)
              setButtonStates(
                {
                  b1State: false,
                  b2State: false,
                  b3State: false,
                  b4State: false,
                  b5State: false,
                  b6State: false,
                  b7State: false,
                  b8State: false,
                  b9State: false,
                  b10State: false,
                  b11State: false
                }
              )
            }}
          >Show all</button>
        </div>
    </div>
  )
}