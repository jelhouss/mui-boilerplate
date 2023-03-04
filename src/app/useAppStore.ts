import { PaletteMode } from "@mui/material"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

import User from "../shared/types/User"

type State = {
  authenticatedUser: User | null
  mode: PaletteMode
}

type Actions = {
  setAuthenticatedUser: (authenticatedUser: User | null) => void
  setMode: (mode: PaletteMode) => void
}

const initial: State = {
  authenticatedUser: null,
  mode: "light"
}

const useAppStore = create<State & Actions>()(
  devtools((set) => ({
    ...initial,

    setAuthenticatedUser: (authenticatedUser: User | null) => {
      set({ authenticatedUser })
    },

    setMode: (mode: PaletteMode) => {
      set({ mode })
    }
  }))
)

// This store is a minimal implementation of a wrapper for the user data
export default useAppStore
