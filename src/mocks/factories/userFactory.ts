// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker"
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Factory from "factory.ts"

import { AuthenticationResponse as AuthenticatedUser } from "../../types/authentication"
import { User, UserGender } from "../../types/user"

const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each(() => faker.datatype.uuid()),
  email: faker.internet.email(),
  lastName: faker.name.lastName(),
  firstName: faker.name.firstName(),
  monthOfBirth: faker.datatype.number({ min: 1, max: 12 }),
  dayOfBirth: faker.datatype.number({ min: 1, max: 31 }),
  yearOfBirth: faker.datatype.number({ min: 1970, max: 2010 }),
  gender: faker.random.arrayElement(Object.values(UserGender)),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  avatar: faker.image.avatar()
})

export const authenticatedUsers: AuthenticatedUser[] = [
  {
    token: "random_token",
    user: userFactory.build({
      email: "random@email.com"
    })
  }
]

export default userFactory
