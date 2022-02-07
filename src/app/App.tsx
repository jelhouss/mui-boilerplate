import React, { useCallback, useEffect, useState } from "react"
import { useRoutes } from "react-router-dom"

import routes from "../router"
import authenticationClient from "../services/AuthenticationService"
import { refresh, TOKEN } from "../slices/authentication"
import { RootState, useAppDispatch, useAppSelector } from "./store"

const App = () => {
  const content = useRoutes(routes)

  const dispatch = useAppDispatch()

  const [appIsRefreshing, setAppIsRefreshing] = useState<boolean>(false)

  const { status, errorStatus } = useAppSelector((state: RootState) => state.authentication)

  const handleRefreshAuthentication = useCallback(() => dispatch(refresh()).unwrap(), [dispatch])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      // display a custom notification alert...
      // eslint-disable-next-line no-console
      console.error("Error while refreshing authentication with status %d", errorStatus)
    }
  }, [errorStatus, status])

  useEffect(() => {
    const handleRefresh = async () => {
      // begin refreshing
      setAppIsRefreshing(true)

      const token = localStorage.getItem(TOKEN)

      if (token) {
        authenticationClient.setAccessToken(token)

        // refresh authentication
        await handleRefreshAuthentication()
        // add more refreshing logic...
      }

      // app can start
      setAppIsRefreshing(false)
    }

    handleRefresh()
  }, [handleRefreshAuthentication])

  return appIsRefreshing ? <p>Application is refreshing...</p> : content
}

export default App
