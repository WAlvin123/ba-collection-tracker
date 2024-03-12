import { useState } from "react"

export const useLogin = () => {
  const [loggedin, setLoggedin] = useState(false)

  return [loggedin, setLoggedin]
}