import UserGender from "./UserGender"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  gender: UserGender
  createdAt: string
  updatedAt: string
  avatar: string
}

export default User
