const chai = require('chai');
const should = chai.should();
const app = require('../server.js');
const environment = process.env.NODE_ENV || 'development';
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
        response.body[0].name.should.equal('project1');
        response.body[0].id.should.equal(1);
        response.body[1].name.should.equal('project2');
        response.body[1].id.should.equal(2);
        response.body[2].name.should.equal('project3');
        response.body[2].id.should.equal(3);
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
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('spring');
        response.body[0].color1.should.equal('#0000FF');
        response.body[0].color2.should.equal('#FF0000');
        response.body[0].color3.should.equal('#FFA500');
        response.body[0].color4.should.equal('#FFFF00');
        response.body[0].color5.should.equal('#008000');
        response.body[0].project_id.should.equal(1);
        response.body[1].id.should.equal(2);
        response.body[1].name.should.equal('fall');
        response.body[1].color1.should.equal('#ffffff');
        response.body[1].color2.should.equal('#000000');
        response.body[1].color3.should.equal('#800080');
        response.body[1].color4.should.equal('#76eec6');
        response.body[1].color5.should.equal('#ff4040');
        response.body[1].project_id.should.equal(1);
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

  it('should not POST to projects if no name passed', (done) => {
    chai.request(app)
      .post('/api/v1/projects')
      .send({something: 'not a name'})
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(406);
        response.body.should.be.an('object');
        response.body.error.should.equal('Missing Data');
      });
    done();
  });
  
  it('POST palettes to the database', (done) => {
    chai.request(app)
      .post('/api/v1/palettes')
      .send({
        name: 'im over this',
        color1: "#ffffff",
        color2: "#ffffff",
        color3: "#ffffff",
        color4: "#ffffff",
        color5: "#ffffff",
        project_id: 1
      })
      .end((error, response) => {
        response.should.be.json;
        // response.should.have.status(201);
        response.body.should.be.an('object');
    done();
    });
  });

  it('should not POST to palettes if no name passed', (done) => {
    chai.request(app)
      .post('/api/v1/palettes')
      .send({ something: 'not a name' })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(406);
        response.body.should.be.an('object');
        response.body.error.should.equal('Missing Data');
      });
    done();
  });

  it('DELETE projects from the database', (done) => {
    chai.request(app)
      .delete('/api/v1/projects')
      .send({ id: 3 })
      .end((error, response) => {
      response.should.be.json;
      response.body.should.be.a('string');
    done();
    });
  });  
  
  it('DELETE palettes from the database', (done) => {
    chai.request(app)
      .delete('/api/v1/palettes')
      .send({ id: 2 })
      .end((error, response) => {
        response.should.json;
        response.body.should.be.a('string');
    done();
    });
  });
}); 