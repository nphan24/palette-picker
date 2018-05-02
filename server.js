const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

console.log('environment', process.env);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));
app.use(express.static('public'));

app.locals.titles = 'Palette Picker';
app.locals.projects = [];
app.locals.palettes = [];

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(404).json(error)
    })
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then((project) => {
      response.status(200).json(project[0])
    })
    .catch((error) => {
      response.status(404).json(error)
    })
});

// app.post('/api/v1/projects', (request, response) => {
//   const id = Date.now();
//   const project = request.body;

//   if (!project) {
//     return response.status(422).send({error: 'No project property provided'});
//   } else {
//     app.locals.projects.push({ id, project });
//     return response.status(201).json({ id, project })
//   }
// });

// app.delete('/api/v1/projects', (request, response) => {

// });

app.get('/api/v1/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palette => {
      response.status(200).json(palette);
    })
    .catch(error => {
      response.status(404).json(error);
    });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then((palette) => {
      response.status(200).json(palette[0])
    })
    .catch((error) => {
      response.status(404).json(error)
    })
});

// app.post('/api/v1/palettes', (request, response) => {
//   const id = Date.now();
//   const palette = request.body;

//   if (!palette) {
//     return response.status(422).send({error: 'No palette property provided'})
//   } else {
//     app.locals.palette.push({ id, palette });
//     return response.status(201).json({ id, palette });
//   }
// });

// app.delete('/api/v1/palettes', (request, response) => {

// });

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('palette-picker is listening on port 3000');
});