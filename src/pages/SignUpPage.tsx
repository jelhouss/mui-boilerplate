import Container from "@mui/material/Container"
import React, { useCallback, useEffect } from "react"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector, RootState } from "../app/store"
import SignUpForm from "../components/SignUpForm/SignUpForm"
import { clearState, register } from "../slices/registration"
import { RegistrationPayload } from "../types/registration"

const SignUpPage = () => {
  const dispatch = useAppDispatch()
  const { user, status, errorStatus } = useAppSelector((state: RootState) => state.registration)

  const handleRegister = useCallback(
    (registrationPayload: RegistrationPayload) => dispatch(register(registrationPayload)).unwrap(),
    [dispatch]
  )

  const handleClearState = useCallback(() => dispatch(clearState()), [dispatch])

  useEffect(() => {
    if (status === "succeeded" && Boolean(user)) {
      handleClearState()
    }
  }, [handleClearState, status, user])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      // display a custom notification alert...
      // eslint-disable-next-line no-console
      console.error("Error while signing up with status %d", errorStatus)

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
      <SignUpForm title="Sign Up" onSubmit={handleRegister} isLoading={status === "loading"} />
      {status === "succeeded" && Boolean(user) ? (
        <p>
          You have successfully signed up!{" "}
          <Link to="/sign-in" replace>
            Please sign in to access your dashboard!
          </Link>
        </p>
      ) : null}
    </Container>
  )
}

export default SignUpPage
