# Movies App API

The Movies App API is a backend service built using Node.js, Express, and TypeScript. It acts as the data provider for the [Movies App](https://github.com/bauerbrun0/movies-app), a Next.js frontend application for browsing movies and TV shows. This API interacts with the [TMDB](https://developer.themoviedb.org/docs) (The Movie Database) API to fetch and deliver movie-related data to the frontend application.

## Installation

1. Clone this repository: `git clone https://github.com/bauerbrun0/movies-app-api.git`
2. Navigate to the project directory: `cd movies-app-api`
3. Install dependencies: `npm install`

## Configuration

To access the TMDB API, you'll need to provide an access token. Follow these steps:

1. Rename the `.env.example` file to `.env`: `mv .env.example .env`
2. Open the `.env` file and replace `<TMDB_ACCESS_TOKEN>` with your actual TMDB access token.

## Usage

### Running the Development Server

To launch the development server with automatic code reloading, use the following command:

```bash
npm run dev
```

The development server will be accessible at `http://localhost:3001`.

### Running the Production Server


Before running the production server, you'll need to build the TypeScript code into JavaScript:

```bash
npm run tsc
```

To start the production server, use:

```bash
npm start
```

The production server will be accessible at `http://localhost:3001`.

## Example Requests

We've provided example API requests in the `requests/` directory. These examples are formatted to work with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in Visual Studio Code. To use the examples:

1. Install the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) if you haven't already.
2. Navigate to the `requests/` directory.
3. Open the `.rest` files containing the example requests.
4. Utilize the "Send Request" option above each request to observe the API's responses.

These example requests demonstrate how to interact with the Movies App API to fetch movie and TV show data. They align with the [Movies App](https://github.com/bauerbrun0/movies-app) frontend's requirements, enabling seamless integration between the frontend and backend.
