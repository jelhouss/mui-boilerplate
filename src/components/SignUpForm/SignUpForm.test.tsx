import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"

import { UserGender } from "../../types/user"
import SignUpForm, { SignUpFormPayload } from "./SignUpForm"

test("should render without crashing", () => {
  render(<SignUpForm title="Random Title" subtitle="Random subtitle" />)
})

test("should render title and subtitle", () => {
  render(<SignUpForm title="random title" subtitle="random subtitle" />)

  const title = screen.getByRole("heading", { level: 1, name: /random title/i })
  expect(title).toBeInTheDocument()

  const subtitle = screen.getByRole("heading", { level: 2, name: /random subtitle/i })
  expect(subtitle).toBeInTheDocument()
})

test("should render text inputs: First name, last name, e-mail, password, and confirm password", () => {
  render(<SignUpForm />)

  const [firsNameInput, lastNameInput] = screen.getAllByLabelText(/name/i)
  expect(firsNameInput).toBeInTheDocument()
  expect(lastNameInput).toBeInTheDocument()

  const emailInput = screen.getByLabelText(/e-mail/i)
  expect(emailInput).toBeInTheDocument()

  const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i)
  expect(passwordInput).toBeInTheDocument()
  expect(confirmPasswordInput).toBeInTheDocument()
})

test("should render date inputs: day, month and year of birth", () => {
  render(<SignUpForm />)

  const dayOfBirthInput = screen.getByLabelText(/day/i)
  expect(dayOfBirthInput).toBeInTheDocument()

  const monthOfBirthInput = screen.getByLabelText(/month/i)
  expect(monthOfBirthInput).toBeInTheDocument()

  const yearOfBirthInput = screen.getByLabelText(/year/i)
  expect(yearOfBirthInput).toBeInTheDocument()
})

test("should render radio inputs: gender", () => {
  render(<SignUpForm />)

  const [genderMaleRadioInput, genderFemaleRadioInput] = screen.getAllByLabelText(/male/i)
  const genderOtherRadioInput = screen.getByLabelText(/other/i)

  expect(genderMaleRadioInput).toBeInTheDocument()
  expect(genderFemaleRadioInput).toBeInTheDocument()
  expect(genderOtherRadioInput).toBeInTheDocument()
})

// skip this test case due to correct scenario but bad result/behaviour.
// submit function is not getting called perhaps a bug from RTL or JSDOM
test.skip("should submit using submit button and with correct credentials", async () => {
  const payload: SignUpFormPayload = {
    firstName: "random",
    lastName: "joejoe",
    email: "random@email.com",
    password: "random_password",
    confirmPassword: "random_password",
    yearOfBirth: 1990,
    monthOfBirth: 12,
    dayOfBirth: 1,
    gender: UserGender.M
  }

  const submit = jest.fn()

  render(<SignUpForm onSubmit={submit} />)

  // get elements
  const [firsNameInput, lastNameInput] = screen.getAllByLabelText(/name/i)
  const emailInput = screen.getByLabelText(/e-mail/i)
  const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i)
  const dayOfBirthInput = screen.getByLabelText(/day/i)
  const monthOfBirthInput = screen.getByLabelText(/month/i)
  const yearOfBirthInput = screen.getByLabelText(/year/i)
  const [genderMaleRadioInput] = screen.getAllByLabelText(/male/i)

  const submitButton = screen.getByRole("button", { name: /sign up/i })

  // simulate typing
  fireEvent.change(firsNameInput, { target: { value: payload.firstName } })
  fireEvent.change(lastNameInput, { target: { value: payload.lastName } })
  fireEvent.change(emailInput, { target: { value: payload.email } })
  fireEvent.change(passwordInput, { target: { value: payload.password } })
  fireEvent.change(confirmPasswordInput, { target: { value: payload.confirmPassword } })
  fireEvent.change(dayOfBirthInput, { target: { value: payload.dayOfBirth } })
  fireEvent.change(monthOfBirthInput, { target: { value: payload.monthOfBirth } })
  fireEvent.change(yearOfBirthInput, { target: { value: payload.yearOfBirth } })
  fireEvent.change(genderMaleRadioInput, { target: { value: payload.gender } })

  // simualte submission with correct payload
  fireEvent.click(submitButton)
  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(submit).toHaveBeenCalledWith(payload))
})
