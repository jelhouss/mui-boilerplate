// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from "@faker-js/faker"

import { AuthenticationResponse as AuthenticatedUser } from "../../types/authentication"
import { User, UserGender } from "../../types/user"

const generateUser = (data: Partial<User>): User => ({
  id: data.id || faker.datatype.uuid(),
  email: data.email || faker.internet.email(),
  lastName: data.lastName || faker.name.lastName(),
  firstName: data.firstName || faker.name.firstName(),
  monthOfBirth: data.monthOfBirth || faker.datatype.number({ min: 1, max: 12 }),
  dayOfBirth: data.dayOfBirth || faker.datatype.number({ min: 1, max: 31 }),
  yearOfBirth: data.yearOfBirth || faker.datatype.number({ min: 1970, max: 2010 }),
  gender: data.gender || faker.random.arrayElement(Object.values(UserGender)),
  createdAt: data.createdAt || faker.date.past().toISOString(),
  updatedAt: data.updatedAt || faker.date.recent().toISOString()
})

export const authenticatedUsers: AuthenticatedUser[] = [
  {
    token: "random_token",
    user: generateUser({
      email: "random@email.com"
    })
  }
]

export default generateUser
