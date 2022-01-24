import React from "react"

import useAuthenticationState from "../app/store/useAuthenticationState"
import ProtectedLayout from "./protected"
import PublicLayout from "./public"

const Layout = () => {
  const { isAuthenticated } = useAuthenticationState(({ user }) => ({
    isAuthenticated: Boolean(user)
  }))

  if (isAuthenticated) {
    return <ProtectedLayout />
  }

  return <PublicLayout />
}

export default Layout
