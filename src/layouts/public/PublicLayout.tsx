import React, { useMemo } from "react"
import { Outlet } from "react-router-dom"

import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import RedirectToDashboardIfAuthenticated from "../utils/RedirectToDashboardIfAuthenticated"
import FooterItems from "./items/footer"
import publicItems from "./items/navigation"

const PublicLayout = () => {
  const navigationItems = useMemo(() => publicItems, [])
  const footerItems = useMemo(() => FooterItems, [])

  return (
    <RedirectToDashboardIfAuthenticated>
      <div>
        <Header items={navigationItems} />

        <main>
          <Outlet />
        </main>

        <Footer items={footerItems} />
      </div>
    </RedirectToDashboardIfAuthenticated>
  )
}

export default PublicLayout
