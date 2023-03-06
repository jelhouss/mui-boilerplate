import { Link } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import MUILink from "@mui/material/Link"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import styled from "@mui/system/styled"

import FooterNavigationSection from "../types/FooterNavigationSection"

const FooterSectionList = styled("ul")(() => {
  const theme = useTheme()

  return {
    padding: 0,
    margin: 0,
    listStyle: "none",
    ...theme.typography.body2
  }
})

export interface PublicLayoutFooterProps {
  footerNavigationSections?: FooterNavigationSection[]
}

const PublicLayoutFooter = ({ footerNavigationSections }: PublicLayoutFooterProps) => {
  return (
    <Container
      component="footer"
      sx={{
        marginTop: 1
      }}>
      <Box
        sx={{
          py: 4,
          display: { xs: "block", sm: "flex" },
          alignItems: "baseline",
          justifyContent: { sm: "space-between" }
        }}>
        <Typography color="text.secondary" variant="body2">
          Company, Inc. 2023
        </Typography>
        <Box sx={{ display: "flex", py: { xs: 2, sm: 0 } }}>
          {footerNavigationSections?.map(({ section, items }) => (
            <Box
              component="section"
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
              key={section}>
              <header>
                <Typography fontWeight="bold" variant="body2">
                  {section}
                </Typography>
              </header>
              <FooterSectionList>
                {items.map(({ label, path }) => (
                  <li key={path}>
                    <MUILink component={Link} to={path}>
                      {label}
                    </MUILink>
                  </li>
                ))}
              </FooterSectionList>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default PublicLayoutFooter
