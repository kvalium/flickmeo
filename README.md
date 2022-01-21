# Flickmeo monorepo

## Flickr & Vimeo bookmarks manager

👉👉 https://flickmeo.netlify.app/ 👈👈

### Development

Clone this repository them run:

```bash
yarn && yarn dev
```

It will start frontend on port `3000` and backend on port `8999`

### Technical data

#### Common

* [Lerna](https://lerna.js.org/) monorepo with some common dev dependencies for packages (ESLint + Prettier)
* Github actions CI

#### FrontEnd

* Typescript React app based on [Vite](https://vitejs.dev/) bundler
* [Material UI](https://mui.com/) theme and components
* Unit tests using [Vitest](https://vitest.dev/) framework
* Data synchronization and caching policy managed by [React Query](https://react-query.tanstack.com/) 
* Table features (filters, format, cell editing, pagination) managed by [DevExtreme Datagrid](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/)

#### Backend

* Express Typescript NodeJs app
* Serverless support for AWS
* Unit and integration tests using Jest and [Supertest](https://github.com/visionmedia/supertest)
