import React, { useMemo } from "react"
import { Link, Outlet } from "react-router-dom"

import RedirectToDashboardIfAuthenticated from "../utils/RedirectToDashboardIfAuthenticated"
import publicItems from "./items"

const PublicLayout = () => {
  const items = useMemo(() => publicItems, [])

  return (
    <RedirectToDashboardIfAuthenticated>
      <div>
        <header>This is a header for custom announcements</header>
        <nav>
          <ul>
            {items.map(({ label, path }) => (
              <li key={path}>
                <Link to={path as string}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          <Outlet />
        </main>

        <footer>This is a footer</footer>
      </div>
    </RedirectToDashboardIfAuthenticated>
  )
}

export default PublicLayout
