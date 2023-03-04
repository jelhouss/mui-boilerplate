import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlined from "@mui/icons-material/LightModeOutlined"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
import useTheme from "@mui/material/styles/useTheme"
import Tooltip from "@mui/material/Tooltip"
import styled from "@mui/system/styled"
import * as React from "react"

import HeaderProfileAvatarPopper from "./HeaderProfileAvatarPopper"
import TriggerSearchModalButton from "./TriggerSearchModalButton"
import useAppStore from "../app/useAppStore"
import NavigationItem from "../shared/types/NavigationItem"
import User from "../shared/types/User"

const Svg = styled("svg")({
  verticalAlign: "bottom"
})

const SvgHamburgerMenu = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16" fill="none">
    <rect x={1} y={5} width={14} height={1.5} rx={1} fill="#007FFF" />
    <rect x={1} y={9} width={14} height={1.5} rx={1} fill="#007FFF" />
  </Svg>
)

const HeaderWrapper = styled("header")(() => {
  const theme = useTheme()

  return {
    position: "sticky",
    top: 0,
    transition: theme.transitions.create("top"),
    zIndex: theme.zIndex.appBar,
    backdropFilter: "blur(20px)",
    boxShadow: `inset 0px -1px 1px ${
      theme.palette.mode === "dark" ? theme.palette.primaryDark[700] : theme.palette.grey[100]
    }`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primaryDark[900], 0.72)
        : "rgba(255,255,255,0.72)"
  }
})

const DrawerIconWrapper = styled(IconButton)(() => {
  const theme = useTheme()

  return {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
})

export interface ProtectedLayoutHeaderProps {
  user: User
  popperItems: NavigationItem[]
  toggleDrawer: () => void
  onPopperItemClick: (item: NavigationItem) => void
  onSignOut: () => void
}

const ProtectedLayoutHeader = ({
  user,
  popperItems,
  toggleDrawer,
  onPopperItemClick,
  onSignOut
}: ProtectedLayoutHeaderProps) => {
  const { mode, setMode } = useAppStore()

  const handleToggleTheme = React.useCallback(() => {
    let currentMode = mode
    if (currentMode === "light") {
      currentMode = "dark"
    } else {
      currentMode = "light"
    }

    setMode(currentMode)
  }, [mode, setMode])

  return (
    <HeaderWrapper>
      <Container sx={{ display: "flex", alignItems: "center", minHeight: 56 }}>
        <DrawerIconWrapper
          edge="start"
          color="primary"
          aria-label="Open side navigation"
          onClick={toggleDrawer}
          sx={{ ml: "1px" }}>
          <SvgHamburgerMenu />
        </DrawerIconWrapper>

        <Box sx={{ ml: "auto" }} />

        <Stack direction="row" spacing={1}>
          <Tooltip title={mode === "dark" ? "Turn on the light" : "Turn off the light"}>
            <IconButton color="primary" disableTouchRipple onClick={handleToggleTheme}>
              {mode === "dark" ? (
                <LightModeOutlined fontSize="small" />
              ) : (
                <DarkModeOutlined fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <TriggerSearchModalButton />

          <HeaderProfileAvatarPopper
            items={popperItems}
            user={user}
            onItemClick={onPopperItemClick}
            onSignOut={onSignOut}
          />
        </Stack>
      </Container>
    </HeaderWrapper>
  )
}

export default ProtectedLayoutHeader
