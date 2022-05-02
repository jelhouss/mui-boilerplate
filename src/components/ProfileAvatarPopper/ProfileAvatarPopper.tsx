/* eslint-disable react/jsx-props-no-spreading */
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
import React from "react"

import { User } from "../../types/user"
// eslint-disable-next-line import/no-cycle
import useProfileAvatarPopper from "./hooks"

export interface ProfileAvatarPopperMenuItem {
  label: string
  path: string
}

export interface ProfileAvatarPopperProps {
  profileAvatarPopperItems?: ProfileAvatarPopperMenuItem[]
  user?: User
  onItemClick?: (item: ProfileAvatarPopperMenuItem) => void
  onSignOut?: () => void
}

const ProfileAvatarPopper = ({
  profileAvatarPopperItems,
  user,
  onItemClick,
  onSignOut
}: ProfileAvatarPopperProps) => {
  const {
    handleChipClick,
    handleOnClickAway,
    handleOnItemClick,
    handleSignOut,
    popperRef,
    isPopperMenuOpen
  } = useProfileAvatarPopper({ onItemClick, onSignOut })

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
            src={user?.avatar}
            ref={popperRef}
            aria-controls={isPopperMenuOpen ? "popper-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isPopperMenuOpen ? "true" : undefined}
            color="inherit"
            alt={`${user?.firstName} ${user?.lastName}`}
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
        ref={popperRef}
        aria-controls={isPopperMenuOpen ? "popper-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isPopperMenuOpen ? "true" : undefined}
        onClick={handleChipClick}
      />
      <Popper
        placement="bottom-end"
        open={isPopperMenuOpen}
        anchorEl={popperRef.current}
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
                    Hey, {`${user?.firstName} ${user?.lastName}`}!{" "}
                    <span role="img" aria-label="greetings">
                      👋
                    </span>
                  </Typography>

                  <Divider />

                  <List component="nav" id="popper-menu" aria-labelledby="popper-menu-trigger">
                    {profileAvatarPopperItems?.map((item) => (
                      <ListItemButton key={item.path} onClick={() => handleOnItemClick(item)}>
                        <ListItemText
                          primary={<Typography variant="body1">{item.label}</Typography>}
                        />
                      </ListItemButton>
                    ))}
                    <Divider />
                    <ListItemButton onClick={handleSignOut}>
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
export default ProfileAvatarPopper
