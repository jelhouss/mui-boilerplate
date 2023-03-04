import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSnackbar } from "notistack"

import RegistrationPayload from "../../types/registration/RegistrationPayload"
import RegistrationResponse from "../../types/registration/RegistrationResponse"
import registrationService from "../RegistrationService"

const useRegister = () => {
  const { enqueueSnackbar } = useSnackbar()

  return useMutation<RegistrationResponse, AxiosError, RegistrationPayload>({
    mutationFn: (registrationPayload) => registrationService.register(registrationPayload),
    onSuccess: () => {
      enqueueSnackbar("Successfully signed up! We are happy to have you.")
    },
    onError: () => {
      // you can return a semantic error message either from your backend
      // or use the status code and map it to a text message
      enqueueSnackbar("Sorry, we are unable to sign you up.")
    }
  })
}

export default useRegister
