import React from "react"
import { RouteProps } from "react-router-dom"

import About from "./About"
import Home from "./Home"
import NotFound from "./NotFound"
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
    label: "Not Found",
    element: <NotFound />,
    path: "*",
    includeInNavigationMenu: false
  }
]

export default routes
