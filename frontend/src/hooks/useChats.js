import { useEffect, useState } from 'react'
import customFetch from '../utils/customFetch'
import { useChatStore } from '../stores/chatStore'
import useAuth from './useAuth'

export default function useChats() {
  const [isError, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { refreshTokens } = useAuth()

  const { chats, setChats } = useChatStore()

  useEffect(() => {
    setIsLoading(true)

    customFetch({
      slug: '/chat',
      refreshTokens
    })
      .then(async (res) => await res.json())
      .then(json => setChats(json.chats))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }, [refreshTokens, setChats])

  return {
    data: chats,
    isError,
    isLoading
  }
}
