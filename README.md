# Lightweight React.js Boilerplate

## Lightweight

The original code is generated using **Create React App**.

The project uses Node.js v16 (make sure to carefully use the `.nvmrc` file and also the node version in Docker in case of), TypeScript, and Material UI.

## Not Stable, Yet!

You may notice **bugs**, unexpected issues, anything. Please note that this is just me playing with some stuff related to React and it's ecosystem.

This could be very basic and it contains basic and stable packages.

- Dealing with `.env` files (the production `.env` is safe to be shared for this case)
- Dealing with a themed Material UI setup
- Mocking/offline data
- Only unit tests (for now)
- Storybook modeling
- Developer tooling setup (ESlint, Prettier, Husky, lint-staged)
- Docker setup that may slap you hard at any given time with unexpected config bugs
- Dealing with HTTP using Axios/RTK Query (server state, caching layer) and by using RTK Query the code base uses Redux Toolkit for UI state
- Basic authentication setup

## Additions

- Add **e2e** tests using Cypress or something else
- Enhance authentication if needed
- Better tooling experience
- A **prod** Docker environment
- Context API and (better caching?) with React Query/SWR in favor of Redux Toolkit and Redux Toolkit Query
- more...
