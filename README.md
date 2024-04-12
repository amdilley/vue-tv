# TVue

## Project architecture
The application consists of a dashboard (with popular shows and search), and details pages for individual shows. The show search and details are provided by [TV Maze API](https://www.tvmaze.com/api).

### Vue for front end framework
Vue is a lightweight, but highly performant framework. It features reactivity as well as 2-way data-binding making it a more intuitive choice for this and many other front end projects.

### Performance
The application was designed with performance in mind. We want pages to load as quickly as possible and make as few calls as possible to any backend (first or third party). Therefore we want to cache as much data as we can. Given the static nature of the data there is little risk of the cached data being out of date.

#### Cache approach
Anytime a show result is returned we want to cache that data for future use. There are two primary ways show data can be fetched within the application:
1. It can come back as a search result
2. Directly hitting a show details page

For 1, after we call the search API and get array data back we take each show and add to our `pinia` shows store. This store is a dictionary of tv show IDs and their corresponding API data. For 2 we do the same but only have one object to add to our store.

When accessing a details page directly our application first checks our store for the cached data. If it's there it passed that to our `ShowDetails` component. Otherwise it calls the API endpoint, caches the data, then passes to `ShowDetails` component.

To ensure persistence for our store across page loads the `pinia-plugin-persistedstate` has been added in our `pinia` configuration.

### Top shows display
The [TV Maze API](https://www.tvmaze.com/api) doesn't provide any way to search with results returned in some sorted order. To generate a list of top shows we are limited to what is within our existing cache. In addition to a shows dictionary we also maintain an array of no more than 10 shows rated in order of decreasing average rating. Any time a show is added to the cache, it is also added via a binary search insert.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
