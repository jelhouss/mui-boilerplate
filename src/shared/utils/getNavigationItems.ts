import HeaderNavigationItem from "../../types/HeaderNavigationItem"
import NavigationItem from "../types/NavigationItem"

const getNavigationItems = () => {
  const navigationItems: HeaderNavigationItem[] = [
    {
      label: "Dashboard",
      path: "/app"
    },
    {
      label: "Teams",
      path: "/app/teams"
    }
  ]

  const popperItems: NavigationItem[] = [
    {
      label: "User Settings",
      path: "/app/user-settings"
    }
  ]

  const userSettingsItems: NavigationItem[] = [
    {
      label: "User Settings Dashboard",
      path: "/app/user-settings"
    },
    {
      label: "User Settings",
      path: "/app/user-settings/settings"
    },
    {
      label: "User Statistics",
      path: "/app/user-settings/statistics"
    }
  ]

  return { navigationItems, popperItems, userSettingsItems }
}

export default getNavigationItems
