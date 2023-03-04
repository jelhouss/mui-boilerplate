import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import RedirectToProtectedIfAuthenticated from "./wrappers/RedirectToProtectedIfAuthenticated"
import PublicLayoutFooter from "../components/PublicLayoutFooter"
import PublicLayoutHeader from "../components/PublicLayoutHeader"
import getPublicNavigationItems from "../shared/utils/getPublicNavigationItems"

const { headerNavigationItems, footerNavigationSections } = getPublicNavigationItems()

function PublicLayout() {
  return (
    <RedirectToProtectedIfAuthenticated>
      <Box>
        <PublicLayoutHeader headerNavigationItems={headerNavigationItems} />
        <main>
          <Outlet />
        </main>

        <PublicLayoutFooter footerNavigationSections={footerNavigationSections} />
      </Box>
    </RedirectToProtectedIfAuthenticated>
  )
}

export default PublicLayout
