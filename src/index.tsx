import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { SnackbarProvider } from "notistack"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./app/App"
import store from "./app/store"
import BrandingProvider from "./BrandingProvider"
import reportWebVitals from "./reportWebVitals"

// I had an issue when testing offline MSW API with refreshing authentication
// API endpoint `/api/authenticate/refresh` was not found by MSW
// see: https://mswjs.io/docs/recipes/deferred-mounting
function boostrapMSWRegistration() {
  if (process.env.REACT_APP_OFFLINE) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const worker = require("./mocks/msw/browserMSWSetup").default
    worker.printHandlers()
    return worker.start()
  }

  return Promise.resolve()
}

boostrapMSWRegistration().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <BrandingProvider>
            <SnackbarProvider
              hideIconVariant
              preventDuplicate
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
                    {message}
                  </Box>
                </Paper>
              )}>
              <App />
            </SnackbarProvider>
          </BrandingProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
