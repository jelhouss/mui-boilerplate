import SearchIcon from "@mui/icons-material/Search"
import { alpha } from "@mui/material/styles"
import useTheme from "@mui/material/styles/useTheme"
import styled from "@mui/system/styled"

const TriggerSearchModalButtonWrapper = styled("div")(() => {
  const theme = useTheme()

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

const SearchLabel = styled("span")(() => {
  const theme = useTheme()

  return {
    marginLeft: theme.spacing(1),
    marginRight: "auto"
  }
})

const Shortcut = styled("div")(() => {
  const theme = useTheme()
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

const IS_MACOS = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0

const TriggerSearchModalButton = () => (
  <TriggerSearchModalButtonWrapper role="button">
    <SearchIcon
      fontSize="small"
      sx={{
        color: (theme) =>
          theme.palette.mode === "dark" ? theme.palette.primary[300] : theme.palette.primary[500]
      }}
    />
    <SearchLabel>Search...</SearchLabel>
    <Shortcut>{IS_MACOS ? "⌘" : "Ctrl+"}K</Shortcut>
  </TriggerSearchModalButtonWrapper>
)

export default TriggerSearchModalButton
