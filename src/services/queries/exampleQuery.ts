import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import ExamplePayload from "../../types/example/ExamplePayload"
import ExampleResponse from "../../types/example/ExampleResponse"
import exampleService from "../ExampleService"

const useGetTipsExample = () => {
  return useQuery<ExampleResponse[], AxiosError>({
    queryKey: ["example/tip"],
    queryFn: () => exampleService.getTips()
  })
}

export const useTipExample = () => {
  const queryClient = useQueryClient()

  return useMutation<ExampleResponse, AxiosError, ExamplePayload>({
    mutationFn: (examplePayload) => exampleService.tip(examplePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["example/tip"] })
    }
  })
}

export default useGetTipsExample
