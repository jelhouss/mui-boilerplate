import React from "react"
import { Navigate, useLocation } from "react-router-dom"

import { RootState, useAppSelector } from "../../app/store"

export interface AuthenticationGuardProps {
  children: JSX.Element
}

const AuthenticationGuard = ({ children }: AuthenticationGuardProps) => {
  const location = useLocation()

  const { user } = useAppSelector((state: RootState) => state.authentication)

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return children
}

export default AuthenticationGuard
