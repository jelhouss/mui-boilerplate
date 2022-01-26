/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"

import useAuthenticationState from "../app/store/useAuthenticationState"
import ProtectedLayout from "./protected"
import PublicLayout from "./public"

const Layout = () => {
  const [appIsRefreshing, setAppIsRefreshing] = useState<boolean>(false)

  const { isAuthenticated, refreshAuthentication } = useAuthenticationState(
    ({ user, refresh }) => ({
      isAuthenticated: Boolean(user),
      refreshAuthentication: refresh
    })
  )

  useEffect(() => {
    const handleRefresh = async () => {
      // begin refreshing
      setAppIsRefreshing(true)

      // refresh authentication
      await refreshAuthentication()
      // add more refreshing logic...

      // app can start
      setAppIsRefreshing(false)
    }

    handleRefresh()
  }, [refreshAuthentication])

  return appIsRefreshing ? (
    <p>Application is refreshing...</p>
  ) : isAuthenticated ? (
    <ProtectedLayout />
  ) : (
    <PublicLayout />
  )
}

export default Layout
