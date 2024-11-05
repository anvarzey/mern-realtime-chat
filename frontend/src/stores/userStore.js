import { create } from 'zustand'

export const useUserStore = create((set) => ({
  usersWithoutChat: [],
  setUsersWithoutChat: (users) => set({ usersWithoutChat: users })
}))
