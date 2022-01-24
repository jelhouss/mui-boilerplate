import { AxiosError } from "axios"
import create, { State, StateCreator, UseBoundStore } from "zustand"
import { devtools } from "zustand/middleware"

import authenticationClient from "../../services/AuthenticationClient"
import { AuthenticationPayload, AuthenticationResponse } from "../../types/authentication"
import { User } from "../../types/user"

const TOKEN = "authentication_token"

export interface AuthenticationState {
  user: Partial<User> | null
  setUser: (user: Partial<User>) => void
  signIn: (
    authenticationPayload: AuthenticationPayload
  ) => Promise<AuthenticationResponse | AxiosError>
  signOut: () => Promise<void>
}

const authenticationState: StateCreator<AuthenticationState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (authenticationPayload) => {
    const response = await authenticationClient.signIn(authenticationPayload)
    const { user, token } = response as AuthenticationResponse

    // set local storage
    localStorage.setItem(TOKEN, token)

    // set local state
    set({ user })

    return Promise.resolve(response)
  },
  signOut: async () => {
    await authenticationClient.signOut()

    // clear local state
    set({ user: null })

    // clear local storage
    localStorage.removeItem(TOKEN)
  }
})

function createStore<TState extends State>(
  state: StateCreator<TState>,
  name: string
): UseBoundStore<TState> {
  return create(devtools(state, { name }))
}

const useAuthenticationState = createStore(authenticationState, "Authentication State")

export default useAuthenticationState
