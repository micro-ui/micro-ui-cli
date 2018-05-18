# {{projectTitle}}

## First-time Setup

* Copy `.example.env` to `.env` (don't rename, copy it)
* Modify `.env` for your needs, it contains the api URL, debug state, etc.
* On production environments, use environment variables instead of `.env`, environment variables will override anything in .env

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
