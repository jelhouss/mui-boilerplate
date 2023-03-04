import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SnackbarProvider } from "notistack"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./app/App"
import BrandingProvider from "./app/BrandingProvider"
import reportWebVitals from "./reportWebVitals"

if (process.env.REACT_APP_OFFLINE) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockWorker = require("./mocks/mockWorker").default
  mockWorker.printHandlers()
  mockWorker.start({ onUnhandledRequest: "warn" })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrandingProvider>
        <SnackbarProvider
          hideIconVariant
          preventDuplicate
          disableWindowBlurListener
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          content={(key, message) => (
            <Paper key={key}>
              <Box
                sx={(theme) => ({
                  p: 4,
                  boxShadow: `0px 4px 20px ${
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.5)"
                      : "rgba(170, 180, 190, 0.3)"
                  }`
                })}>
                <Typography variant="body1">{message}</Typography>
              </Box>
            </Paper>
          )}>
          <App />
        </SnackbarProvider>
      </BrandingProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
