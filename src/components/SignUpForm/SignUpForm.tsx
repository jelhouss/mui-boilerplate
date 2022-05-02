/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
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
import { useToggle } from "@react-hookz/web"
import { AxiosError } from "axios"
import React, { SyntheticEvent, useCallback } from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

import { RegistrationPayload, RegistrationResponse } from "../../types/registration"
import { UserGender } from "../../types/user"

const MAX_MONTH = 12
const MIN_MONTH = 1
const MAX_DAY = 31
const MIN_DAY = 1
const MAX_YEAR = 2010
const MIN_YEAR = 1970

export interface SignUpFormPayload extends RegistrationPayload {
  confirmPassword: string
}

const schema: Z.ZodSchema<SignUpFormPayload> = Z.object({
  firstName: Z.string(),
  lastName: Z.string(),
  email: Z.string().email({ message: "Please provide a valid e-mail address." }),
  password: Z.string()
    .min(8, { message: "Password must be 8 or more characters long." })
    .max(32, { message: "Password must be 32 or fewer characters long." }),
  confirmPassword: Z.string()
    .min(8, { message: "Password must be 8 or more characters long." })
    .max(32, { message: "Password must be 32 or fewer characters long." }),
  gender: Z.nativeEnum(UserGender, { invalid_type_error: "Please provide a valid gender." }),
  dayOfBirth: Z.number()
    .positive({ message: "Day of birth must be positive." })
    .gte(MIN_DAY, { message: "Day of birth must be between 1 and 31." })
    .lte(MAX_DAY, { message: "Day of birth must be between 1 and 31." }),
  yearOfBirth: Z.number()
    .positive({ message: "Year of birth must be positive." })
    .gte(MIN_YEAR, { message: "Day of birth must be between 1970 and 2010." })
    .lte(MAX_YEAR, { message: "Day of birth must be between 1970 and 2010." }),
  monthOfBirth: Z.number()
    .positive({ message: "Month of birth must be positive." })
    .gte(MIN_MONTH, { message: "Month of birth must be between 1 and 12." })
    .lte(MAX_MONTH, { message: "Month of birth must be between 1 and 12." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match. Make sure you type the same password.",
  path: ["confirmPassword"]
})

export interface SignUpFormProps {
  title?: string
  subtitle?: string
  isLoading?: boolean
  onSubmit?: (signUpFormPayload: RegistrationPayload) => Promise<RegistrationResponse | AxiosError>
}

const SignUpForm = ({ title, subtitle, onSubmit, isLoading }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields }
  } = useForm<SignUpFormPayload>({
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

      handleSubmit((data: RegistrationPayload) => onSubmit && onSubmit(data))(e)
    },
    [handleSubmit, onSubmit]
  )

  return (
    <section>
      {title ? <h3>{title}</h3> : null}
      {subtitle ? <h4>{subtitle}</h4> : null}

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
                  onClick={handleTogglePasswordVisibility}
                  onMouseDown={handleTogglePasswordVisibilityMouseDown}
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
          sx={(theme) => ({
            marginBottom: theme.spacing(2)
          })}>
          <FormLabel id="dateOfBirth">Date of Birth</FormLabel>
          <Box aria-labelledby="dateOfBirth">
            <FormControl
              fullWidth
              error={Boolean(touchedFields.dayOfBirth && errors.dayOfBirth)}
              sx={(theme) => ({
                my: theme.spacing(1)
              })}>
              <InputLabel htmlFor="dayOfBirth">Day</InputLabel>
              <OutlinedInput
                id="dayOfBirth"
                label="Day"
                type="number"
                inputProps={{
                  min: MIN_DAY,
                  max: MAX_DAY
                }}
                {...register("dayOfBirth", { valueAsNumber: true })}
              />
              {touchedFields.dayOfBirth && errors.dayOfBirth ? (
                <FormHelperText error id="dayOfBirth">
                  {errors.dayOfBirth.message}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touchedFields.monthOfBirth && errors.monthOfBirth)}
              sx={(theme) => ({
                my: theme.spacing(1)
              })}>
              <InputLabel htmlFor="monthOfBirth">Month</InputLabel>
              <OutlinedInput
                id="monthOfBirth"
                label="Month"
                type="number"
                inputProps={{
                  min: MIN_MONTH,
                  max: MAX_MONTH
                }}
                {...register("monthOfBirth", { valueAsNumber: true })}
              />
              {touchedFields.monthOfBirth && errors.monthOfBirth ? (
                <FormHelperText error id="monthOfBirth">
                  {errors.monthOfBirth.message}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touchedFields.yearOfBirth && errors.yearOfBirth)}
              sx={(theme) => ({
                my: theme.spacing(1)
              })}>
              <InputLabel htmlFor="yearOfBirth">Year</InputLabel>
              <OutlinedInput
                id="yearOfBirth"
                label="Year"
                type="number"
                inputProps={{
                  min: MIN_YEAR,
                  max: MAX_YEAR
                }}
                {...register("yearOfBirth", { valueAsNumber: true })}
              />
              {touchedFields.yearOfBirth && errors.yearOfBirth ? (
                <FormHelperText error id="yearOfBirth">
                  {errors.yearOfBirth.message}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Box>
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
      <DevTool control={control} />
    </section>
  )
}
export default SignUpForm
