import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export interface FullPageDisplayErrorProps {
  title: string
  children: React.ReactNode
}

const FullPageDisplayError = ({ title, children }: FullPageDisplayErrorProps) => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Typography variant="h1" sx={(theme) => ({ marginBottom: theme.spacing(2) })}>
      {title}
    </Typography>
    <Typography variant="body1">{children}</Typography>
  </Box>
)

export default FullPageDisplayError
