import * as React from "react"
import { Link } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import MUILink from "@mui/material/Link"
import useTheme from "@mui/material/styles/useTheme"
import Typography from "@mui/material/Typography"
import styled from "@mui/system/styled"

import SignUpForm from "../components/SignUpForm"
import useRegister from "../services/queries/registrationQuery"

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

interface leftPaneProps {
  isRegistrationSuccess?: boolean
}

const LeftPane = ({ isRegistrationSuccess = false }: leftPaneProps) => {
  return isRegistrationSuccess ? (
    <React.Fragment>
      <Typography variant="h1" sx={{ width: 400 }}>
        <GradientText>You have successfully signed up!</GradientText>
      </Typography>
      <Typography color="text.secondary" sx={(theme) => ({ my: theme.spacing(2), width: 400 })}>
        Click{" "}
        <MUILink component={Link} to="/sign-in" replace>
          here
        </MUILink>{" "}
        to access your dashboard!
      </Typography>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Typography variant="h1" sx={{ width: 400 }}>
        <GradientText>Happy to Have You!</GradientText>
      </Typography>
      <Typography color="text.secondary" sx={(theme) => ({ my: theme.spacing(2), width: 400 })}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu metus id neque efficitur
        rutrum. Mauris vulputate odio eu auctor consectetur. Nullam quam metus, vestibulum non dolor
        eu, pellentesque mattis tellus. <MUILink href="mailto:contact@server">Contact us</MUILink>{" "}
        for any support needed.
      </Typography>
    </React.Fragment>
  )
}

const SignUpPage = () => {
  const {
    mutate: register,
    isLoading: isRegistrationLoading,
    isSuccess: isRegistrationSuccess
  } = useRegister()

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
        <LeftPane isRegistrationSuccess={isRegistrationSuccess} />
      </Box>
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "primaryDark.900" : "grey.50",
          padding: theme.spacing(6),
          borderRadius: 4
        })}>
        <SignUpForm
          onSubmit={register}
          isSuccess={isRegistrationSuccess}
          isLoading={isRegistrationLoading}
        />
      </Box>
    </Container>
  )
}

export default SignUpPage
