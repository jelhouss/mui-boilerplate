import React from "react"
import { Link, Outlet } from "react-router-dom"

import userSettingsItems from "./items/userSettingsItems"

const UserSettingsLayout = () => {
  return (
    <section>
      <header>
        <nav>
          <ul>
            {userSettingsItems.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </section>
  )
}

export default UserSettingsLayout
