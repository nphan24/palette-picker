const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));
app.use(express.static('public'));

app.locals.titles = 'Palette Picker';

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

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  if (!project.name) {
    return response.status(406).send({ error: 'Missing Data'})
  } else {
    database('projects').insert(project, 'id')
      .then(project => {
        response.status(201).json({ id: project[0] })
      })
      .catch(error => {
        response.status(500).json({error})
      });
    };
});

app.delete('/api/v1/projects', (request, response) => {
  const id = request.body.id;

  database('projects').where('id', id).del()
   .then(projects => {
     response.status(202).json('success')
   })
   .catch(error => {
     response.status(500).json({error})
   })
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
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

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  if (!palette.name) {
    return response.status(406).send({ error: 'Missing Data'})
  } else {
    database('palettes').insert(palette, 'id')
      .then(palette => {
        response.status(201).json({ id: palette[0] })
      })
      .catch(error => {
        response.status(500).json(error)
    });
  }; 
});

app.delete('/api/v1/palettes', (request, response) => {
  const id = request.body.id;

  database('palettes').where('id', id).del()
   .then(palettes => {
     response.status(202).json('success')
   })
   .catch(error => {
     response.status(500).json({error})
   })
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('palette-picker is listening on port 3000');
});

module.exports = app;