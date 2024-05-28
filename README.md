# Realtime Todo

## Implemented Stories

- I as a user can create to-do items, such as a grocery list.
- I as another user can collaborate in real-time with user - so that we
  can (for example) edit our family shopping-list together.
- I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on
  things that are still pending.
- I as a user can filter the to-do list and view items that were marked as done - so that I
  can retrospect on my prior progress.
- I as a user can add sub-tasks to my to-do items - so that I could make logical groups
  of tasks and see their overall progress.
- I as a user can change the order of tasks via drag & drop
- I as a user can be sure that my todos will be persisted so that important information
  is not lost when server restarts

## Prerequisites

- [Node v20](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [nvm](https://github.com/nvm-sh/nvm) (Optional)

## Setting Node Version with nvm (Optional)

If you have nvm installed, you can set the Node.js version for this project by running `nvm use` in the project root directory.
This will switch to the Node.js version specified in the .nvmrc file.

## Start the database

Run `docker compose up -d` to start the MongoDB database.

Run `docker compose down` to stop the MongoDB database.

## Start the application

Run `npx run dev` to start the all development servers (API + UI).

Run `npx run dev:api` to start the development server for only the API.

Run `npx run dev:ui` to start the development server for only the UI.

## Build for production

Run `npm run build` to build all applications (API + UI). The build artifacts are stored in the output directory `dist/`.

Run `npm run build:api` to build the API. The build artifacts are stored in the output directory `dist/`.

Run `npm run build:ui` to build the UI. The build artifacts are stored in the output directory `dist/`.

## Running tests

Run `npm run test:ui` to run the UI tests.
Run `npm run test:api` to run the API tests.

## Potential issues

If you're having issues starting or building the application with errors similar to: `[NX]   Cannot read properties of null (reading 'message')`, please try X by running `npm run reset` and then run your command again.

This command will clear all the cached Nx artifacts, metadata about the workspace and shuts down the Nx Daemon.
