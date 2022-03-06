/* eslint-disable react/jsx-props-no-spreading */
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
import Tooltip from "@mui/material/Tooltip"
import makeStyles from "@mui/styles/makeStyles"
import styled from "@mui/styles/styled"
import React from "react"
import { Link } from "react-router-dom"

import logo from "../../logo.png"
import { User } from "../../types/user"
import ProfileAvatarPopper, {
  ProfileAvatarPopperMenuItem
} from "../ProfileAvatarPopper/ProfileAvatarPopper"
import SearchButton from "../SearchButton/SearchButton"
// eslint-disable-next-line import/no-cycle
import useHeaderLogic from "./hooks"

const Svg = styled("svg")({
  verticalAlign: "bottom"
})

const SvgHamburgerMenu = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16" fill="none">
    <rect x={1} y={5} width={14} height={1.5} rx={1} fill="#007FFF" />
    <rect x={1} y={9} width={14} height={1.5} rx={1} fill="#007FFF" />
  </Svg>
)

const HeaderWrapper = styled("header")(({ theme }) => ({
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
}))

const Navigation = styled("nav")(({ theme }) => ({
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
          theme.palette.mode === "dark" ? theme.palette.primaryDark[200] : theme.palette.grey[700],
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
}))

const MobileNavigationMenuWrapper = styled("ul")({
  listStyleType: "none",
  padding: 0,
  margin: 0
})

const useMobileNavigationAnchorItemStyles = makeStyles((theme) => ({
  common: {
    ...theme.typography.body2,
    fontWeight: 700,
    textDecoration: "none",
    border: "none",
    width: "100%",
    backgroundColor: "transparent",
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.secondary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create("background"),
    "&:hover, &:focus": {
      color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.secondary,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.primaryDark[700] : theme.palette.grey[100],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  }
}))

export interface NavigationItem {
  label: string
  path: string
}

export interface HeaderProps {
  items?: NavigationItem[]

  // header search props
  enableHeaderSearch?: boolean
  onHeaderSearchOpen?: () => void
  onHeaderSearchClose?: () => void
  onHeaderSearch?: () => void

  // user section props
  enableProfilePopper?: boolean
  user?: User
  profileAvatarPopperItems?: ProfileAvatarPopperMenuItem[]
  onProfileAvatarPopperItemClick?: (item: ProfileAvatarPopperMenuItem) => void
  onSignOut?: () => void
}

const Header = ({
  items,

  // header search props
  enableHeaderSearch = false,
  onHeaderSearchOpen,
  onHeaderSearchClose,
  onHeaderSearch,

  // user section props
  enableProfilePopper = false,
  user,
  profileAvatarPopperItems,
  onProfileAvatarPopperItemClick,
  onSignOut
}: HeaderProps) => {
  const anchorStyles = useMobileNavigationAnchorItemStyles()

  const {
    isMobileNavigationOpen,
    mobileNavigationRef,
    handleOnClickAway,
    handleMobileNavigationButtonIconClick,
    handleToggleTheme,
    handleProfileAvatarPopperItemClick,
    handleSignOut,
    mode
  } = useHeaderLogic({ onSignOut, onProfileAvatarPopperItemClick })

  return (
    <HeaderWrapper>
      <Container sx={{ display: "flex", alignItems: "center", minHeight: 56 }}>
        {/* logo section */}
        <Box
          aria-label="Go to home page"
          sx={{
            lineHeight: 0,
            width: 48,
            height: 48
          }}>
          <img
            alt="Application logo"
            src={logo}
            style={{
              width: "inherit",
              height: "inherit"
            }}
          />
        </Box>

        {/* navigation items section */}
        {items ? (
          <Box sx={{ display: { xs: "none", md: "initial" } }}>
            <Navigation>
              <ul>
                {items.map(({ label, path }) => (
                  <li key={path}>
                    <MUILink to={path} component={Link}>
                      {label}
                    </MUILink>
                  </li>
                ))}
              </ul>
            </Navigation>
          </Box>
        ) : null}
        <Box sx={{ ml: "auto" }} />
        <Stack direction="row" spacing={1}>
          {/* toggle dark mode */}
          <Tooltip title={mode === "dark" ? "Turn on the light" : "Turn off the light"}>
            <IconButton color="primary" disableTouchRipple onClick={handleToggleTheme}>
              {mode === "dark" ? (
                <LightModeOutlined fontSize="small" />
              ) : (
                <DarkModeOutlined fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* search section */}
          {enableHeaderSearch ? (
            <SearchButton
              onClose={onHeaderSearchClose}
              onOpen={onHeaderSearchOpen}
              onSearch={onHeaderSearch}
            />
          ) : null}

          {/* Hamburger (mobile) navigation list section */}
          {items ? (
            <Box sx={{ display: { md: "none" }, ml: 1 }}>
              <IconButton
                color="primary"
                aria-label="Menu"
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
                      {items.map(({ label, path }) => (
                        <li key={path}>
                          <MUILink to={path} component={Link} className={anchorStyles.common}>
                            {label}
                          </MUILink>
                        </li>
                      ))}
                    </MobileNavigationMenuWrapper>
                  </Box>
                </Collapse>
              </ClickAwayListener>
            </Box>
          ) : null}

          {/* profile section */}
          {enableProfilePopper ? (
            <ProfileAvatarPopper
              profileAvatarPopperItems={profileAvatarPopperItems}
              user={user}
              onItemClick={handleProfileAvatarPopperItemClick}
              onSignOut={handleSignOut}
            />
          ) : null}
        </Stack>
      </Container>
    </HeaderWrapper>
  )
}
export default Header
