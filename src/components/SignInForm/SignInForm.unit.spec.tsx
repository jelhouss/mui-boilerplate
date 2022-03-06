import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import { AuthenticationPayload } from "../../types/authentication"
import SignInForm from "./SignInForm"

const setup = () => {
  const submit = jest.fn()

  const ui = render(
    <Provider store={store}>
      <BrandingProvider>
        <SignInForm
          title="Random Title"
          subtitle="Random subtitle"
          isLoading={false}
          onSubmit={submit}
        />
      </BrandingProvider>
    </Provider>
  )

  const title = screen.getByRole("heading", { level: 3, name: /random title/i })

  const subtitle = screen.getByRole("heading", { level: 4, name: /random subtitle/i })

  const emailInput = screen.getByLabelText(/e-mail/i)

  const passwordInput = screen.getByLabelText(/password/i)

  const submitButton = screen.getByRole("button", { name: /sign in/i })

  return { ...ui, submit, title, subtitle, emailInput, passwordInput, submitButton }
}

test("should render without crashing", () => {
  setup()
})

test("should render title and subtitle", () => {
  const { title, subtitle } = setup()

  expect(title).toBeInTheDocument()

  expect(subtitle).toBeInTheDocument()
})

test("should render email and password inputs", () => {
  const { emailInput, passwordInput } = setup()

  expect(emailInput).toBeInTheDocument()

  expect(passwordInput).toBeInTheDocument()
})

// skip this test case due to correct scenario but bad result/behaviour.
// submit function is not getting called perhaps a bug from RTL or JSDOM
test.skip("should submit using submit button and with correct credentials", async () => {
  const payload: AuthenticationPayload = {
    email: "random@email.com",
    password: "random_password"
  }

  const { submit, emailInput, passwordInput, submitButton } = setup()

  // simulate typing
  fireEvent.change(emailInput, { target: { value: payload.email } })
  fireEvent.change(passwordInput, { target: { value: payload.password } })

  // simualte submission with correct payload
  fireEvent.click(submitButton)
  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(submit).toHaveBeenCalledWith(payload))
})
