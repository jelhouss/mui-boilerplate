/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, ComponentType, lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"

// eslint-disable-next-line react/display-name
const SuspenseWrapper = (Component: ComponentType) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<p>fallback suspense</p>}>
      <Component {...props} />
    </Suspense>
  )
}

const PublicLayout = SuspenseWrapper(lazy(() => import("./layouts/public/PublicLayout")))
const ProtectedLayout = SuspenseWrapper(lazy(() => import("./layouts/protected/ProtectedLayout")))

// public
const OverviewPage = SuspenseWrapper(lazy(() => import("./pages/OverviewPage")))
const SignInPage = SuspenseWrapper(lazy(() => import("./pages/SignInPage")))
const SignUpPage = SuspenseWrapper(lazy(() => import("./pages/SignUpPage")))

// protected
const DashboardPage = SuspenseWrapper(lazy(() => import("./pages/DashboardPage")))
const StaffPage = SuspenseWrapper(lazy(() => import("./pages/StaffPage")))
const TeamsPage = SuspenseWrapper(lazy(() => import("./pages/TeamsPage")))

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
      }
    ]
  }
]

export default routes
