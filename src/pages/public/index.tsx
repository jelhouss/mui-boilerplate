import React, { useMemo } from "react"
import { Link, Route, Routes } from "react-router-dom"

import routes from "./routes"

const PublicLayout = () => {
  const links = useMemo(
    () => routes.filter(({ includeInNavigationMenu }) => includeInNavigationMenu),
    []
  )

  return (
    <div>
      <header>This is a header for custom announcements.</header>
      <nav>
        <ul>
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link to={path as string}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <Routes>
          {routes.map(({ path, element, index }) => (
            <Route key={path} path={path} element={element} index={Boolean(index)} />
          ))}
        </Routes>
      </main>

      <footer>This is a footer.</footer>
    </div>
  )
}

export default PublicLayout
