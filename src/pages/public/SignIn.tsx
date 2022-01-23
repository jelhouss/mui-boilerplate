import React from "react"

import SignInForm from "../../components/SignInForm/SignInForm"

const SignIn = () => {
  return (
    <section>
      <header>
        <h1>Welcome to sign in page!</h1>
        <p>This is the sign in page header.</p>
      </header>
      <SignInForm title="Sign In" />
    </section>
  )
}

export default SignIn
