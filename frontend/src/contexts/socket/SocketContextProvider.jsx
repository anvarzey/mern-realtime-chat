import { useEffect, useState } from 'react'
import SocketContext from './SocketContext'
import useAuth from '../../hooks/useAuth'
import io from 'socket.io-client'

export default function SocketContextProvider ({ children }) {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  const { user } = useAuth()

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    if (user) {
      const socketClient = io(API_BASE_URL, {
        query: {
          userId: user.id
        }
      })

      setSocket(socketClient)

      socketClient.on('getOnlineUsers', (users) => {
        setOnlineUsers(users)

      })


      return () => socketClient.disconnect()
      // socketClient.close()

    } else {
      if (socket) {
        setSocket(null)
        socket.disconnect()
      }
    }
    // eslint-disable-next-line
  }, [API_BASE_URL, user])

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  )
}
