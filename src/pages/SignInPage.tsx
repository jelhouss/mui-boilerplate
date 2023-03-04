import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import useTheme from "@mui/material/styles/useTheme"
import Typography from "@mui/material/Typography"
import styled from "@mui/system/styled"
import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import SignInForm from "../components/SignInForm"
import useSignIn from "../services/queries/authenticationQuery"

const GradientText = styled("span")(() => {
  const theme = useTheme()

  return {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary[700]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})

type LocationState = {
  state?: { from?: { pathname?: string } }
}

const SignInPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // set the redirection path to private path the user was trying to access before
  // or use "/app" which is the dashboard
  const from = (location as LocationState).state?.from?.pathname || "/app"

  const { mutate: signIn, isLoading: isSignInLoading, isSuccess: isSignInSuccess } = useSignIn()

  React.useEffect(() => {
    if (isSignInSuccess) {
      navigate(from, { replace: true })
    }
  }, [from, isSignInSuccess, navigate])

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
          <GradientText>Oh hey! Welcome!</GradientText>
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
        <SignInForm onSubmit={signIn} isLoading={isSignInLoading} />
      </Box>
    </Container>
  )
}

export default SignInPage
