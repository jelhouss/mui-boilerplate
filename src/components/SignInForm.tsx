import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import LoadingButton from "@mui/lab/LoadingButton"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Tooltip from "@mui/material/Tooltip"

import useToggle from "../shared/hooks/useToggle"
import AuthenticationPayload from "../types/authentication/AuthenticationPayload"

const schema: Z.ZodSchema<AuthenticationPayload> = Z.object({
  email: Z.string({
    required_error: "E-mail is required"
  }).email("Please provide a valid e-mail address"),
  password: Z.string({
    required_error: "Password is required"
  })
    .min(8, "Password must be 8 or more characters long")
    .max(32, "Password must be 32 or fewer characters long")
})

export interface SignInFormProps {
  isSuccess?: boolean
  isLoading?: boolean
  onSubmit: (authenticationPayload: AuthenticationPayload) => unknown
}

const SignInForm = ({ isSuccess = false, isLoading = false, onSubmit }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset
  } = useForm<AuthenticationPayload>({
    resolver: zodResolver(schema)
  })

  const { state: passwordIsVisible, toggle: togglePasswordIsVisibile } = useToggle(false)

  const togglePasswordVisibilityMouseDown = React.useCallback(
    (event: React.SyntheticEvent) => event.preventDefault(),
    []
  )

  const submit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()

      handleSubmit((formInput: AuthenticationPayload) => onSubmit(formInput))(e)
    },
    [handleSubmit, onSubmit]
  )

  React.useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  return (
    <section>
      <h2>Sign In</h2>
      <main>
        <p>Please enter your credentials:</p>
        <form onSubmit={submit}>
          <FormControl
            fullWidth
            error={Boolean(touchedFields.email && errors.email)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label="E-mail"
              inputProps={{}}
              {...register("email")}
            />
            {touchedFields.email && errors.email ? (
              <FormHelperText error id="email">
                {errors.email.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(touchedFields.password && errors.password)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              type={passwordIsVisible ? "text" : "password"}
              endAdornment={
                <Tooltip title="Toggle password visibility">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={togglePasswordIsVisibile}
                    onMouseDown={togglePasswordVisibilityMouseDown}
                    color="primary"
                    disableTouchRipple>
                    {passwordIsVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </Tooltip>
              }
              inputProps={{}}
              {...register("password")}
            />
            {touchedFields.password && errors.password ? (
              <FormHelperText error id="password">
                {errors.password.message}
              </FormHelperText>
            ) : null}
          </FormControl>

          <LoadingButton type="submit" size="large" variant="contained" loading={isLoading}>
            Sign In
          </LoadingButton>
        </form>
      </main>
    </section>
  )
}

export default SignInForm
