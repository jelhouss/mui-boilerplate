import { useToggle } from "@react-hookz/web"
import React from "react"

// eslint-disable-next-line import/no-cycle
import { ProfileAvatarPopperMenuItem, ProfileAvatarPopperProps } from "./ProfileAvatarPopper"

const useProfileAvatarPopper = ({ onItemClick, onSignOut }: ProfileAvatarPopperProps) => {
  const [isPopperMenuOpen, toggleIsPopperMenuOpen] = useToggle(false)

  const popperRef = React.useRef<HTMLDivElement | null>(null)

  const handleOnClickAway = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (popperRef.current && !popperRef.current.contains(event.target as Node)) {
        // reset the state something like setIsOpen(false)
        toggleIsPopperMenuOpen(false)
      }
    },
    [toggleIsPopperMenuOpen]
  )

  const handleChipClick = React.useCallback(() => {
    toggleIsPopperMenuOpen()
  }, [toggleIsPopperMenuOpen])

  const handleOnItemClick = React.useCallback(
    (item: ProfileAvatarPopperMenuItem) => {
      // parent callback
      if (onItemClick) {
        onItemClick(item)
      }

      // next...
    },
    [onItemClick]
  )

  const handleSignOut = React.useCallback(() => {
    // parent callback
    if (onSignOut) {
      onSignOut()
    }

    // next...
  }, [onSignOut])

  return {
    handleChipClick,
    handleOnClickAway,
    handleOnItemClick,
    handleSignOut,
    popperRef,
    isPopperMenuOpen
  }
}

export default useProfileAvatarPopper
