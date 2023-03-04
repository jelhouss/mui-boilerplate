import { RequestHandler } from "msw"

import { initialTipExample } from "./factories/exampleFactory"
import { validDummyUsers } from "./factories/userFactory"
import authenticationHandler from "./handlers/authenticationHandler"
import exampleHandler from "./handlers/exampleHandler"
import registrationHandler from "./handlers/registrationHandler"
import userHandler from "./handlers/userHandler"

const handlers: RequestHandler[] = [
  ...exampleHandler(initialTipExample),
  ...authenticationHandler(validDummyUsers),
  ...registrationHandler(validDummyUsers),
  ...userHandler(validDummyUsers)
]

export default handlers
