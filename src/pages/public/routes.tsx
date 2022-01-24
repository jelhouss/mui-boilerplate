import React from "react"
import { Navigate, RouteProps } from "react-router-dom"

import About from "./About"
import Home from "./Home"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

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
  },
  {
    label: "About",
    path: "/about",
    element: <About />,
    includeInNavigationMenu: true
  },
  {
    label: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
    includeInNavigationMenu: true
  },
  {
    label: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
    includeInNavigationMenu: true
  },
  {
    label: "Redirection to Home",
    element: <Navigate to="/" replace />,
    path: "*",
    includeInNavigationMenu: false
  }
]

export default routes
