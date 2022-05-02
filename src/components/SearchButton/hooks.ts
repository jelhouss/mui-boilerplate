import React from "react"

// eslint-disable-next-line import/no-cycle
import { SearchButtonProps } from "./SearchButton"

const useSearchButtonLogic = ({ onOpen, onClose, onSearch }: SearchButtonProps) => {
  const handleOnOpen = React.useCallback(() => {
    // call parent callback
    if (onOpen) {
      onOpen()
    }

    // next...
  }, [onOpen])

  const handleOnClose = React.useCallback(() => {
    // call parent callback
    if (onClose) {
      onClose()
    }

    // next...
  }, [onClose])

  const handleOnSearch = React.useCallback(() => {
    // call parent callback
    if (onSearch) {
      onSearch()
    }

    // next...
  }, [onSearch])

  return { handleOnOpen, handleOnClose, handleOnSearch }
}

export default useSearchButtonLogic
