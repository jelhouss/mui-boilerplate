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
    label: "UserSettings",
    path: "/app/user-settings/settings"
  },
  {
    label: "User statistics",
    path: "/app/user-settings/statistics"
  }
]

export default userSettingsItems
