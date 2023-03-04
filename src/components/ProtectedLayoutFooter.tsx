import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const ProtectedLayoutFooter = () => {
  return (
    <Container
      component="footer"
      sx={{
        marginTop: 1
      }}>
      <Typography color="text.secondary" variant="body2">
        Company, Inc. 2023
      </Typography>
    </Container>
  )
}

export default ProtectedLayoutFooter
