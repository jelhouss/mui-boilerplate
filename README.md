# Lightweight React.js Boilerplate

## Lightweight

The original code is generated using **Create React App**.

The project uses Node.js v16 (make sure to carefully use the `.nvmrc` file and also the node version in Docker in case of), TypeScript, and Material UI.

The file structure is also very simple, I had another file structure pattern in mind, but I prefer to keep it like this "everything-per-folder" setup. **I personally prefer a modular approach**, but for this boilerplate it's setup to follow atomic additions based on semantic folders, and you're free to follow this file structure, or go with your own pattern.

It's setup to work:

- With Material UI
- Offline: using data factories, Faker and MSW (see **REACT_APP_OFFLINE** variable in the local `.env` file)
- With basic necessary packages which (IMO) every React.js app benefit from
- With **unit** tests
- With Storybook
- With Tooling: ESLint, Prettier, Husky, Commitlint and lint-staged
- With Docker: You can run the **dev** (environment) app using Docker and also unit tests and Storybook models can be run using Docker as well
- With `env.` files
- With HTTP handling using Axios and RTK Query (from Redux Toolkit)
- With app/UI state handling using Redux Toolkit (you could use other state manager).

Please note that server state can be handled with either Redux Toolkit Query or adding another package for that such as React Query

- With authentication (JWT) setup

## What Could Be Added to This Boilerplate?

- Add **e2e** tests using Cypress or something else
- Enhance authentication (always important and great to do)
- Anything that can be added to Tooling to enhance the experience
- More basic scenario and components that will be used in every app and can be added as a boilerplate. Currently we handle authentication with basic components. It could have more other basic repetitive scenarios.
- A **prod** Docker environment
- Any other more helpful stuff: Removing Redux in favor of Context API and use React Query or SWR for server state? Removing MUI and use another lib? probably others...
