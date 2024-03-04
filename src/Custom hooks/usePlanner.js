import { useState } from "react"
import { auth } from "../config/firestore"
import TLBanners from "../resources/TLBanners"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../config/firestore"

export const usePlanner = () => {
  const [plannedBanners, setPlannedBanners] = useState([])

  const getPlannedBanners = async () => {
    if (auth.currentUser === null) {
      setPlannedBanners(JSON.parse(localStorage.getItem('plannedBanners')).sort((a, b) => b.startAt - a.startAt))
    } else {
      const docRef = doc(db, `${auth.currentUser.uid}'s collection`, `${auth.currentUser.uid}'s planned banners`)
      const docSnap = await (getDoc(docRef))
      const sortedBanners = docSnap.get('plannedBanners').sort((a, b) => a.startAt - b.startAt)
      setPlannedBanners(sortedBanners)
    }
  }

  return [plannedBanners, setPlannedBanners, getPlannedBanners]
}