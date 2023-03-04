import MUILink from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { useSnackbar } from "notistack"
import * as React from "react"
import { Link, RouterProvider } from "react-router-dom"

import browserRouter from "./browserRouter"
import FullPageDisplayError from "../components/FullPageDisplayError"
import FullPageLoadingSpinner from "../components/FullPageLoadingSpinner"
import { TOKEN } from "../services/queries/authenticationQuery"
import useMe from "../services/queries/userQuery"
import userService from "../services/UserService"

const token = localStorage.getItem(TOKEN)

const ErrorMessage = () => (
  <Typography variant="body2">
    Unable to get you back in automatically. We are very sorry. Please{" "}
    <MUILink component={Link} to="/sign-in" replace>
      sign in
    </MUILink>{" "}
    again manually.
  </Typography>
)

const App = () => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    isError: isGetMeError,
    isInitialLoading: isGetMeInitialLoading,
    refetch
  } = useMe({
    enabled: false
  })

  React.useEffect(() => {
    if (token) {
      userService.setAccessToken(token)
      refetch()
    }

    if (isGetMeInitialLoading) {
      enqueueSnackbar("Getting you back in. Please wait...")
    }
  }, [enqueueSnackbar, isGetMeInitialLoading, refetch])

  return isGetMeInitialLoading ? (
    <FullPageLoadingSpinner />
  ) : isGetMeError ? (
    <FullPageDisplayError title="Sorry, something happened.">
      <ErrorMessage />
    </FullPageDisplayError>
  ) : (
    <React.Suspense fallback={<FullPageLoadingSpinner />}>
      <RouterProvider router={browserRouter} />
    </React.Suspense>
  )
}

export default App
