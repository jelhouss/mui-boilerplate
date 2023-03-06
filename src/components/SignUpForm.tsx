import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import LoadingButton from "@mui/lab/LoadingButton"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Tooltip from "@mui/material/Tooltip"

import useToggle from "../shared/hooks/useToggle"
import UserGender from "../shared/types/UserGender"
import RegistrationPayload from "../types/registration/RegistrationPayload"

export interface SignUpFormPayload extends RegistrationPayload {
  confirmPassword: string
}

const schema: Z.ZodSchema<SignUpFormPayload> = Z.object({
  firstName: Z.string({
    required_error: "First name is required"
  }),

  lastName: Z.string({
    required_error: "Last name is required"
  }),

  email: Z.string({
    required_error: "E-mail is required"
  }).email("Please provide a valid e-mail address"),

  password: Z.string({
    required_error: "Password is required"
  })
    .min(8, "Password must be 8 or more characters long")
    .max(32, "Password must be 32 or fewer characters long"),

  confirmPassword: Z.string({
    required_error: "Confirm password is required"
  })
    .min(8, "Password must be 8 or more characters long")
    .max(32, "Password must be 32 or fewer characters long"),

  gender: Z.nativeEnum(UserGender, {
    required_error: "Gender is required",
    invalid_type_error: "Please provide a valid gender"
  })
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Passwords do not match. Make sure you type the same password",
  path: ["confirmPassword"]
})

export interface SignUpFormProps {
  isSuccess?: boolean
  isLoading?: boolean
  onSubmit: (authenticationPayload: RegistrationPayload) => unknown
}

const SignUpForm = ({ isSuccess = false, isLoading = false, onSubmit }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset
  } = useForm<SignUpFormPayload>({
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

      handleSubmit((formInput: SignUpFormPayload) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...registrationPayload } = formInput

        onSubmit(registrationPayload)
      })(e)
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
      <h2>Sign Up</h2>
      <main>
        <p>Please enter your information:</p>
        <form onSubmit={submit}>
          <FormControl
            fullWidth
            error={Boolean(touchedFields.firstName && errors.firstName)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <OutlinedInput
              id="firstName"
              type="text"
              label="First Name"
              inputProps={{}}
              {...register("firstName")}
            />
            {touchedFields.firstName && errors.firstName ? (
              <FormHelperText error id="firstName">
                {errors.firstName.message}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(touchedFields.lastName && errors.lastName)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <OutlinedInput
              id="lastName"
              type="text"
              label="Last Name"
              inputProps={{}}
              {...register("lastName")}
            />
            {touchedFields.lastName && errors.lastName ? (
              <FormHelperText error id="lastName">
                {errors.lastName.message}
              </FormHelperText>
            ) : null}
          </FormControl>
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
          <FormControl
            fullWidth
            error={Boolean(touchedFields.confirmPassword && errors.confirmPassword)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              label="Confirm Password"
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
              {...register("confirmPassword")}
            />
            {touchedFields.confirmPassword && errors.confirmPassword ? (
              <FormHelperText error id="confirmPassword">
                {errors.confirmPassword.message}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl
            component="fieldset"
            fullWidth
            error={Boolean(touchedFields.gender && errors.gender)}
            sx={(theme) => ({
              marginBottom: theme.spacing(2)
            })}>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup row aria-labelledby="gender">
              <FormControlLabel
                htmlFor="male"
                value={UserGender.M}
                {...register("gender")}
                control={<Radio id="male" />}
                label="Male"
              />
              <FormControlLabel
                htmlFor="female"
                value={UserGender.F}
                {...register("gender")}
                control={<Radio id="female" />}
                label="Female"
              />
              <FormControlLabel
                htmlFor="other"
                value={UserGender.O}
                {...register("gender")}
                control={<Radio id="other" />}
                label="Other"
              />
            </RadioGroup>
            {touchedFields.gender && errors.gender ? (
              <FormHelperText error id="gender">
                {errors.gender.message}
              </FormHelperText>
            ) : null}
          </FormControl>

          <LoadingButton type="submit" size="large" variant="contained" loading={isLoading}>
            Sign Up
          </LoadingButton>
        </form>
      </main>
    </section>
  )
}

export default SignUpForm
