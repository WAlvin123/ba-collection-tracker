import { useState } from "react"
import { auth, db } from "../config/firestore"
import { doc, getDoc, setDoc } from "firebase/firestore"
import newCharacters from "../resources/characters"


export const useCharacter = () => {
  const [characters, setCharacters] = useState([])
  const [localCharacters, setLocalCharacters] = useState([])

  const getCharacters = async () => {
    if (auth.currentUser === null) {
      fetch('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120')
        .then(res => {
          return res.json()
        })
        .then(data => {
          const oldCharacters = data.data
          const allCharacters = [...oldCharacters, ...newCharacters].map(character => {
            return { ...character, clicked: false }
          })
          const sortedCharacters = allCharacters.sort((a, b) => a.name.localeCompare(b.name))
          const storedCharacters = JSON.parse(localStorage.getItem('characters'))
          if (storedCharacters) {
            if (storedCharacters.length < sortedCharacters.length) {
              localStorage.setItem('characters', JSON.stringify(sortedCharacters))
              setCharacters(sortedCharacters)
            } else {
              setCharacters(storedCharacters)
            }
          } else {
            setCharacters(sortedCharacters)
            localStorage.setItem('characters', JSON.stringify(sortedCharacters))
          }

        })
    } else {
      fetch('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120')
        .then(res => {
          return res.json()
        })
        .then(async data => {
          const oldCharacters = data.data
          const allCharacters = [...oldCharacters, ...newCharacters].map(character => {
            return { ...character, clicked: false }
          })
          const sortedCharacters = allCharacters.sort((a, b) => a.name.localeCompare(b.name))
          const docRef = doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s characters`)
          const docSnap = await getDoc(docRef)
          const dbCharacters = docSnap.get('characters')
          if (dbCharacters.length < sortedCharacters.length) {
            setDoc(doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s characters`), {
              characters: sortedCharacters
            }).then(setCharacters(dbCharacters))
          } else {
            setCharacters(dbCharacters)
          }
        })
    }
  }

  return [characters, setCharacters, getCharacters]
}