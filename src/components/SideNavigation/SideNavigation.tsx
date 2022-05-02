import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import MUILink from "@mui/material/Link"
import { alpha } from "@mui/material/styles"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Typography from "@mui/material/Typography"
import makeStyles from "@mui/styles/makeStyles"
import styled from "@mui/styles/styled"
import React from "react"
import { Link } from "react-router-dom"

import { NavigationItem } from "../Header/Header"

const AdContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.primaryDark[900] : theme.palette.grey[50],
  color: theme.palette.text.secondary,
  transitionProperty: "all",
  transitionDuration: "150ms",
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primaryDark[700], 0.4)
        : alpha(theme.palette.grey[100], 0.7),
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.primaryDark[600] : theme.palette.grey[300]
  }
}))

const AdContent = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(1),
  marginTop: theme.spacing(0.5),
  border: `1px solid ${
    theme.palette.mode === "dark" ? theme.palette.primaryDark[500] : theme.palette.grey[200]
  }`,
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.primaryDark[800] : "#FFF",
  borderRadius: 10
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "none"
  },
  [theme.breakpoints.up("lg")]: {
    display: "block"
  }
}))

const MenuItemListWrapper = styled("ul")(({ theme }) => ({
  listStyleType: "none",
  padding: theme.spacing(1),
  margin: 0,
  display: "flex",
  flexDirection: "column"
}))

const AnchorItemWrapper = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5, 0)
}))

const useAnchorItemStyles = makeStyles((theme) => ({
  common: {
    ...theme.typography.body2,
    fontSize: theme.typography.pxToRem(18),
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

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

export interface SideNavigationProps {
  items: NavigationItem[]
  isOpen: boolean
  mobileView?: boolean
  onClose: () => void
  onOpen: () => void
}

const SideNavigation = ({
  items,
  isOpen,
  onClose,
  onOpen,
  mobileView = false
}: SideNavigationProps) => {
  const anchorItemStyles = useAnchorItemStyles()

  const content = React.useMemo(() => {
    return (
      <>
        <AdContainer>
          <Typography color="text.secondary" variant="body2">
            We decided to show Ads here (for more funding purposes), and we really care about the
            look and feel of Ads in this little corner.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Thank you so much for being patient with us!{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>
          </Typography>
          <AdContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit mauris, fermentum
            et imperdiet ut, tincidunt et sapien
          </AdContent>
        </AdContainer>

        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100]
          }}
        />

        <MenuItemListWrapper>
          {items.map(({ label, path, icon }) => (
            <AnchorItemWrapper key={path}>
              <MUILink
                to={path}
                component={Link}
                className={anchorItemStyles.common}
                aria-labelledby={label}>
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    alignSelf: "center",
                    marginRight: theme.spacing(1)
                  })}>
                  {icon}
                </Box>

                <Box id={label}>{label}</Box>
              </MUILink>
            </AnchorItemWrapper>
          ))}
        </MenuItemListWrapper>
      </>
    )
  }, [anchorItemStyles.common, items])

  return (
    <nav aria-label="Main navigation">
      {mobileView ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            sx: (theme) => ({
              background: theme.palette.mode === "dark" ? theme.palette.primaryDark[900] : "#FFF",

              // common
              width: "280px",
              boxShadow: "none",
              [theme.breakpoints.up("xs")]: {
                borderRadius: "0px 10px 10px 0px"
              },
              [theme.breakpoints.up("sm")]: {
                borderRadius: "0px"
              }
            })
          }}>
          {content}
        </SwipeableDrawer>
      ) : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            sx: (theme) => ({
              background: theme.palette.mode === "dark" ? theme.palette.primaryDark[900] : "#fff",
              borderColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.primary[100], 0.08)
                  : theme.palette.grey[100],

              // common
              width: "280px",
              boxShadow: "none",
              [theme.breakpoints.up("xs")]: {
                borderRadius: "0px 10px 10px 0px"
              },
              [theme.breakpoints.up("sm")]: {
                borderRadius: "0px"
              }
            })
          }}
          open>
          {content}
        </StyledDrawer>
      )}
    </nav>
  )
}
export default SideNavigation
