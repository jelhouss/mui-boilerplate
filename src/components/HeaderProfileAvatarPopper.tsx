import LogoutIcon from "@mui/icons-material/Logout"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import Typography from "@mui/material/Typography"
import * as React from "react"

import useToggle from "../shared/hooks/useToggle"
import NavigationItem from "../shared/types/NavigationItem"
import User from "../shared/types/User"

export interface HeaderProfileAvatarPopperProps {
  items: NavigationItem[]
  user: User
  onItemClick: (item: NavigationItem) => void
  onSignOut: () => void
}

const HeaderProfileAvatarPopper = ({
  items,
  user,
  onItemClick,
  onSignOut
}: HeaderProfileAvatarPopperProps) => {
  const {
    state: isProfilePopperOpen,
    toggle: toggleIsProfilePopperOpen,
    reset: resetIsProfilePopperOpen
  } = useToggle(false)

  const triggerPopperRef = React.useRef<HTMLDivElement | null>(null)

  const handleOnClickAway = (event: MouseEvent | TouchEvent) => {
    if (triggerPopperRef.current && !triggerPopperRef.current.contains(event.target as Node)) {
      resetIsProfilePopperOpen()
    }
  }

  return (
    <Box>
      <Chip
        id="popper-menu-trigger"
        role="button"
        sx={{
          alignItems: "center",
          transition: "all .2s ease-in-out",
          "& .MuiChip-label": {
            lineHeight: 0
          }
        }}
        avatar={
          <Avatar
            id="popper-menu-trigger"
            src={user.avatar}
            ref={triggerPopperRef}
            aria-controls={isProfilePopperOpen ? "popper-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isProfilePopperOpen ? "true" : undefined}
            color="inherit"
            alt={`${user.firstName} ${user.lastName}`}
          />
        }
        label={
          <SettingsOutlinedIcon
            fontSize="small"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary[300]
                  : theme.palette.primary[500]
            }}
          />
        }
        variant="outlined"
        ref={triggerPopperRef}
        aria-controls={isProfilePopperOpen ? "popper-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isProfilePopperOpen ? "true" : undefined}
        onClick={toggleIsProfilePopperOpen}
      />
      <Popper
        placement="bottom-end"
        open={isProfilePopperOpen}
        anchorEl={triggerPopperRef.current}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleOnClickAway}>
                <Box
                  sx={{
                    p: 2,
                    boxShadow: (theme) =>
                      `0px 4px 20px ${
                        theme.palette.mode === "dark"
                          ? "rgba(0, 0, 0, 0.5)"
                          : "rgba(170, 180, 190, 0.3)"
                      }`
                  }}>
                  <Typography variant="h5">
                    <span role="img" aria-label="Greetings">
                      👋
                    </span>{" "}
                    Hey, {`${user.firstName} ${user.lastName}`}
                  </Typography>

                  <Divider />

                  <List component="nav" id="popper-menu" aria-labelledby="popper-menu-trigger">
                    {items.map((item) => (
                      <ListItemButton key={item.path} onClick={() => onItemClick(item)}>
                        <ListItemText
                          primary={<Typography variant="body1">{item.label}</Typography>}
                        />
                      </ListItemButton>
                    ))}
                    <Divider />
                    <ListItemButton onClick={onSignOut}>
                      <ListItemIcon>
                        <LogoutIcon
                          fontSize="small"
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? theme.palette.primary[300]
                                : theme.palette.primary[500]
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1">Sign Out</Typography>} />
                    </ListItemButton>
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

export default HeaderProfileAvatarPopper
