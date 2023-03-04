import * as React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

// layouts
const PublicLayout = React.lazy(() => import("../layouts/PublicLayout"))

const ProtectedLayout = React.lazy(() => import("../layouts/ProtectedLayout"))
const UserSettingsLayout = React.lazy(() => import("../layouts/UserSettingsLayout"))

// main public
const OverviewPage = React.lazy(() => import("../pages/OverviewPage"))
const SignInPage = React.lazy(() => import("../pages/SignInPage"))
const SignUpPage = React.lazy(() => import("../pages/SignUpPage"))
const AboutPage = React.lazy(() => import("../pages/AboutPage"))

// main protected
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"))
const TeamsPage = React.lazy(() => import("../pages/TeamsPage"))

// user settings
const UserSettingsDashboardPage = React.lazy(
  () => import("../pages/UserSettings/UserSettingsDashboardPage")
)

const UserStatisticsPage = React.lazy(() => import("../pages/UserSettings/UserStatisticsPage"))

const UserSettingsPage = React.lazy(() => import("../pages/UserSettings/UserSettingsPage"))

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/" replace />
      },
      {
        element: <OverviewPage />,
        index: true
      },
      {
        path: "sign-in",
        element: <SignInPage />
      },
      {
        path: "sign-up",
        element: <SignUpPage />
      },
      {
        path: "about",
        element: <AboutPage />
      }
    ]
  },
  {
    path: "app",
    element: <ProtectedLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/app" replace />
      },
      {
        element: <DashboardPage />,
        index: true
      },
      {
        path: "teams",
        element: <TeamsPage />
      },
      {
        path: "user-settings",
        element: <UserSettingsLayout />,
        children: [
          {
            path: "*",
            element: <Navigate to="/app/user-settings" replace />
          },
          {
            element: <UserSettingsDashboardPage />,
            index: true
          },
          {
            path: "settings",
            element: <UserSettingsPage />
          },
          {
            path: "statistics",
            element: <UserStatisticsPage />
          }
        ]
      }
    ]
  }
])

export default browserRouter
