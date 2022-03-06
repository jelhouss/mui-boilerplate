import SearchIcon from "@mui/icons-material/Search"
import Box from "@mui/material/Box"
import { alpha } from "@mui/material/styles"
import styled from "@mui/styles/styled"
import React from "react"

// eslint-disable-next-line import/no-cycle
import useSearchButtonLogic from "./hooks"

const SearchButtonWrapper = styled("button")(({ theme }) => {
  return {
    minHeight: 34,
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      backgroundColor: "transparent",
      padding: 0,
      minWidth: 34,
      justifyContent: "center",
      "& > *:not(.MuiSvgIcon-root)": {
        display: "none"
      }
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 200
    },
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.primaryDark[900] : theme.palette.grey[50],
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${
      theme.palette.mode === "dark" ? theme.palette.primaryDark[700] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: "pointer",
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

const SearchLabel = styled("span")(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    marginRight: "auto"
  }
})

const Shortcut = styled("div")(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: "20px",
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${
      theme.palette.mode === "dark" ? theme.palette.primaryDark[500] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primaryDark[800] : "#FFF",
    padding: theme.spacing(0, 0.8),
    borderRadius: 5
  }
})

export interface SearchButtonProps {
  onOpen?: () => void
  onClose?: () => void
  onSearch?: () => void
}

const IS_MACOS = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0

const SearchButton = ({ onOpen, onClose, onSearch }: SearchButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleOnOpen, handleOnClose, handleOnSearch } = useSearchButtonLogic({
    onOpen,
    onClose,
    onSearch
  })

  return (
    <Box>
      <SearchButtonWrapper>
        <SearchIcon
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.primary[300]
                : theme.palette.primary[500]
          }}
        />
        <SearchLabel>Search...</SearchLabel>
        <Shortcut>{IS_MACOS ? "⌘" : "Ctrl+"}K</Shortcut>
      </SearchButtonWrapper>

      {/* TODO: handle opening/closing modal and handle searching */}
    </Box>
  )
}
export default SearchButton
