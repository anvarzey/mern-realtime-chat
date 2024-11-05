import useSocket from '../hooks/useSocket'
import { useChatStore } from '../stores/chatStore'

export default function Navbar () {
  const currentChat = useChatStore((state) => state.currentChat)
  const { onlineUsers } = useSocket()

  return (
    <div className="mx-2 px-2 h-full">
      {
        currentChat
          ? (
            <div className='flex items-center gap-5'>
              <div className="avatar">
                <div className='size-12 rounded-full'>
                  <img src={currentChat.participants[0].avatar} />
                </div>
              </div>
              <div className="flex-col justify-center">
                <h2 className='text-lg font-semibold leading-none'>{currentChat.participants[0].name}</h2>
                {
                  onlineUsers.includes(currentChat.participants[0]._id) &&
                    <span className='italic text-sm'>Online</span>
                }
              </div>
            </div>
          )
          : <div />
      }
    </div>
  )
}
