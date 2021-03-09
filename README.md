# rec-perm

This is a Node-based tool to automate the capture of information related to river permits. The workflow it implements is as follows:

1. Navigate to the permit search page
1. Search for permits using the specified term
1. For each search result, navigate to its details page
1. For each details page, review all relevant months in the calendar
1. For each relevant month, capture the dates on which permits are available
1. For all availability, compare to the results of previous runs
1. For all new availability, notify the user (method TBD)

### How to use

After cloning the project locally:
1. Navigate to the project's root directory via the command line
1. Install dependencies using `npm install` (or `yarn`)
1. To run the tool a single time use `npm run scrape` (or `yarn scrape`)
1. To run the tool continuously run `npm run scrape:scheduled` (or `yarn scrape:scheduled`)
> Note: if you are running the scraper continuously you can set the interval it runs at using `SCRAPER_PROCESS_INTERVAL_MINUTES` in config.js
### Requirements

Node.js >= 10
NPM or Yarn

### Key Dependencies
> The complete list of project dependencies are expressed in package.json

* Playwrite - browser automation tool

### Contributing

In lieu of a linter this project follows the following style conventions:
* tab === 2 spaces
* All files end in an empty newline
* All constant variables are named using SNAKE_CASE
* All dynamic variables are named using camelCase
* Any variables representing a selected DOM node/element are prefixed with `$`
* The last element of a multi-line array, object, or list ends with a comma


### In this repository
* README.md - used to document relevant project knowledge, rendered as the front page of the GitHub repository
* LICENSE - an MIT license regulating the fair use of this software
* .gitignore - a manifest of files that will not be tracked by Git (aka cannot be committed, pushed, or pulled)
* config.js - a file containing static/constant values used to configure or otherwise specify runtime behaviors