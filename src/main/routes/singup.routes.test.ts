import request from 'supertest'
import { app } from '../app'

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Filipe Siqueira',
        email: 'filipe@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
