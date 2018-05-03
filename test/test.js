const chai = require('chai');
const should = chai.should();
const app = require('../server.js');
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing endpoints', () => {
  beforeEach(done => {
    database.migrate.rollback()
      .then(()=> {
        database.migrate.latest()
          .then(()=> {
            return database.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  it('GET all projects', (done) => {
    chai.request(app)
      .get('/api/v1/projects')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(3);
      done();
      });
  });

  it('GET all palettes', (done) => {
    chai.request(app)
      .get('/api/v1/palettes')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
      done();
      });
  });

  it('GET all projects by a specified id', (done) => {
    chai.request(app)
      .get('/api/v1/projects/1')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('object');
    done();
    });
  });

  it('GET all palettes by a specfied id', (done) => {
    chai.request(app)
      .get('/api/v1/palettes/2')
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('object');
    done();
    });
  });

  it('POST projects to the database', (done) => {
    chai.request(app)
      .post('/api/v1/projects')
      .send({
        'name': 'project3'
      })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(201);
        response.body.should.be.an('object');
    done();
    });
  });  
  
  it('POST palettes to the database', (done) => {
    chai.request(app)
      .post('/api/v1/palettes')
      .send({
        'name': 'im over this',
        'color1': "#ffffff",
        'color2': "#ffffff",
        'color3': "#ffffff",
        'color4': "#ffffff",
        'color5': "#ffffff",
        'project_id': 1
      })
      .end((error, response) => {
        console.log(response)
        response.should.be.json;
        // response.should.have.status(201);
        response.body.should.be.an('object');
    done();
    });
  });

  // it('DELETE projects from the database', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/projects')
  //     .end((error, response) => {

  //   done();
  //   });
  // });  
  
  // it('DELETE palettes from the database', (done) => {
  //   chai.request(app)
  //     .delete('/api/v1/palettes')
  //     .end((error, response) => {

  //   done();
  //   });
  // });
}); 