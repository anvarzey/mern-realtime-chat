import Messages from '../components/Messages'
import { useChatStore } from '../stores/chatStore'
import ChattingIllustration from '../assets/chatting.svg'
import NewMessage from '../components/NewMessage'

export default function ChatPage () {
  const currentChat = useChatStore((state) => state.currentChat)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="grow h-full overflow-hidden">
        {
          currentChat
            ? <Messages />
            : (
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='h-60'>
                  <img
                    src={ChattingIllustration}
                    alt="Chatting illustration"
                    className='h-full w-auto'
                    loading='lazy'
                  />
                </div>
                <p className='text-2xl'>
                  Select a chat and make new friends!
                </p>
              </div>
            )
        }
      </div>
      <div className="bg-base-200 py-2 h-24 flex items-center">
        {
          currentChat && (
            <NewMessage />
          )
        }
      </div>
    </div>
  )
}
