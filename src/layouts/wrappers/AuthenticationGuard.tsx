import { Navigate, useLocation } from "react-router-dom"

import useAppStore from "../../app/useAppStore"

export interface AuthenticationGuardProps {
  children: JSX.Element
}

const AuthenticationGuard = ({ children }: AuthenticationGuardProps) => {
  const { pathname } = useLocation()

  const { authenticatedUser } = useAppStore()

  if (!authenticatedUser) {
    // keep the location of the unauthorized path in memory, redirect to sign in page
    // after signing in, redirect automatically to that path for a better sign in experience
    return <Navigate to="/sign-in" replace state={{ from: { pathname } }} />
  }

  return children
}

export default AuthenticationGuard
