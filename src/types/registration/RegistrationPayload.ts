import UserGender from "../../shared/types/UserGender"

interface RegistrationPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: UserGender
}

export default RegistrationPayload
