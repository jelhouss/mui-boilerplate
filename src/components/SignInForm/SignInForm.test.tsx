import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import React from "react"

import SignInForm, { SignInFormPayload } from "./SignInForm"

test("should render without crashing", () => {
  render(<SignInForm title="Random Title" subtitle="Random subtitle" />)
})

test("should render title and subtitle", () => {
  render(<SignInForm title="random title" subtitle="random subtitle" />)

  // render title
  const title = screen.getByRole("heading", { level: 1, name: /random title/i })
  expect(title).toBeInTheDocument()

  // render subtitle
  const subtitle = screen.getByRole("heading", { level: 2, name: /random subtitle/i })
  expect(subtitle).toBeInTheDocument()
})

test("should render email and password inputs", () => {
  render(<SignInForm title="random title" subtitle="random subtitle" />)

  // render email
  const emailInput = screen.getByLabelText(/e-mail/i)
  expect(emailInput).toBeInTheDocument()

  // render password
  const passwordInput = screen.getByLabelText(/password/i)
  expect(passwordInput).toBeInTheDocument()
})

test("should submit using submit button and with correct credentials", async () => {
  const payload: SignInFormPayload = {
    email: "random@email.com",
    password: "random_password"
  }

  const submit = jest.fn()

  render(<SignInForm title="random title" subtitle="random subtitle" onSubmit={submit} />)

  // get elements
  const emailInput = screen.getByLabelText(/e-mail/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole("button", { name: /sign in/i })

  // simulate typing
  fireEvent.change(emailInput, { target: { value: payload.email } })
  fireEvent.change(passwordInput, { target: { value: payload.password } })

  // simualte submission with correct payload
  fireEvent.click(submitButton)
  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(submit).toHaveBeenCalledWith(payload))
})
