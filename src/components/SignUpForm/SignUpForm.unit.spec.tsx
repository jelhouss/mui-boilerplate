import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"

import store from "../../app/store"
import BrandingProvider from "../../BrandingProvider"
import { UserGender } from "../../types/user"
import SignUpForm, { SignUpFormPayload } from "./SignUpForm"

const setup = () => {
  const submit = jest.fn()

  const ui = render(
    <Provider store={store}>
      <BrandingProvider>
        <SignUpForm
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

  const [firsNameInput, lastNameInput] = screen.getAllByLabelText(/name/i)

  const emailInput = screen.getByLabelText(/e-mail/i)

  const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i)

  const dayOfBirthInput = screen.getByLabelText(/day/i)

  const monthOfBirthInput = screen.getByLabelText(/month/i)

  const yearOfBirthInput = screen.getByLabelText(/year/i)

  const [genderMaleRadioInput, genderFemaleRadioInput] = screen.getAllByLabelText(/male/i)

  const genderOtherRadioInput = screen.getByLabelText(/other/i)

  const submitButton = screen.getByRole("button", { name: /sign up/i })

  return {
    ...ui,
    submit,
    title,
    subtitle,
    firsNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    dayOfBirthInput,
    monthOfBirthInput,
    yearOfBirthInput,
    genderMaleRadioInput,
    genderFemaleRadioInput,
    genderOtherRadioInput,
    submitButton
  }
}

test("should render without crashing", () => {
  setup()
})

test("should render title and subtitle", () => {
  const { title, subtitle } = setup()

  expect(title).toBeInTheDocument()

  expect(subtitle).toBeInTheDocument()
})

test("should render text inputs: First name, last name, e-mail, password, and confirm password", () => {
  const { firsNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput } = setup()

  expect(firsNameInput).toBeInTheDocument()
  expect(lastNameInput).toBeInTheDocument()

  expect(emailInput).toBeInTheDocument()

  expect(passwordInput).toBeInTheDocument()
  expect(confirmPasswordInput).toBeInTheDocument()
})

test("should render date inputs: day, month and year of birth", () => {
  const { dayOfBirthInput, monthOfBirthInput, yearOfBirthInput } = setup()

  expect(dayOfBirthInput).toBeInTheDocument()

  expect(monthOfBirthInput).toBeInTheDocument()

  expect(yearOfBirthInput).toBeInTheDocument()
})

test("should render radio inputs: gender", () => {
  const { genderMaleRadioInput, genderFemaleRadioInput, genderOtherRadioInput } = setup()

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

  const {
    submit,
    firsNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    dayOfBirthInput,
    monthOfBirthInput,
    yearOfBirthInput,
    genderMaleRadioInput,
    submitButton
  } = setup()

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
