const request = require('supertest');
const app = require('../index.js');
const db = require('../modelos/baseDatos.js');

jest.mock('../modelos/baseDatos.js'); // Mockear la base de datos

let server;

beforeAll((done) => {
  server = app.listen(3004, done); 
});

afterAll(async () => {
  await server.close();
  await db.pool.end();
});

describe('Express App', () => {
  it('should serve static files', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(res.text).toContain('<!DOCTYPE html>'); // Verifica que sirva un archivo HTML
  });

  /*it('should handle 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
  });*/

  app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
});
