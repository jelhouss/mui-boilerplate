import { faker } from "@faker-js/faker"
import * as Factory from "factory.ts"

import ExamplePayload from "../../types/example/ExamplePayload"
import ExampleUser from "../../types/example/ExampleUser"

const exampleFactory = Factory.Sync.makeFactory<ExampleUser>({
  id: Factory.each(() => faker.datatype.uuid()),
  lastName: faker.name.lastName(),
  firstName: faker.name.firstName()
})

const initRandomUser = exampleFactory.build()

export const initialTipExample: ExamplePayload[] = [{ user: initRandomUser, tip: 15 }]

export default exampleFactory
