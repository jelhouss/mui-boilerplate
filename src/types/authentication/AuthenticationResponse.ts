import User from "../../shared/types/User"

interface AuthenticationResponse {
  user: User
  token: string
}

export default AuthenticationResponse
