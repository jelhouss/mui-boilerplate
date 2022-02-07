import React, { useMemo } from "react"
import { Link, Outlet } from "react-router-dom"

import AuthenticationGuard from "../utils/AuthenticationGuard"
import protectedItems from "./items"

const ProtectedLayout = () => {
  const items = useMemo(() => protectedItems, [])

  return (
    <AuthenticationGuard>
      <div>
        <header>This is a header for custom announcements (private)</header>
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
    </AuthenticationGuard>
  )
}

export default ProtectedLayout
