import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import { alpha } from "@mui/material/styles"
import useTheme from "@mui/material/styles/useTheme"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Typography from "@mui/material/Typography"
import styled from "@mui/system/styled"
import * as React from "react"
import { Link } from "react-router-dom"

import AnchorLinkAsListItem from "./AnchorLinkAsListItem"
import SideNavigationItem from "../types/SideNavigationItem"

const AdContainer = styled("article")(() => {
  const theme = useTheme()

  return {
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
  }
})

const AdContent = styled("p")(() => {
  const theme = useTheme()

  return {
    cursor: "pointer",
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    border: `1px solid ${
      theme.palette.mode === "dark" ? theme.palette.primaryDark[500] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primaryDark[800] : "#FFF",
    borderRadius: 10
  }
})

const StyledDrawer = styled(Drawer)(() => {
  const theme = useTheme()

  return {
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  }
})

const MenuItemListWrapper = styled("ul")(() => {
  const theme = useTheme()

  return {
    listStyleType: "none",
    padding: theme.spacing(1),
    margin: 0,
    display: "flex",
    flexDirection: "column"
  }
})

const ListItemWrapper = styled("li")(() => {
  const theme = useTheme()

  return {
    margin: theme.spacing(0.5, 0)
  }
})

interface SideNavigationContentProps {
  sideNavigationItems: SideNavigationItem[]
}

const SideNavigationContent = React.memo(({ sideNavigationItems }: SideNavigationContentProps) => (
  <React.Fragment>
    <AdContainer>
      <header>
        <Typography color="text.secondary" variant="body2">
          We decided to show Ads here (for more funding purposes), and we really care about the look
          and feel of Ads in this little corner.
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Thank you so much for being patient with us!{" "}
          <span role="img" aria-label="Heart">
            ❤️
          </span>
        </Typography>
      </header>
      <AdContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit mauris, fermentum et
        imperdiet ut, tincidunt et sapien
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
      {sideNavigationItems.map(({ label, path, icon }) => (
        <ListItemWrapper key={path}>
          <AnchorLinkAsListItem to={path} component={Link} aria-labelledby={label}>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignSelf: "center",
                marginRight: theme.spacing(1)
              })}>
              {icon}
            </Box>

            <Box id={label}>{label}</Box>
          </AnchorLinkAsListItem>
        </ListItemWrapper>
      ))}
    </MenuItemListWrapper>
  </React.Fragment>
))

SideNavigationContent.displayName = "SideNavigationContent"

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

export interface SideNavigationProps {
  sideNavigationItems: SideNavigationItem[]
  isOpen?: boolean
  isMobileScreen?: boolean
  onClose: () => void
  onOpen: () => void
}

const SideNavigation = ({
  sideNavigationItems,
  isOpen = false,
  onClose,
  onOpen,
  isMobileScreen = false
}: SideNavigationProps) => {
  return (
    <nav>
      {isMobileScreen ? (
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
          <SideNavigationContent sideNavigationItems={sideNavigationItems} />
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
          <SideNavigationContent sideNavigationItems={sideNavigationItems} />
        </StyledDrawer>
      )}
    </nav>
  )
}

export default SideNavigation
