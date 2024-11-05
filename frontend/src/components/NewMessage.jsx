import { useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import customFetch from '../utils/customFetch'
import useAuth from '../hooks/useAuth'
import { useMessageStore } from '../stores/messageStore'
import { FaRegFaceSmile, FaRegPaperPlane } from 'react-icons/fa6'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function NewMessage() {
  const currentChat = useChatStore((state) => state.currentChat)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { refreshTokens } = useAuth()
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const { messages, setMessages } = useMessageStore()

  const handleMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newMessage.length) {
      setIsLoading(true)
      customFetch({
        slug: `/chat/${currentChat._id}`,
        method: 'POST',
        body: {
          message: newMessage
        },
        refreshTokens
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error('An error has been occurred')
          }

          setNewMessage('')

          const json = await res.json()

          setMessages([...messages, json.message])

          return res
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }

  }

  const toggleEmojiPicker = () => {
    setIsPickerOpen(prev => !prev)
  }

  const handleEmojiPick = (emoji) => {
    setNewMessage(prev => prev + emoji.native)
  }

  return (
    <form onSubmit={handleSubmit} className='grow flex items-center gap-2 px-2 md:gap-8 md:px-10'>
      <div className='relative w-fit'>
        {
          isPickerOpen && (
            <div className='absolute left-0 top-[-450px]'>
              <Picker data={data} onEmojiSelect={handleEmojiPick} previewPosition='none' />
            </div>

          )
        }
        <button
          className='btn btn-ghost btn-circle'
          onClick={toggleEmojiPicker}
          type='button'
        >
          <FaRegFaceSmile className='size-6' />
        </button>
      </div>
      <div className='divider divider-horizontal mx-0' />
      <textarea
        onChange={handleMessage}
        className='textarea textarea-bordered resize-none w-full'
        placeholder='Type your message...'
        rows={1}
        value={newMessage}
        disabled={isLoading}
      ></textarea>
      <button
        className='btn btn-success'
        type='submit'
        disabled={!newMessage.length || isLoading}
      >
        {
          isLoading
            ? <span className='loading loading-spinner' />
            : <FaRegPaperPlane className='size-5' />
        }
      </button>
    </form>
  )
}
