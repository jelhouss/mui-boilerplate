import MUILink from "@mui/material/Link"
import useTheme from "@mui/material/styles/useTheme"
import styled from "@mui/system/styled"

const AnchorLinkAsListItem = styled(MUILink)(() => {
  const theme = useTheme()

  return {
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
}) as typeof MUILink

export default AnchorLinkAsListItem
