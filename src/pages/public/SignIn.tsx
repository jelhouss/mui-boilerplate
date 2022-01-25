import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAsyncFn } from "react-use"

import useAuthenticationState from "../../app/store/useAuthenticationState"
import SignInForm from "../../components/SignInForm"
import { AuthenticationPayload } from "../../types/authentication"

const SignIn = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { signIn, isSignedIn } = useAuthenticationState(({ signIn, user }) => ({
    signIn,
    isSignedIn: Boolean(user)
  }))

  const handleSignInCallback = useCallback(
    (signInFormPayload: AuthenticationPayload) => signIn(signInFormPayload),
    [signIn]
  )

  const [{ loading: authenticationLoading, error: authenticationError }, handleSignIn] =
    useAsyncFn(handleSignInCallback)

  useEffect(() => {
    if (authenticationError) {
      // customize displaying error (notification for instance)
    }

    // redirect to "/app" which in return will navigate to protected home page
    if (isSignedIn) {
      navigate("/app", { replace: true })
    }
  }, [authenticationError, isSignedIn, navigate])

  return (
    <section>
      <header>
        <h1>Welcome to sign in page!</h1>
        <p>This is the sign in page header.</p>
      </header>
      <SignInForm title="Sign In" onSubmit={handleSignIn} isLoading={authenticationLoading} />
    </section>
  )
}

export default SignIn
