import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSnackbar } from "notistack"

import useAppStore from "../../app/useAppStore"
import AuthenticationPayload from "../../types/authentication/AuthenticationPayload"
import AuthenticationResponse from "../../types/authentication/AuthenticationResponse"
import authenticationService from "../AuthenticationService"

export const TOKEN = "accessToken"

const useSignIn = () => {
  const { setAuthenticatedUser } = useAppStore()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation<AuthenticationResponse, AxiosError, AuthenticationPayload>({
    mutationFn: (authenticationPayload) => authenticationService.signIn(authenticationPayload),
    onSuccess: ({ user, token }) => {
      localStorage.setItem(TOKEN, token)
      setAuthenticatedUser(user)
      enqueueSnackbar(`Successfully signed in. Hello ${user.firstName}, we are happy to have you.`)
    },
    onError: () => {
      // you can return a semantic error message either from your backend
      // or use the status code and map it to a text message
      enqueueSnackbar("Sorry, we are unable to sign you in.")
    }
  })
}

export const useSignOut = () => {
  const { setAuthenticatedUser } = useAppStore()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: () => authenticationService.signOut(),
    onSuccess: () => {
      localStorage.removeItem(TOKEN)
      setAuthenticatedUser(null)
      enqueueSnackbar("Successfully signed out. See you soon.")
    },
    onError: () => {
      // you can return a semantic error message either from your backend
      // or use the status code and map it to a text message
      enqueueSnackbar("Sorry, we are unable to sign you out.")
    }
  })
}

export default useSignIn
