import { useEffect, useState } from 'react'
import { useUserStore } from '../stores/userStore'
import customFetch from '../utils/customFetch'
import useAuth from './useAuth'

export default function useUsersWithoutChat() {
  const [isError, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { refreshTokens } = useAuth()

  const { usersWithoutChat, setUsersWithoutChat } = useUserStore()

  useEffect(() => {
    setIsLoading(true)

    customFetch({
      slug: '/user/no-chat',
      refreshTokens
    })
      .then(async (res) => await res.json())
      .then((json) => setUsersWithoutChat(json.users))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))

  }, [refreshTokens, setUsersWithoutChat])

  return {
    data: usersWithoutChat,
    isLoading,
    isError
  }
}
