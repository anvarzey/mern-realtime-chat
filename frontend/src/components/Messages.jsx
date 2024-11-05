import { useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import useMessages from '../hooks/useMessages'
import { format } from 'date-fns'
import useSocket from '../hooks/useSocket'
import { useChatStore } from '../stores/chatStore'
import { useMessageStore } from '../stores/messageStore'

export default function Messages () {
  const { data, isLoading, isError } = useMessages()
  const { user } = useAuth()
  const containerRef = useRef(null)
  const lastMessageRef = useRef(null)

  const { currentChat, unreadChats, setUnreadChats } = useChatStore()
  const { messages, setMessages } = useMessageStore()

  const { socket } = useSocket()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const senderId = newMessage.senderId
      if (currentChat && currentChat.participants?.[0]._id === senderId) {
        setMessages([...messages, newMessage])
      } else if (!unreadChats.includes(senderId)) {
        setUnreadChats([...unreadChats, senderId])
      }
    })

    return () => socket?.off('newMessage')

  }, [currentChat, data, socket, messages, unreadChats, setMessages, setUnreadChats])

  useEffect(() => {
    if (!isLoading) {
      if (lastMessageRef.current) {
        setTimeout(() => {

          lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })

          lastMessageRef.current = null
        }, 500)
      }
    }
  }, [data, isLoading])

  if (isLoading) {
    return (
      <div className="w-full h-full grid place-content-center">
        <div className="loading loading-spinner size-12" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div>
      An error has been occurred
      </div>
    )
  }

  return (
    <ol className="px-6 py-4 h-full overflow-auto md:px-10" ref={containerRef}>
      {data.map((msg, i) => (
        <li
          key={msg._id}
          className={`chat ${msg.senderId === user.id ? 'chat-end' : 'chat-start'}`}
          ref={i === data.length - 1 ? lastMessageRef : null}
        >
          <div className={`chat-bubble ${msg.senderId === user.id ? 'chat-bubble-primary' : ''}`}>
            {msg.content}
          </div>
          <div className="chat-footer opacity-50">
            <time className="text-xs italic">
              {format(new Date(msg.createdAt), 'HH:mm')}
            </time>
          </div>
        </li>
      ))}
    </ol>
  )
}
