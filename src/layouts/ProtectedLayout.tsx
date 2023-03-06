import { useSnackbar } from "notistack"
import * as React from "react"
import { Outlet, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import { Theme, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import styled from "@mui/system/styled"

import AuthenticationGuard from "./wrappers/AuthenticationGuard"
import useAppStore from "../app/useAppStore"
import ProtectedLayoutFooter from "../components/ProtectedLayoutFooter"
import ProtectedLayoutHeader from "../components/ProtectedLayoutHeader"
import SideNavigation from "../components/SideNavigation"
import { useSignOut } from "../services/queries/authenticationQuery"
import useToggle from "../shared/hooks/useToggle"
import NavigationItem from "../shared/types/NavigationItem"
import User from "../shared/types/User"
import getNavigationItems from "../shared/utils/getNavigationItems"

const SideNavigationWrapper = styled(SideNavigation)(() => {
  const theme = useTheme()

  return {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    },
    width: "300px",
    margin: "0 auto"
  }
})

const { navigationItems, popperItems } = getNavigationItems()

function ProtectedLayout() {
  const isMobileScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"))

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const { mutate: signOut, isSuccess: isSignOutSuccess, isLoading: isSignOutLoading } = useSignOut()

  const { state: isDrawerOpen, toggle: toggleDrawer } = useToggle(false)

  const { authenticatedUser } = useAppStore()

  const onPopperItemClick = React.useCallback(
    (item: NavigationItem) => {
      navigate(item.path, { replace: true })
    },
    [navigate]
  )

  React.useEffect(() => {
    if (isSignOutSuccess) {
      navigate("/", { replace: true })
    }

    if (isSignOutLoading) {
      enqueueSnackbar("Signing out. Please wait...")
    }
  }, [enqueueSnackbar, isSignOutLoading, isSignOutSuccess, navigate])

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
          sideNavigationItems={navigationItems}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          isOpen={isDrawerOpen}
          isMobileScreen={isMobileScreen}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobileScreen ? "100vw" : "calc(100vw - 300px)"
          }}>
          <ProtectedLayoutHeader
            onSignOut={signOut}
            user={authenticatedUser as User}
            popperItems={popperItems}
            onPopperItemClick={onPopperItemClick}
            toggleDrawer={toggleDrawer}
          />

          <main>
            <Outlet />
          </main>

          <ProtectedLayoutFooter />
        </Box>
      </Box>
    </AuthenticationGuard>
  )
}

export default ProtectedLayout
