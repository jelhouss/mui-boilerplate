import Box from "@mui/material/Box"
import { Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import styled from "@mui/styles/styled"
import { useToggle } from "@react-hookz/web"
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

const SideNavigationWrapper = styled(SideNavigation)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none"
  },
  width: "300px",
  margin: "0 auto"
}))

const ProtectedLayout = () => {
  const mobileView = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"))

  const items = useMemo(() => protectedItems, [])

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [isSideNavigationOpen, toggleIsSideNavigationOpen] = useToggle(false)

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

  const handleOnCloseSideNavigation = React.useCallback(() => {
    // logic before closing...

    toggleIsSideNavigationOpen()
  }, [toggleIsSideNavigationOpen])

  const handleOnOpenSideNavigation = React.useCallback(() => {
    // logic before opening...

    toggleIsSideNavigationOpen()
  }, [toggleIsSideNavigationOpen])

  return (
    <AuthenticationGuard>
      <Box
        sx={(theme) => ({
          display: "flex",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.primaryDark[900]
              : theme.palette.background.paper,
          alignItems: "center",
          justifyContent: "space-between"
        })}>
        <SideNavigationWrapper
          items={items}
          onClose={handleOnCloseSideNavigation}
          onOpen={handleOnOpenSideNavigation}
          isOpen={isSideNavigationOpen}
          mobileView={mobileView}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: mobileView ? "100vw" : "calc(100vw - 300px)"
          }}>
          <Header
            onSignOut={handleSignOut}
            user={user as User}
            enableProfilePopper
            enableHeaderSearch
            profileAvatarPopperItems={profileAvatarPopperItems}
            onProfileAvatarPopperItemClick={handleOnProfileAvatarPopperItemClick}
            enableSideNavigation
            toggleSideNavigation={toggleIsSideNavigationOpen}
          />

          <main>
            <Outlet />
          </main>

          <Footer />
        </Box>
      </Box>
    </AuthenticationGuard>
  )
}

export default ProtectedLayout
