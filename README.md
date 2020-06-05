# SlideSentinelGS
A GS Implementation to receive Rock7 Data and store it into a Spreadsheet.

## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)
- [Babel](https://babeljs.io/)

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Getting Started
### Clone the repository
```
git clone --depth=1 https://github.com/howdy39/gas-clasp-starter.git <project_name>
cd <project_name>
rm -Rf .git
```

### Install dependencies
```
npm install
```

### Development and build project
```
npm run build
```

### Push
```
clasp push
```

### Deploy
Use `clasp deployments` to view current deployments, and chose the deployment ID currently used by the RockBlock portal. To redeploy to that ID:
```
clasp deploy -i <deployment_id>
```
Note that `clasp deploy` without the `-i` flag will create a new deployment instead of modifying the old one, which changes the URL of the API.


## Notes
* The Google Apps Script edit portal breaks completely when `doPost` is enabled due to the size of the bundle. Use `clasp` wherever possible.
* In order to authorize the script to use Google Sheets, you may need to run a function in the Google Apps Script edit portal. To do this, comment out all functions except for the one which uses Google Sheets and run `npm run build && clasp push`. This will push a significantly smaller bundle, allowing the browser to reasonable load the Google Apps Script edit portal. Once this is done, use `clasp open` to open the edit portal, and manually run the function which uses Google Sheets. You should see a OAuth consent screen requesting access for your script, once you have completed this screen your script will freely be able to edit Sheets.
