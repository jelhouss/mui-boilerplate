# Lightweight React.js Boilerplate

React.js 18, Material UI 5, Node.js 18

More: https://blog-jelhouss.vercel.app/posts/mui-boilerplate

To run this for development or demo purposes, check the `.env.development.template` file. I use it to run mocks, to do the same run: `cp .env.development.template .env.development.local` before running the app.

## Docker

- `docker compose up` to run the app in development using Docker

## Install

- `npm install` for local development

### Example Component

Make sure to run: `cp .env.test.template .env.test.local`

- `npm run test` example for unit testing example
- `npm run storybook` example for visual testing
- `npm run storybook:test` example for running Storybook test interactions (needs Storybook running)
- `npm run storybook:test:coverage` example for running Storybook test interactions with coverage (needs Storybook running)
