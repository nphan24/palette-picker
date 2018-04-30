const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

// app.get('/', (request, response) => {
//   response.send('hello, i\m working');
// });

app.listen(app.get('port'), () => {
  console.log('palette-picker is listening on port 3000');
});