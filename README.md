# Lightweight React.js Boilerplate

## Lightweight

The original code is generated using **Create React App**, so you may find some generated files specially like logo and the /public folder files.

The project uses Node.js v16 (make sure to carefully use the `.nvmrc` file and also the node version in Docker in case of) and TypeScript, without any styling lib, no SASS setup, no bunch of unnecessary packages, just what is needed for a base boilerplate. You can extend it and develop it the way you want.

The file structure is also very simple, I had another file structure pattern in mind, but I prefer to keep it like this "everything-per-folder" setup. **I personally prefer a modular approach**, but for this boilerplate it's setup to follow atomic additions based on prepared folders... So, you will find folders setup for you, and you're free to follow this file structure, or go with your own pattern.

It's setup to work:

- With no styling (preferred to keep it like this)
- Offline: using data factories, Faker and MSW (see **REACT_APP_OFFLINE** variable in the local `.env` file)
- With basic necessary packages which (IMO) every React.js app benefit from
- With **unit** tests
- With Storybook
- With Tooling: ESLint, Prettier, Husky, Commitlint and lint-staged
- With Docker: You can run the **dev** (environment) app using Docker and also unit tests and Storybook models can be run using Docker as well
- With `env.` files
- With HTTP handling using Axios and React Query (I personally use the `services` folder to setup my HTTP calls)
- With state handling using Redux Toolkit. You could use other state managers that are small, but I like to use Redux and now Redux Toolkit. Server state can be handled with either Redux Toolkit Query or adding another package for that such as React Query
- With authentication (JWT) setup

## What Could Be Added to This Boilerplate?

- Add **e2e** tests using Cypress or something else
- Enhance authentication (always important and great to do)
- Anything that can be added to Tooling to enhance the experience
- More basic scenario and components that will be used in every app and can be added as a boilerplate. Currently we handle authentication with basic components. It could have more other basic repetitive scenarios.
- A **prod** Docker environment
- Any other more helpful stuff!
