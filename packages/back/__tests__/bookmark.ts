import fetchMock from 'jest-fetch-mock';
import { default as request } from 'supertest';
import { app } from '../src/app';

fetchMock.enableMocks();

describe('GET /bookmarks', function () {
  it('returns bookmarks list', (done) => {
    request(app)
      .get('/bookmarks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { success: true, payload: [] }, done);
  });
});

describe('POST /bookmarks', function () {
  it('returns success false on empty body provided', (done) => {
    request(app)
      .post('/bookmarks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { success: false, error: {} }, done);
  });
  it('returns success false on invalid body provided', (done) => {
    request(app)
      .post('/bookmarks')
      .set('Accept', 'application/json')
      .set('body', JSON.stringify({ invalid: true }))
      .expect('Content-Type', /json/)
      .expect(200, { success: false, error: {} }, done);
  });
  it('returns success false on invalid body provided', (done) => {
    request(app)
      .post('/bookmarks')
      .set('Accept', 'application/json')
      .set('body', JSON.stringify({ invalid: true }))
      .expect('Content-Type', /json/)
      .expect(200, { success: false, error: {} }, done);
  });
  xit('add a new bookmark', (done) => {
    request(app)
      .post('/bookmarks')
      .set('Accept', 'application/json')
      .set('body', JSON.stringify({ link: 'A' }))
      .expect('Content-Type', /json/)
      .expect(200, { success: false, error: {} }, done);
  });
});
