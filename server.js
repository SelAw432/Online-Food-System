const app = require('./app');

// app.listen(8090);

app.listen(8090, () => {
    console.log(`Listening at http://127.0.0.1:${8090}`)
  })