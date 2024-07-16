const request = require('supertest');
const app = require('../index'); // Asegúrate de que el path es correcto
const db = require('../modelos/baseDatos');

/*const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });*/

jest.mock('../modelos/baseDatos'); // Mockear la base de datos

let server;

beforeAll(() => {
  server = app.listen(3003);
});

afterAll(async () => {
  await server.close();
  await db.pool.end();
});

describe('API Routes', () => {
  it('should get data from /api/data', async () => {
    db.query.mockImplementation((text, params, callback) => {
      callback(null, { rows: [{ id: 1, name: 'Test', value: 100 }] });
    });

    const res = await request(app).get('/api/data');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should post data to /api/data', async () => {
    db.query.mockImplementation((text, params, callback) => {
      callback(null, { rowCount: 1 });
    });

    const res = await request(app)
      .post('/api/data')
      .send({ name: 'Test', value: 100 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Data inserted successfully');
  });
});
