# Project structure
 - **helpers/** - contains classes with helper methods
   - **browserActions.helper.ts** - helpers for common browser actions
   - **logger.helper.ts** - logger class
   - **waiterHelpers.helper.ts** - helpers for waiting for different conditions
- **pageObjects/** - contains page objects for tested pages
- **reports/** - contains test results. This folder is automatically cleaned up before each test execution
- **specs/** - contains spec files for every suite
   - **navigation-between-sites.spec.ts** - test for "Navigation between sites works properly"
   - **slideshow-animation.spec.ts** - test for "Slideshow (animation) is working"
   - **tile-hover-effects.spec.ts** - test for "Verify that hover effects for each Tile are animated"
- **package.json** - npm configurations
- **protractor.conf.js** - protractor configuration file
- **tsconfig.json** - TypeScript configuration

# How to execute tests
## Requirements
- Node version: v12.10.x or higher 

NOTE: Code was tested with Node v12.13.0

## Setup
1. Navigate to project root folder
1. Run `npm install`
1. Run `npm run webdriver-update`

**Note:** `npm run webdriver-update` will download `chromedriver` for the latest published chrome browser.  
If for some reason you have Chrome browser which is not supported by the latest `chromedriver` run:
`npm run webdriver-update -- --versions.chrome <full-chrome-version>`.   
Where `<full-chrome-version>` is a version of your Chrome (e.g. `83.0.4103.61`)  


## Execute tests
1. To execute all available test suites run:  
`npm run e2e -- --username=<username> --password=<password>`
1. To execute **Slideshow (animation) is working** suite run:  
`npm run e2e:slideshow -- --username=<username> --password=<password>`  
1. To execute **Navigation between sites works properly** suite run:  
`npm run e2e:navigation_between_sites -- --username=<username> --password=<password>`
1. To execute **Verify that hover effects for each Tile are animated** suite run:   
`npm run e2e:tile_hover -- --username=<username> --password=<password>`

## Test results
After test execution is done please find `html` report at `reports/html-report/report.html`
