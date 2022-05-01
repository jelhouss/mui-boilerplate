import { useToggle } from "@react-hookz/web"
import React from "react"

import { useAppDispatch, useAppSelector, RootState } from "../../app/store"
import { toggleTheme } from "../../slices/theme"
import { ProfileAvatarPopperMenuItem } from "../ProfileAvatarPopper/ProfileAvatarPopper"
// eslint-disable-next-line import/no-cycle
import { HeaderProps } from "./Header"

const useHeaderLogic = ({
  onProfileAvatarPopperItemClick,
  onSignOut,
  toggleSideNavigation
}: HeaderProps) => {
  // states
  const [isMobileNavigationOpen, toggleIsMobileNavigationOpen] = useToggle(false)

  const mobileNavigationRef = React.useRef<HTMLButtonElement | null>(null)

  const { mode } = useAppSelector((state: RootState) => state.theme)

  // effects
  const dispatch = useAppDispatch()

  const handleToggleTheme = React.useCallback(() => dispatch(toggleTheme()), [dispatch])

  const handleOnClickAway = React.useCallback(
    (event) => {
      if (
        mobileNavigationRef.current &&
        !mobileNavigationRef.current.contains(event.target as Node)
      ) {
        // reset the state something like setIsOpen(false)
        toggleIsMobileNavigationOpen(false)
      }
    },
    [toggleIsMobileNavigationOpen]
  )

  const handleMobileNavigationButtonIconClick = React.useCallback(() => {
    toggleIsMobileNavigationOpen()
  }, [toggleIsMobileNavigationOpen])

  const handleProfileAvatarPopperItemClick = React.useCallback(
    (item: ProfileAvatarPopperMenuItem) => {
      // call parent callback
      if (onProfileAvatarPopperItemClick) {
        onProfileAvatarPopperItemClick(item)
      }

      // next...
    },
    [onProfileAvatarPopperItemClick]
  )

  const handleSignOut = React.useCallback(() => {
    // call parent callback
    if (onSignOut) {
      onSignOut()
    }

    // next...
  }, [onSignOut])

  const handleToggleSideNavigation = React.useCallback(() => {
    // call parent callback
    if (toggleSideNavigation) {
      toggleSideNavigation()
    }

    // next...
  }, [toggleSideNavigation])

  return {
    isMobileNavigationOpen,
    mobileNavigationRef,
    handleOnClickAway,
    toggleIsMobileNavigationOpen,
    handleToggleTheme,
    handleMobileNavigationButtonIconClick,
    handleSignOut,
    handleProfileAvatarPopperItemClick,
    handleToggleSideNavigation,
    mode
  }
}

export default useHeaderLogic
