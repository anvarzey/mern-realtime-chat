import { useContext } from 'react'
import SocketContext from '../contexts/socket/SocketContext'

export default function useSocket() {
  const context = useContext(SocketContext)

  return context
}