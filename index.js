/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('./src/app');

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
    console.log(`App is listening on port ${APP_PORT}`)
})

