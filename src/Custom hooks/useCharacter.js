import { useState } from "react"
import { auth, db } from "../config/firestore"
import { doc, getDoc } from "firebase/firestore"
import newCharacters from "../resources/characters"

export const useCharacter = () => {
  const [characters, setCharacters] = useState([])

  const getCharacters = async () => {
    if (auth.currentUser === null) {
      const storedCharacters = JSON.parse(localStorage.getItem('characters'))
      if (storedCharacters) {
        setCharacters(storedCharacters)
      } else {
        fetch('https://api-blue-archive.vercel.app/api/characters?page=1&perPage=120')
          .then(res => {
            return res.json()
          })
          .then(data => {
            const oldCharacters = data.data
            const allCharacters = [...oldCharacters, ...newCharacters].map(character => {
              return { ...character, clicked: false }
            })
            setCharacters(allCharacters)
            localStorage.setItem('characters', JSON.stringify(allCharacters))
          })
      }
    } else {
      const docRef = doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s characters`)
      const docSnap = await getDoc(docRef)
      setCharacters(docSnap.get('characters'))
    }
  }

  return [characters, setCharacters, getCharacters]
}