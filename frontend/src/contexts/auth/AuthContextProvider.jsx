import { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import customFetch from '../../utils/customFetch'
import { useNavigate } from 'react-router-dom'

export default function AuthContextProvider ({ children }) {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === undefined) {
      customFetch({
        slug: '/auth/token/verify-access'
      })
        .then(async (res) => await res.json())
        .then((json) => {
          if (Object.hasOwn(json, 'user')) {
            setUser(json.user)
          } else {
            setUser(null)
          }
        })
        .catch(() => setUser(null))
    }
  // eslint-disable-next-line
  }, [])

  const signUp = async ({ name, username, password, confirmPassword }) => {
    if (!name.length || !username.length || !password.length || !confirmPassword.length) {
      throw new Error('Data is missing')
    }

    const newUserData = {
      name,
      username,
      password,
      confirmPassword
    }

    try {
      const res = await customFetch({
        slug: '/auth/signup',
        method: 'POST',
        body: newUserData
      })

      const data = await res.json()

      if (!res.ok) {
        return data
      }

      setUser(data)
    } catch (error) {
      throw new Error(error)

    }
  }

  const login = async ({ username, password }) => {
    if (!username || !password) {
      throw new Error('Username or password is missing')
    }
    try {
      const res = await customFetch({
        slug: '/auth/login',
        method: 'POST',
        body: {
          username,
          password
        }
      })

      const data = await res.json()

      if (!res.ok) {
        return data
      }

      setUser(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  const logout = async () => {
    try {
      const res = await customFetch({
        slug: '/auth/logout'
      })

      if (!res.ok) {
        throw new Error('Error when logout')
      }
      setUser(null)

      navigate('/login')
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, signUp, user }}>
      {children}
    </AuthContext.Provider>
  )
}
