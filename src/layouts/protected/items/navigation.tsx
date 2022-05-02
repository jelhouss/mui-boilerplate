import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import React from "react"

import { NavigationItem } from "../../../components/Header/Header"

const items: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/app",
    icon: <GridViewOutlinedIcon />
  },
  {
    label: "Teams",
    path: "/app/teams",
    icon: <GroupsOutlinedIcon />
  }
]

export default items
