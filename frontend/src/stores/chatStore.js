import { create } from 'zustand'

export const useChatStore = create((set) => ({
  currentChat: null,
  selectCurrentChat: (chat) => set({ currentChat: chat }),
  chats: [],
  setChats: (chats) => set({ chats }),
  unreadChats: [],
  setUnreadChats: (unreadChats) => set({ unreadChats }),
}))
