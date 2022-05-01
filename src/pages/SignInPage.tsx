import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import styled from "@mui/styles/styled"
import { useSnackbar } from "notistack"
import React, { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { RootState, useAppDispatch, useAppSelector } from "../app/store"
import SignInForm from "../components/SignInForm/SignInForm"
import { clearState, signIn } from "../slices/authentication"
import { AuthenticationPayload } from "../types/authentication"

const GradientText = styled("span")(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary[700]})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}))

type LocationState = {
  state?: { from?: { pathname?: string } }
}

const SignInPage = () => {
  const { enqueueSnackbar } = useSnackbar()

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
      handleClearState()

      enqueueSnackbar(
        <Typography variant="body1">
          <span role="img" aria-label="Sorrowful face emoji">
            😔
          </span>{" "}
          {`Error while signing in with HTTP status: ${errorStatus}`}
        </Typography>
      )
    }
  }, [enqueueSnackbar, errorStatus, handleClearState, status])

  return (
    <Container
      component="section"
      sx={(theme) => ({
        my: theme.spacing(4),
        transition: "0.3s",
        display: "flex",
        alignItems: { xs: "center", md: "baseline" },
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" }
      })}>
      <Box sx={(theme) => ({ textAlign: { xs: "center", md: "left" }, padding: theme.spacing(6) })}>
        <Typography variant="h1" sx={{ width: 400 }}>
          <GradientText>Sign In</GradientText>
        </Typography>
        <Typography color="text.secondary" sx={(theme) => ({ my: theme.spacing(2), width: 400 })}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu metus id neque efficitur
          rutrum. Mauris vulputate odio eu auctor consectetur. Nullam quam metus, vestibulum non
          dolor eu, pellentesque mattis tellus.
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "primaryDark.900" : "grey.50",
          padding: theme.spacing(6),
          borderRadius: 4
        })}>
        <SignInForm onSubmit={handleSignIn} isLoading={status === "loading"} />
      </Box>
    </Container>
  )
}

export default SignInPage
