import { faker } from "@faker-js/faker"
import * as Factory from "factory.ts"

import User from "../../shared/types/User"
import UserGender from "../../shared/types/UserGender"
import AuthenticationResponse from "../../types/authentication/AuthenticationResponse"

const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each(() => faker.datatype.uuid()),
  email: faker.internet.email(),
  lastName: faker.name.lastName(),
  firstName: faker.name.firstName(),
  gender: faker.helpers.arrayElement(Object.values(UserGender)),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  avatar: faker.image.avatar()
})

export type ValidDummyUser = AuthenticationResponse

const dummyUser = userFactory.build({
  email: "random@email.com"
})

export const validDummyUsers: ValidDummyUser[] = [{ token: "random_token", user: dummyUser }]

export default userFactory
