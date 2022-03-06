import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import MUILink from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import styled from "@mui/styles/styled"
import React from "react"
import { Link } from "react-router-dom"

import { NavigationItem } from "../Header/Header"

const FooterItemWrapper = styled("ul")(({ theme }) => ({
  padding: 0,
  margin: 0,
  listStyle: "none",
  ...theme.typography.body2
}))

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterCategoryItem extends NavigationItem {}

export interface FooterItem {
  label: string
  items: FooterCategoryItem[]
}

export interface FooterProps {
  items?: FooterItem[]
}

const Footer = ({ items }: FooterProps) => {
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
          Tatooine, 2022.
        </Typography>
        <Box sx={{ display: "flex", py: { xs: 2, sm: 0 } }}>
          {items?.map(({ label, items: subitems }) => (
            <Box
              component="section"
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
              key={label}>
              <header>
                <Typography fontWeight="bold" variant="body2">
                  {label}
                </Typography>
              </header>
              <FooterItemWrapper>
                {subitems.map(({ label: sublabel, path }) => (
                  <li key={path}>
                    <MUILink component={Link} to={path}>
                      {sublabel}
                    </MUILink>
                  </li>
                ))}
              </FooterItemWrapper>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
export default Footer
