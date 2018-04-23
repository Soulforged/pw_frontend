# PegB Wallet Web

This is the web frontend project for PegB Wallet's backoffice.

## Prerequisites

* node (tested with 9.x.x or more, might work with others)
* npm or yarn
* flow-typed

## Start development server

`yarn start`

That will open a browser tab with the app and will keep linter running in a loop.

### Contingency measures

Since no proper server exists yet you'll need to download and run
https://dicardo@bitbucket.org/pegb/pegb_wallet_web_proxy.git

## Build prod version

`yarn build`

Then deploy everything inside /build to an HTTP server.

## Run tests

`yarn test` or `yarn test --coverage`

First command will watch for source changes and rerun tests as needed.

Second command will also run coverage and display reports.

## Contributing
* Always run `yarn lint && yarn test --coverage` before pushing your changes.
* If no errors are reported then you can push (warnings are acceptable,
  just try to keep them under control).
