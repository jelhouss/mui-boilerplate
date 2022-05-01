/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Tooltip from "@mui/material/Tooltip"
import { useToggle } from "@react-hookz/web"
import { AxiosError } from "axios"
import React, { SyntheticEvent, useCallback } from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

import { AuthenticationPayload, AuthenticationResponse } from "../../types/authentication"

const schema: Z.ZodSchema<AuthenticationPayload> = Z.object({
  email: Z.string().email({ message: "Please provide a valid e-mail address." }),
  password: Z.string()
    .min(8, { message: "Password must be 8 or more characters long." })
    .max(32, { message: "Password must be 32 or fewer characters long." })
})

export interface SignInFormProps {
  title?: string
  subtitle?: string
  isLoading?: boolean
  onSubmit?: (
    signInFormPayload: AuthenticationPayload
  ) => Promise<AuthenticationResponse | AxiosError>
}

const SignInForm = ({ title, subtitle, onSubmit, isLoading = false }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields }
  } = useForm<AuthenticationPayload>({
    resolver: zodResolver(schema)
  })

  const [passwordIsVisible, togglePasswordIsVisibile] = useToggle(false)

  const handleTogglePasswordVisibility = useCallback(
    () => togglePasswordIsVisibile(),
    [togglePasswordIsVisibile]
  )

  const handleTogglePasswordVisibilityMouseDown = useCallback(
    (event: React.SyntheticEvent) => event.preventDefault(),
    []
  )

  const submit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()

      handleSubmit((data: AuthenticationPayload) => onSubmit && onSubmit(data))(e)
    },
    [handleSubmit, onSubmit]
  )

  return (
    <Box component="section">
      {title ? <h3>{title}</h3> : null}
      {subtitle ? <h4>{subtitle}</h4> : null}
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
                  onClick={handleTogglePasswordVisibility}
                  onMouseDown={handleTogglePasswordVisibilityMouseDown}
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
      <DevTool control={control} />
    </Box>
  )
}
export default SignInForm
