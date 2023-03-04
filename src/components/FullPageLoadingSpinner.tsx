import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const FullPageLoadingSpinner = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress thickness={1} />
  </Box>
)

export default FullPageLoadingSpinner
