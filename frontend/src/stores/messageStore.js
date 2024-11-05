import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  messages: null,
  setMessages: (messages) => set({ messages })
}))