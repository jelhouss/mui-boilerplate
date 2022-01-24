import React from "react"
import { Navigate, RouteProps } from "react-router-dom"

import Home from "./Home"

export interface CustomRoute extends RouteProps {
  label: string
  includeInNavigationMenu: boolean
}

const routes: CustomRoute[] = [
  {
    label: "Home",
    element: <Home />,
    path: "/app",
    index: true,
    includeInNavigationMenu: true
  },
  {
    label: "Redirection to Home",
    element: <Navigate to="/app" replace />,
    path: "*",
    includeInNavigationMenu: false
  }
]

export default routes
