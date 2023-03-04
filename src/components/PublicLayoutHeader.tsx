import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlined from "@mui/icons-material/LightModeOutlined"
import Box from "@mui/material/Box"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Collapse from "@mui/material/Collapse"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import MUILink from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
import useTheme from "@mui/material/styles/useTheme"
import Tooltip from "@mui/material/Tooltip"
import styled from "@mui/system/styled"
import * as React from "react"
import { Link } from "react-router-dom"

import AnchorLinkAsListItem from "./AnchorLinkAsListItem"
import useAppStore from "../app/useAppStore"
import useToggle from "../shared/hooks/useToggle"
import HeaderNavigationItem from "../types/HeaderNavigationItem"

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

const Navigation = styled("nav")(() => {
  const theme = useTheme()

  return {
    "& ul": {
      padding: 0,
      margin: 0,
      listStyle: "none",
      display: "flex"
    },
    "& li": {
      color: theme.palette.text.primary,
      ...theme.typography.body2,
      fontWeight: 700,
      "& > a, & > div": {
        display: "inline-block",
        color: "inherit",
        textDecoration: "none",
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        "&:hover, &:focus": {
          backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.primaryDark[700] : theme.palette.grey[50],
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primaryDark[200]
              : theme.palette.grey[700],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "initial"
          }
        }
      },
      "& > div": {
        cursor: "default"
      }
    }
  }
})

const MobileNavigationMenuWrapper = styled("ul")({
  listStyleType: "none",
  padding: 0,
  margin: 0
})

export interface PublicLayoutHeaderProps {
  headerNavigationItems: HeaderNavigationItem[]
}

const PublicLayoutHeader = ({ headerNavigationItems }: PublicLayoutHeaderProps) => {
  const { mode, setMode } = useAppStore()

  const {
    state: isMobileNavigationOpen,
    toggle: toggleIsMobileNavigationOpen,
    reset: resetIsMobileNavigationOpen
  } = useToggle(false)

  const mobileNavigationRef = React.useRef<HTMLButtonElement | null>(null)

  const handleOnClickAway = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        mobileNavigationRef.current &&
        !mobileNavigationRef.current.contains(event.target as Node)
      ) {
        resetIsMobileNavigationOpen()
      }
    },
    [resetIsMobileNavigationOpen]
  )

  const handleMobileNavigationButtonIconClick = React.useCallback(
    () => toggleIsMobileNavigationOpen(),
    [toggleIsMobileNavigationOpen]
  )

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
        <Box sx={{ display: { xs: "none", md: "initial" } }}>
          <Navigation>
            <ul>
              {headerNavigationItems.map(({ label, path }) => (
                <li key={path}>
                  <MUILink to={path} component={Link}>
                    {label}
                  </MUILink>
                </li>
              ))}
            </ul>
          </Navigation>
        </Box>

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

          <Box sx={{ display: { md: "none" }, ml: 1 }}>
            <IconButton
              color="primary"
              aria-label="Click to open mobile header nevigation menu"
              ref={mobileNavigationRef}
              disableRipple
              onClick={handleMobileNavigationButtonIconClick}
              sx={{
                position: "relative",
                "& rect": {
                  transformOrigin: "center",
                  transition: "0.2s"
                },
                ...(isMobileNavigationOpen && {
                  "& rect:first-of-type": {
                    transform: "translate(1.5px, 1.6px) rotateZ(-45deg)"
                  },
                  "& rect:last-of-type": {
                    transform: "translate(1.5px, -1.2px) rotateZ(45deg)"
                  }
                })
              }}>
              <SvgHamburgerMenu />
            </IconButton>
            <ClickAwayListener onClickAway={handleOnClickAway}>
              <Collapse
                in={isMobileNavigationOpen}
                sx={{
                  position: "fixed",
                  top: 56,
                  left: 0,
                  right: 0,
                  boxShadow: (theme) =>
                    `0px 4px 20px ${
                      theme.palette.mode === "dark"
                        ? "rgba(0, 0, 0, 0.5)"
                        : "rgba(170, 180, 190, 0.3)"
                    }`,
                  bgcolor: "background.paper"
                }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    maxHeight: "calc(100vh - 56px)",
                    overflow: "auto"
                  }}>
                  <MobileNavigationMenuWrapper>
                    {headerNavigationItems.map(({ label, path }) => (
                      <li key={path}>
                        <AnchorLinkAsListItem to={path} component={Link}>
                          {label}
                        </AnchorLinkAsListItem>
                      </li>
                    ))}
                  </MobileNavigationMenuWrapper>
                </Box>
              </Collapse>
            </ClickAwayListener>
          </Box>
        </Stack>
      </Container>
    </HeaderWrapper>
  )
}

export default PublicLayoutHeader
