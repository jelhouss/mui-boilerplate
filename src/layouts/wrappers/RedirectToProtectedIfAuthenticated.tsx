import { Navigate, useLocation } from "react-router-dom"

import useAppStore from "../../app/useAppStore"

export interface RedirectToDashboardIfAuthenticatedProps {
  children: JSX.Element
}

type LocationState = {
  state?: { from?: { pathname?: string } }
}

const RedirectToProtectedIfAuthenticated = ({
  children
}: RedirectToDashboardIfAuthenticatedProps) => {
  const location = useLocation()
  const from = (location as LocationState).state?.from?.pathname || "/app"

  const { authenticatedUser } = useAppStore()

  if (authenticatedUser) {
    // keep the location of the path in memory
    // use it to redirect to it by default in case the user is already signed in
    return <Navigate to={from} replace />
  }

  return children
}

export default RedirectToProtectedIfAuthenticated
