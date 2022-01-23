/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { SyntheticEvent, useCallback } from "react"
import { useForm } from "react-hook-form"
import * as Z from "zod"

export interface SignInFormPayload {
  email: string
  password: string
}

const schema: Z.ZodSchema<SignInFormPayload> = Z.object({
  email: Z.string().email({ message: "Please provide a valid e-mail address." }),
  password: Z.string()
    .min(8, { message: "Password must be 8 or more characters long." })
    .max(32, { message: "Password must be 32 or fewer characters long." })
})

export interface SignInFormProps {
  title?: string
  subtitle?: string
  isLoading?: boolean
  onSubmit?: (signInFormPayload: SignInFormPayload) => void
}

const SignInForm = ({
  title = "Sign In Form",
  subtitle = "Use you credentials to sign in, we can't wait to see you!",
  onSubmit
}: SignInFormProps) => {
  const { register, handleSubmit, control } = useForm<SignInFormPayload>({
    resolver: zodResolver(schema)
  })

  const submit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()

      handleSubmit((data: SignInFormPayload) => onSubmit && onSubmit(data))(e)
    },
    [handleSubmit, onSubmit]
  )

  return (
    <section>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>

      <form onSubmit={submit}>
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
        <button type="submit">Sign In</button>
      </form>
      <DevTool control={control} />
    </section>
  )
}
export default SignInForm
