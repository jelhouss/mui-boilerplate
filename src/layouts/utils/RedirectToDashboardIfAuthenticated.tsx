import React from "react"
import { Navigate, useLocation } from "react-router-dom"

import { RootState, useAppSelector } from "../../app/store"

export interface RedirectToDashboardIfAuthenticatedProps {
  children: JSX.Element
}

type LocationState = {
  state?: { from?: { pathname?: string } }
}

const RedirectToDashboardIfAuthenticated = ({
  children
}: RedirectToDashboardIfAuthenticatedProps) => {
  const location = useLocation()
  const from = (location as LocationState).state?.from?.pathname || "/app"

  const { user } = useAppSelector((state: RootState) => state.authentication)

  if (user) {
    return <Navigate to={from} replace />
  }

  return children
}

export default RedirectToDashboardIfAuthenticated
