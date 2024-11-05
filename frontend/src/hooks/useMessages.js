import { useEffect, useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import customFetch from '../utils/customFetch'
import useAuth from './useAuth'
import { useMessageStore } from '../stores/messageStore'

export default function useMessages() {
  const [isError, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { refreshTokens } = useAuth()

  const { messages, setMessages } = useMessageStore()

  const currentChat = useChatStore((state) => state.currentChat)

  useEffect(() => {
    setIsLoading(true)

    customFetch({
      slug: `/chat/${currentChat._id}`,
      refreshTokens
    })
      .then(async (res) => await res.json())
      .then((json) => setMessages(json.messages))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))

  }, [currentChat, refreshTokens, setMessages])

  return {
    data: messages,
    isError,
    isLoading
  }
}
