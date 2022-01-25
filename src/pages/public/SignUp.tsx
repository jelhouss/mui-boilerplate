import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAsyncFn } from "react-use"

import SignUpForm from "../../components/SignUpForm"
import registrationClient from "../../services/RegistrationClient"
import { RegistrationPayload, RegistrationResponse } from "../../types/registration"

const SignUp = () => {
  const navigate = useNavigate()

  const handleSignUpCallback = useCallback(
    (signUpFormPayload: RegistrationPayload) => registrationClient.register(signUpFormPayload),
    []
  )

  const handleNavigateToSignInPage = () => navigate("/sign-in", { replace: true })

  const [
    { loading: registrationLoading, error: registrationError, value: response },
    handleSignUp
  ] = useAsyncFn(handleSignUpCallback)

  useEffect(() => {
    if (registrationError) {
      // customize displaying error (notification for instance)
    }
  }, [registrationError])

  if (response as RegistrationResponse) {
    return (
      <section>
        <h1>Successfully Signed Up!</h1>
        <p>You can navigate to Sign In page in order to sign in using your credentials.</p>
        <button type="submit" onClick={handleNavigateToSignInPage}>
          Sign In
        </button>
      </section>
    )
  }

  return (
    <section>
      <header>
        <h1>Welcome to sign up page!</h1>
        <p>This is the sign up page header.</p>
      </header>
      <SignUpForm title="Sign Up" onSubmit={handleSignUp} isLoading={registrationLoading} />
    </section>
  )
}

export default SignUp
