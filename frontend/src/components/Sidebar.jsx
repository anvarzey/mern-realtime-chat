import { FaMagnifyingGlass, FaPowerOff } from 'react-icons/fa6'
import NewChatModal from './NewChatModal'
import { useChatStore } from '../stores/chatStore'
import useChats from '../hooks/useChats'
import useSocket from '../hooks/useSocket'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FaVectorSquare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Sidebar () {
  const { currentChat, selectCurrentChat, unreadChats, setUnreadChats } = useChatStore()

  const { logout, user } = useAuth()

  const [search, setSearch] = useState('')

  const { data } = useChats()

  const { onlineUsers } = useSocket()

  const handleSelectChat = (chat) => {
    const sender = chat?.participants[0]

    if (unreadChats.includes(sender._id)) {
      setUnreadChats(unreadChats.filter(id => id !== sender._id))
    }

    selectCurrentChat(chat)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleLogout = async () => {
    try {
      await logout()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-base-200 text-base-content w-80 p-4 flex flex-col flex-nowrap h-screen overflow-hidden">
        <Link to='/' className="flex items-center justify-between pt-4 pb-8 h-20">
          <h2 className="text-2xl font-bold w-full flex items-center gap-4">
            <FaVectorSquare className='h-8 w-auto text-emerald-400 animate-spin-slow' />
            <div>React Realtime</div>
          </h2>
        </Link>

        <div className="flex items-center justify-between pb-4">
          <div className="input input-bordered flex items-center gap-4 w-10/12">
            <label htmlFor="search" className="cursor-pointer">
              <FaMagnifyingGlass />
            </label>
            <input
              type="text"
              className="grow"
              id="search"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
            />
          </div>
          <NewChatModal />
        </div>

        <div className='divider my-2' />

        <div className='grow overflow-auto'>
          {
            !!data && data.length
              ?
              <ul className="w-full space-y-1 h-fit overflow-hidden">
                {
                  data
                    .filter((chat) => chat?.participants[0]?.name.toLowerCase().includes(search.toLowerCase()))
                    .map((chat) => {
                      const sender = chat?.participants[0]

                      const isOnline = onlineUsers.includes(sender._id)
                      const isActive = currentChat && currentChat._id === chat._id
                      return (
                        <li key={sender._id} className="h-16">
                          <button
                            className={`flex gap-4 overflow-hidden h-full w-full ${isActive ? 'active' : ''}`}
                            onClick={() => handleSelectChat(chat)}
                          >
                            <div className="avatar">
                              <div className={`ring-offset-base-100 w-10 rounded-full ring ring-offset-2 ${isOnline ? 'ring-success' : 'ring-primary-content'}`}>
                                <img src={sender.avatar?.length ? sender.avatar : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <h6 className="font-semibold text-base">{sender.name}</h6>
                              </div>
                            </div>
                            {
                              unreadChats.includes(sender._id) &&
                              <div className="badge badge-primary badge-xs" />
                            }
                          </button>
                        </li>
                      )}
                    )
                }
              </ul>
              : <p className='w-full text-xl px-2'>
              No chats
              </p>
          }
        </div>

        <div className='divider my-2' />

        <div className='h-16 flex items-center justify-between pl-2'>
          {
            user && (
              <>
                <div className="flex items-center gap-5">
                  <div className="avatar">
                    <div className='ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ring-success'>
                      <img src={user.avatar?.length ? user.avatar : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                    </div>
                  </div>
                  <div className='text-xl font-semibold'>
                    {user.name}
                  </div>
                </div>
                <div className="tooltip" data-tip="Logout">
                  <button className='btn btn-outline btn-error btn-circle size-8 min-h-8' onClick={handleLogout}>
                    <FaPowerOff className='size-5' />
                  </button>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
