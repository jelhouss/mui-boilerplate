import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import MUILink from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import styled from "@mui/styles/styled"
import { useSnackbar } from "notistack"
import React, { useCallback, useEffect } from "react"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector, RootState } from "../app/store"
import SignUpForm from "../components/SignUpForm/SignUpForm"
import { clearState, register } from "../slices/registration"
import { RegistrationPayload } from "../types/registration"

const GradientText = styled("span")(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary[700]})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}))

const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar()

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

      enqueueSnackbar(
        <Typography variant="body1">
          You have successfully signed up!{" "}
          <span role="img" aria-label="Partying face emoji">
            🥳
          </span>{" "}
          <MUILink component={Link} to="/sign-in" replace>
            Click here to access your dashboard!
          </MUILink>
        </Typography>
      )
    }
  }, [enqueueSnackbar, handleClearState, status, user])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      handleClearState()

      enqueueSnackbar(
        <Typography variant="body1">
          <span role="img" aria-label="Sorrowful face emoji">
            😔
          </span>{" "}
          {`Error while signing up with HTTP status: ${errorStatus}`}
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
      <Box
        sx={(theme) => ({
          textAlign: { xs: "center", md: "left" },
          padding: theme.spacing(6)
        })}>
        <Typography variant="h1" sx={{ width: 400 }}>
          <GradientText>Sign Up</GradientText>
        </Typography>
        <Typography color="text.secondary" sx={(theme) => ({ my: theme.spacing(2), width: 400 })}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu metus id neque efficitur
          rutrum. Mauris vulputate odio eu auctor consectetur. Nullam quam metus, vestibulum non
          dolor eu, pellentesque mattis tellus.{" "}
          <MUILink target="_blank" rel="noopener noreferrer" href="mailto:contact@server">
            Contact us
          </MUILink>{" "}
          for any support needed.
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "primaryDark.900" : "grey.50",
          padding: theme.spacing(6),
          borderRadius: 4
        })}>
        <SignUpForm onSubmit={handleRegister} isLoading={status === "loading"} />
      </Box>
    </Container>
  )
}

export default SignUpPage
