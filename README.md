# rec-perm

This is a Node-based tool to automate the capture of information related to river permits. The workflow it implements is as follows:

1. Navigate to the permit search page
1. Search for permits using the specified term
1. For each search result, navigate to its details page
1. For each details page, review all relevant months in the calendar
1. For each relevant month, capture the dates on which permits are available
1. For all availability, compare to the results of previous runs
1. For all new availability, notify the user via email
### How to use

After cloning the project locally:
1. Navigate to the project's root directory via the command line
1. Install dependencies using `npm install` (or `yarn`)
1. To run the tool continuously run `npm run scrape` (or `yarn scrape`)
1. To run the tool a single time flip `RUN_CONTINUOUSLY` to `false` in config.js
> Note: if you are running the scraper continuously you can set the interval it runs at using `TIME_BETWEEN_RUNS_MINUTES` in config.js

> Note: To receive email notifications you will need an appropriately configured .env file
### Requirements

* Node.js >= 10
* NPM or Yarn

### Key Dependencies

* [Playwright - browser automation tool](https://playwright.dev/docs/api/class-playwright)
* [Nodemailer - Node.js email utility](https://nodemailer.com/about/)

> Note: The complete list of project dependencies are expressed in package.json
### Contributing

In lieu of a linter this project follows the following style conventions:
* tab === 2 spaces
* All files end in an empty newline
* All constant variables are named using SNAKE_CASE
* All dynamic variables are named using camelCase
* Any variables representing a selected DOM node/element are prefixed with `$`
* The last element of a multi-line array, object, or list ends with a comma


### In this repository
* main.js - the main entry point into the script
* subtasks/* - individual subscripts abstracting/containing atomic actions
* config.js - a file containing static/constant values used to configure or otherwise specify runtime behaviors
* README.md (this file) - used to document relevant project knowledge, rendered as the front page of the GitHub repository
* package.json - a manifest of JavaScript dependencies installed by `npm install`. (package-lock.json is a built file based on the specific versions included in the last install)
* LICENSE - an MIT license regulating the fair use of this software
* .gitignore - a manifest of files that will not be tracked by Git (aka cannot be committed, pushed, or pulled)