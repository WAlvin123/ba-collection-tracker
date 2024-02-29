import { useState } from "react"
import { auth, db } from "../config/firestore"
import { doc, getDoc } from "firebase/firestore"
import axios from "axios"
import newCharacters from "../resources/characters"

export const useCharacter = () => {
  const [characters, setCharacters] = useState([])

  const getCharacters = async () => {
    if (auth.currentUser === null) {
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
    } else {
      const docRef = doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s data`)
      const docSnap = await getDoc(docRef)
      setCharacters(docSnap.get('characters'))
    }
  }

  return [characters, setCharacters, getCharacters]
}