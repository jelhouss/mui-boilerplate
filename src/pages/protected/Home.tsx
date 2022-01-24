import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAsyncFn } from "react-use"

import useAuthenticationState from "../../app/store/useAuthenticationState"
import { User } from "../../types/user"

const Home = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { signOut, isSignedIn, user } = useAuthenticationState(({ signOut, user }) => ({
    signOut,
    user,
    isSignedIn: Boolean(user)
  }))

  const handleSignOutCallback = useCallback(() => signOut(), [signOut])

  const [{ loading: signOutLoading, error: signOutError }, handleSignOut] =
    useAsyncFn(handleSignOutCallback)

  useEffect(() => {
    if (signOutError) {
      // customize displaying error (notification for instance)
    }

    // redirect to "/" which in return will navigate to public home page
    if (!isSignedIn) {
      navigate("/", { replace: true })
    }
  }, [isSignedIn, navigate, signOutError])

  if (signOutLoading) {
    return <p>Please wait while processing sign out...</p>
  }

  return (
    <section>
      <header>
        <h1>Welcome to protected home page!</h1>
        <p>This is the home page header.</p>
      </header>
      <p>Hi there! Your e-mail is: {(user as Partial<User>).email}</p>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </section>
  )
}

export default Home
