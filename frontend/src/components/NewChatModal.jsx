import { useRef, useState } from 'react'
import { FaMagnifyingGlass, FaPlus, FaXmark } from 'react-icons/fa6'
import useUsersWithoutChat from '../hooks/useUsersWithoutChat'
import customFetch from '../utils/customFetch'
import { useChatStore } from '../stores/chatStore'
import { useUserStore } from '../stores/userStore'
import useSocket from '../hooks/useSocket'
import useAuth from '../hooks/useAuth'

export default function NewChatModal () {
  const { data, isLoading } = useUsersWithoutChat()
  const [newChatLoading, setNewChatLoading] = useState(false)

  const [search, setSearch] = useState('')

  const { usersWithoutChat, setUsersWithoutChat } = useUserStore()

  const { onlineUsers } = useSocket()

  const { refreshTokens } = useAuth()

  const { chats, setChats, selectCurrentChat } = useChatStore()
  const modalRef = useRef(null)

  const handleOpenModal = () => {
    modalRef.current.showModal()
  }

  const handleCreateChat = async (userId) => {
    setNewChatLoading(true)
    // Request create chat
    await customFetch({
      slug: '/chat',
      method: 'POST',
      body: {
        userId
      },
      refreshTokens
    })
      .then(async (res) => await res.json())
      .then((json) => {
        setChats([json.chat, ...chats])
        selectCurrentChat(json.chat)

        modalRef.current.close()

        const updatedUsers = usersWithoutChat.filter((userWithoutChat) => userWithoutChat._id !== userId)

        setUsersWithoutChat(updatedUsers)
      })
      .catch((err) => console.error({ err }))
      .finally(() => setNewChatLoading(false))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="tooltip tooltip-left" data-tip="Add new chat">
        <button
          className="btn btn-secondary btn-circle size-8 min-h-fit"
          onClick={handleOpenModal}
        >
          <FaPlus />
        </button>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
              <FaXmark className="size-6" />
            </button>
          </form>
          {
            isLoading
              ? (
                <div className='size-full grid place-content-center'>
                  <div className='loading loading-spinner size-10' />
                </div>
              )
              : (
                data &&
                data.length
                  ?
                  <>
                    <h3 className="font-bold text-xl mb-4">Create new chat</h3>
                    <div className="input input-bordered flex items-center gap-4">
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
                    <ul className="py-4 space-y-4">
                      {
                        data
                          .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
                          .map((user) => (
                            <li key={user._id}>
                              <button
                                className="flex gap-4 overflow-hidden h-full w-full"
                                onClick={() => handleCreateChat(user._id)}
                              >
                                <div className="avatar">
                                  <div className={`ring-offset-base-100 w-10 rounded-full ring ring-offset-2 ${onlineUsers.includes(user._id) ? 'ring-success' : 'ring-primary-content'}`}>
                                    <img src={user.avatar.length ? user.avatar : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                                  </div>
                                </div>
                                <div className="">
                                  <h6 className="font-semibold text-lg">{user.name}</h6>
                                </div>
                              </button>
                            </li>
                          ))
                      }
                    </ul>
                    {
                      newChatLoading
                        ? (
                          <div className='h-screen w-screen bg-base-100/30 fixed grid place-content-center'>
                            <div className='loading loading-spinner size-12' />
                          </div>
                        )
                        : <></>
                    }
                  </>
                  : (
                    <div className='text-lg'>
                    No users to add
                    </div>
                  )
              )
          }
        </div>
      </dialog>
    </>
  )
}
