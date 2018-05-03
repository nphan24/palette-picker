const express = require('express');//import empress from node modules
const app = express();//make app an instance of express
const bodyParser = require('body-parser');//used to be a dependencies but not anymore. It allows us to use the information in the request body object.
const environment = process.env.NODE_ENV || 'development';//using the development envoirnment
const configuration = require('./knexfile')[environment];//tells knex to go find this envoirnment file
const database = require('knex')(configuration);//tells knex to use this envoirnment configuration information

app.use(bodyParser.json());//tells the app, we want json used
app.use(bodyParser.urlencoded({ entended: true }));//allows parsing with the qs library.
app.use(express.static('public'));//a middleware, tells the app to run the index file from the directory public at the root url.

app.locals.titles = 'Palette Picker';//local variable that persist throughout the life of the application

app.get('/api/v1/projects', (request, response) => {//get request to the following endpoint, takes a required request and a response.
  database('projects').select()//selects all from the table projects
    .then((projects) => {
      response.status(200).json(projects)//sends back a response status and an array of projects if successfull, happy path
    })
    .catch((error) => {//sends back an error if there is an error, this is the sad path
      response.status(404).json(error)
    })
});

app.get('/api/v1/projects/:id', (request, response) => {//makes a dynamic endpoint with the id thats passed into the request.
  database('projects').where('id', request.params.id).select()//selects from tables where the id matches whats passed in.
    .then((project) => {//returns a response with a success status and an array. project[0] to specify the first index since the response is an array. This is the happy path.
      response.status(200).json(project[0])
    })
    .catch((error) => {//sends back an error if unable to get, this is the sad path
      response.status(404).json(error)
    })
});

app.post('/api/v1/projects', (request, response) => {//creating an object at the following endpoint
  const project = request.body;//request.body is the object that needs to be posted into the database

  database('projects').insert(project, 'id')//insert into the database at the projects table the object, then return its id
    .then(project => {//if the post was succesful, return the id
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {//sends back an error if unable to post, this is the sad path
      response.status(500).json({error})
    });
});

app.delete('/api/v1/projects', (request, response) => {//delete the object at the following endpoint.
  const id = request.body.id;//request object at the following id is what to delete

  database('projects').where('id', id).del()//delete from the projects table where the id matches the one passed in
   .then(projects => {//return the string 'success' if the deleted successfully
     response.status(202).json('success')
   })
   .catch(error => {//sends back an error if unable to delete, this is the sad path
     response.status(500).json({error})
   })
});

app.get('/api/v1/palettes', (request, response) => {//get palettes at the following endpoint
  database('palettes').select()//select all from palettes table
    .then(palette => {//return the array of objects if the request was successful
      response.status(200).json(palette);
    })
    .catch(error => {//sends back an error if unable to get, this is the sad path
      response.status(404).json(error);
    });
});

app.get('/api/v1/palettes/:id', (request, response) => {//dynamically retrieve palettes from the id thats passed in
  database('palettes').where('id', request.params.id).select()//get from the palettes table where the id matches what's passed in
    .then((palette) => {//return the one object if it's found
      response.status(200).json(palette[0])
    })
    .catch((error) => {//sends back an error if unable to retrieve, this is the sad path
      response.status(404).json(error)
    })
});

app.post('/api/v1/palettes', (request, response) => {//post new object to the database at the following endpoint
  const palette = request.body;

  database('palettes').insert(palette, 'id')//insert the request object at the palettes table and return its id
    .then(palette => {//happy path, success, return the id
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {//sends back an error if unable to post, this is the sad path
      response.status(500).json(error)
    })
});

app.delete('/api/v1/palettes', (request, response) => {//delete object at the following endpoint
  const id = request.body.id;

  database('palettes').where('id', id).del()//delete from the palettes table where the id matches what's passed in
   .then(palettes => {//return 'success' if the object was posted
     response.status(202).json('success')
   })
   .catch(error => {//sends back an error if unable to post, this is the sad path
     response.status(500).json({error})
   })
});

app.set('port', process.env.PORT || 3000);//dynamically sets the path, the default is 3000

app.listen(app.get('port'), () => {//server is listen for the port, it logs the following string is there is a change and it is successful
  console.log('palette-picker is listening on port 3000');
});