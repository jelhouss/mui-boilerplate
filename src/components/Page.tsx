import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export interface PageProps {
  title: string
  children: React.ReactNode
}

const Page = ({ title, children }: PageProps) => {
  return (
    <Container component="section" sx={(theme) => ({ padding: theme.spacing(4) })}>
      <Typography variant="h1" sx={(theme) => ({ marginBottom: theme.spacing(2) })}>
        {title}
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </Container>
  )
}
export default Page
