import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSnackbar } from "notistack"

import useAppStore from "../../app/useAppStore"
import GetMeResponse from "../../types/authentication/GetMeResponse"
import userService from "../UserService"

const useMe = ({ enabled }: UseQueryOptions<GetMeResponse, AxiosError>) => {
  const { setAuthenticatedUser } = useAppStore()
  const { enqueueSnackbar } = useSnackbar()

  return useQuery<GetMeResponse, AxiosError>({
    queryKey: ["user/me"],
    queryFn: () => userService.me(),
    onSuccess: ({ user }) => {
      setAuthenticatedUser(user)
    },
    onError: () => {
      // you can return a semantic error message either from your backend
      // or use the status code and map it to a text message
      enqueueSnackbar("Sorry, we are unable to get current user information.")
    },
    enabled
  })
}

export default useMe
