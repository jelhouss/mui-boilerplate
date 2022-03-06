/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress from "@mui/material/CircularProgress"
import React, { Suspense, ComponentType, lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"

// eslint-disable-next-line react/display-name
const SuspenseWrapper = (Component: ComponentType) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  )
}

const PublicLayout = SuspenseWrapper(lazy(() => import("./layouts/public/PublicLayout")))
const ProtectedLayout = SuspenseWrapper(lazy(() => import("./layouts/protected/ProtectedLayout")))
const UserSettingsLayout = SuspenseWrapper(
  lazy(() => import("./layouts/protected/UserSettingsLayout"))
)

// public
const OverviewPage = SuspenseWrapper(lazy(() => import("./pages/OverviewPage")))
const SignInPage = SuspenseWrapper(lazy(() => import("./pages/SignInPage")))
const SignUpPage = SuspenseWrapper(lazy(() => import("./pages/SignUpPage")))
const AboutProductPage = SuspenseWrapper(lazy(() => import("./pages/AboutProductPage")))

// protected
const DashboardPage = SuspenseWrapper(lazy(() => import("./pages/DashboardPage")))
const StaffPage = SuspenseWrapper(lazy(() => import("./pages/StaffPage")))
const TeamsPage = SuspenseWrapper(lazy(() => import("./pages/TeamsPage")))

// user settings

const UserSettingsDashboardPage = SuspenseWrapper(
  lazy(() => import("./pages/userSettings/UserSettingsDashboardPage"))
)
const UserStatisticsPage = SuspenseWrapper(
  lazy(() => import("./pages/userSettings/UserStatisticsPage"))
)
const UserSettingsPage = SuspenseWrapper(
  lazy(() => import("./pages/userSettings/UserSettingsPage"))
)

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/" replace />
      },
      {
        path: "/",
        element: <OverviewPage />
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
        path: "about-product",
        element: <AboutProductPage />
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
        path: "/app",
        element: <DashboardPage />
      },
      {
        path: "teams",
        element: <TeamsPage />
      },
      {
        path: "staff",
        element: <StaffPage />
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
            path: "/app/user-settings",
            element: <UserSettingsDashboardPage />
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
]

export default routes
