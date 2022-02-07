import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector, RootState, useAppDispatch } from "../app/store"
import { clearState, signOut } from "../slices/authentication"
import { User } from "../types/user"

const DashboardPage = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { user, status, errorStatus } = useAppSelector((state: RootState) => state.authentication)

  const handleSignOut = useCallback(() => dispatch(signOut()).unwrap(), [dispatch])

  const handleClearState = useCallback(() => dispatch(clearState()), [dispatch])
  useEffect(() => {
    if (status === "succeeded" && !user) {
      handleClearState()
      navigate("/", { replace: true })
    }
  }, [handleClearState, navigate, status, user])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      // display a custom notification alert...
      // eslint-disable-next-line no-console
      console.error("Error while signing out with status %d", errorStatus)
    }
  }, [errorStatus, status])

  return (
    <section>
      <header>
        <h1>Welcome to dashboard!</h1>
        <p>This is your home page</p>
      </header>
      <p>Hi {(user as User).firstName}, I hope you like your new place.</p>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
      {status === "loading" ? <p>loading...</p> : null}
    </section>
  )
}

export default DashboardPage
