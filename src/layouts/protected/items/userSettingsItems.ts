export interface UserSettingItem {
  label: string
  path: string
}

const userSettingsItems: UserSettingItem[] = [
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

export default userSettingsItems
