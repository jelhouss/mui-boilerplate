import React from "react"
import { Link } from "react-router-dom"

import { NavigationItem } from "../Header/Header"

export interface SideNavigationProps {
  items: NavigationItem[]
}

const SideNavigation = ({ items }: SideNavigationProps) => {
  return (
    <nav>
      <ul>
        {items.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default SideNavigation
