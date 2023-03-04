import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import * as React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

import getNavigationItems from "../shared/utils/getNavigationItems"

const { userSettingsItems } = getNavigationItems()

const UserSettingsLayout = () => {
  const { pathname } = useLocation()

  const [currentTab, setCurrentTab] = React.useState<string>(pathname)

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newTab: string) => setCurrentTab(newTab),
    []
  )

  return (
    <section>
      <header>
        <nav>
          <Tabs
            variant="scrollable"
            allowScrollButtonsMobile
            value={currentTab}
            onChange={handleTabChange}
            aria-label="User settings header tabs">
            {userSettingsItems.map(({ label, path }) => (
              <Tab key={path} label={label} value={path} to={path} component={Link} />
            ))}
          </Tabs>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </section>
  )
}

export default UserSettingsLayout
