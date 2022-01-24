import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import PublicLayout from "../pages/public"

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      // data will be considered stale (needs to automatically re-fetch) after 5 mins
      staleTime: 1000 * 60 * 5
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryCache}>
      <PublicLayout />
    </QueryClientProvider>
  )
}

export default App
