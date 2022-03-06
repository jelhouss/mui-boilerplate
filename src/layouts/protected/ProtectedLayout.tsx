import React, { useCallback, useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector, RootState } from "../../app/store"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { ProfileAvatarPopperMenuItem } from "../../components/ProfileAvatarPopper/ProfileAvatarPopper"
import SideNavigation from "../../components/SideNavigation/SideNavigation"
import { signOut, clearState } from "../../slices/authentication"
import { User } from "../../types/user"
import AuthenticationGuard from "../utils/AuthenticationGuard"
import protectedItems from "./items/navigation"
import profileAvatarPopperItems from "./items/profileAvatarPopperItems"

const ProtectedLayout = () => {
  const items = useMemo(() => protectedItems, [])

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { user, status, errorStatus } = useAppSelector((state: RootState) => state.authentication)

  const handleSignOut = useCallback(() => dispatch(signOut()).unwrap(), [dispatch])

  const handleClearState = useCallback(() => dispatch(clearState()), [dispatch])

  const handleOnProfileAvatarPopperItemClick = useCallback(
    (item: ProfileAvatarPopperMenuItem) => {
      navigate(item.path, { replace: true })
    },
    [navigate]
  )

  useEffect(() => {
    if (status === "succeeded" && !user) {
      handleClearState()
      navigate("/", { replace: true })
    }
  }, [handleClearState, navigate, status, user])

  useEffect(() => {
    if (status === "failed" && Boolean(errorStatus)) {
      // display a custom notification alert...
      // eslint-disable-next-line no-console
      console.error("Error while signing out with status %d", errorStatus)
    }
  }, [errorStatus, status])

  return (
    <AuthenticationGuard>
      <div>
        <Header
          onSignOut={handleSignOut}
          user={user as User}
          enableProfilePopper
          enableHeaderSearch
          profileAvatarPopperItems={profileAvatarPopperItems}
          onProfileAvatarPopperItemClick={handleOnProfileAvatarPopperItemClick}
        />

        <SideNavigation items={items} />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </AuthenticationGuard>
  )
}

export default ProtectedLayout
