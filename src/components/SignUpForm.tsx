/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { SyntheticEvent, useCallback } from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

import { RegistrationPayload } from "../types/registration"
import { UserGender } from "../types/user"

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
    .gte(1, { message: "Day of birth must be between 1 and 31." })
    .lte(31, { message: "Day of birth must be between 1 and 31." }),
  yearOfBirth: Z.number()
    .positive({ message: "Year of birth must be positive." })
    .gte(1970, { message: "Day of birth must be between 1970 and 2010." })
    .lte(2010, { message: "Day of birth must be between 1970 and 2010." }),
  monthOfBirth: Z.number()
    .positive({ message: "Month of birth must be positive." })
    .gte(1, { message: "Month of birth must be between 1 and 12." })
    .lte(12, { message: "Month of birth must be between 1 and 12." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match. Make sure you type the same password.",
  path: ["confirmPassword"]
})

export interface SignUpFormProps {
  title?: string
  subtitle?: string
  isLoading?: boolean
  onSubmit?: (signUpFormPayload: RegistrationPayload) => void
}

const SignUpForm = ({
  title = "Sign Up Form",
  subtitle = "Please fill the fields in order to sign up.",
  onSubmit
}: SignUpFormProps) => {
  const { register, handleSubmit, control } = useForm<SignUpFormPayload>({
    resolver: zodResolver(schema)
  })

  const submit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()

      handleSubmit((data: RegistrationPayload) => onSubmit && onSubmit(data))(e)
    },
    [handleSubmit, onSubmit]
  )

  return (
    <section>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="firstName">
            First name: <input type="text" id="firstName" {...register("firstName")} />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last name: <input type="text" id="lastName" {...register("lastName")} />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            E-mail: <input type="email" id="email" {...register("email")} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password: <input type="password" id="password" {...register("password")} />
          </label>
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password:{" "}
            <input type="password" id="confirmPassword" {...register("confirmPassword")} />
          </label>
        </div>
        <fieldset>
          <legend>Date of Birth:</legend>
          <label htmlFor="dayOfBirth">
            Day:{" "}
            <input
              type="number"
              id="dayOfBirth"
              min={1}
              max={31}
              {...register("dayOfBirth", { valueAsNumber: true })}
            />
          </label>
          <label htmlFor="monthOfBirth">
            Month:{" "}
            <input
              type="number"
              id="monthOfBirth"
              min={1}
              max={12}
              {...register("monthOfBirth", { valueAsNumber: true })}
            />
          </label>
          <label htmlFor="yearOfBirth">
            Year:{" "}
            <input
              type="number"
              id="yearOfBirth"
              min={1970}
              max={2010}
              {...register("yearOfBirth", { valueAsNumber: true })}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Gender:</legend>
          <label htmlFor="male">
            <input type="radio" id="male" {...register("gender")} value={UserGender.M} /> Male
          </label>
          <label htmlFor="female">
            <input type="radio" id="female" {...register("gender")} value={UserGender.F} /> Female
          </label>
          <label htmlFor="other">
            <input type="radio" id="other" {...register("gender")} value={UserGender.O} /> Other
          </label>
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>
      <DevTool control={control} />
    </section>
  )
}
export default SignUpForm
