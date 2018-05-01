const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.locals.titles = 'Palette Picker';
app.locals.projects = [];

// app.get('/api/v1/palettes', (request, response) => {

// });

// app.post('/api/v1/palettes', (request, response) => {

// });

//app.delete('/api/v1/palettes', (request, response) => {

// });

// app.get('/api/v1/projects', (request, response) => {

// });

// app.post('/api/v1/projects', (request, response) => {

// });

// app.delete('/api/v1/projects', (request, response) => {

// });

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('palette-picker is listening on port 3000');
});