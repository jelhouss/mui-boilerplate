import Container from "@mui/material/Container"
import React, { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { RootState, useAppDispatch, useAppSelector } from "../app/store"
import SignInForm from "../components/SignInForm/SignInForm"
import { clearState, signIn } from "../slices/authentication"
import { AuthenticationPayload } from "../types/authentication"

type LocationState = {
  state?: { from?: { pathname?: string } }
}

const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location as LocationState).state?.from?.pathname || "/app"

  const dispatch = useAppDispatch()
  const { user, status, errorStatus } = useAppSelector((state: RootState) => state.authentication)

  const handleSignIn = useCallback(
    (signInFormPayload: AuthenticationPayload) => dispatch(signIn(signInFormPayload)).unwrap(),
    [dispatch]
  )

  const handleClearState = useCallback(() => dispatch(clearState()), [dispatch])

  useEffect(() => {
    if (status === "succeeded" && Boolean(user)) {
      // redirect to a private path the user was trying to access before
      // or redirect to "/app" which is the dashboard
      navigate(from, { replace: true })
    }
  }, [from, handleClearState, navigate, status, user])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      // display a custom notification alert...
      // eslint-disable-next-line no-console
      console.error("Error while signing in with status %d", errorStatus)

      handleClearState()
    }
  }, [errorStatus, handleClearState, status])

  return (
    <Container
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <SignInForm title="Sign In" onSubmit={handleSignIn} isLoading={status === "loading"} />
    </Container>
  )
}

export default SignInPage
