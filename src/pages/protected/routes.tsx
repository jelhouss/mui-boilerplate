import React from "react"
import { RouteProps } from "react-router-dom"

import Home from "./Home"

export interface CustomRoute extends RouteProps {
  label: string
  includeInNavigationMenu: boolean
}

const routes: CustomRoute[] = [
  {
    label: "Home",
    element: <Home />,
    path: "/",
    index: true,
    includeInNavigationMenu: true
  }
]

export default routes
