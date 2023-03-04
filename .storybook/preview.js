import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { initialize, mswDecorator } from "msw-storybook-addon"

import handlers from "../src/mocks/handlers"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

// Initialize MSW
initialize({ onUnhandledRequest: "warn" })

export const decorators = [
  // Provide the MSW addon decorator globally
  mswDecorator,

  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },

  // MSW handlers will be applied in every story
  msw: { handlers }
}
