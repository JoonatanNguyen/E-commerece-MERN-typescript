import request from 'supertest'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User, { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets'

const admin = {
  id: '5e678ad12a21d822190c8495',
  email: 'admin@gmail.com',
  lastname: 'Mock',
  firstname: 'Admin',
  username: 'Admin Mock',
  isAdmin: true,
}

const token = jwt.sign(admin, JWT_SECRET, { expiresIn: '1h' })

const nonExistingUserId = '5e678ad12a21d822190c8499'
const nonExistingProductId = '5e57b77b5744fa0b461c7642'

// jest.mock(
//   '../../src/middlewares/authJWT',
//   () => (req: Request, res: Response, next: NextFunction) => next()
// )

async function createUser(updateRequest?: Partial<UserDocument>) {
  let user = {
    username: 'ChicKadoo',
    firstname: 'Chic',
    lastname: 'Kadoo',
    email: 'chickadoo@gmail.com',
    password: 'ChicKadoo123',
  }
  // let salt = crypto.randomBytes(6)
  user.password = await bcrypt.hash(user.password, 10)

  if (updateRequest) {
    user = { ...user, ...updateRequest }
  }

  return await request(app)
    .post('/api/v1/users/account/signup')
    .set({ Authorization: `Bearer ${token}` })
    .send(user)
}
async function createUser2(updateRequest?: Partial<UserDocument>) {
  let user = {
    username: 'ChicKudaa',
    firstname: 'Chic',
    lastname: 'Kudaa',
    email: 'chickudaa@gmail.com',
    password: 'ChicKudaa123',
  }
  // let salt = crypto.randomBytes(6)
  user.password = await bcrypt.hash(user.password, 10)

  if (updateRequest) {
    user = { ...user, ...updateRequest }
  }

  return await request(app)
    .post('/api/v1/users/account/signup')
    .set({ Authorization: `Bearer ${token}` })
    .send(user)
}

describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should sign user up', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.username).toBe('ChicKadoo')
    expect(res.body.email).toEqual('chickadoo@gmail.com')
  })

  it('should not sign user up with existing email', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)

    const user2 = await request(app)
      .post('/api/v1/users/account/signup')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: 'ChicKudaa',
        firstname: 'Chic',
        lastname: 'Kudaa',
        email: 'chickadoo@gmail.com',
        password: 'ChicKudaa123',
      })
    expect(user2.status).toBe(201)
  })

  // it('should sign user in', async () => {
  //   let res = await createUser()
  //   expect(res.status).toBe(200)
  //   console.log(res.body)

  //   res = await request(app)
  //     .post('/api/v1/users/account/signin')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({
  //       email: 'chickadoo@gmail.com',
  //       password: 'ChicKadoo123',
  //     })

  //   expect(res.status).toBe(200)
  // })

  it('should update user profile', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      username: 'Cheekie',
      firstname: 'Chee',
      lastname: 'kie',
    }

    res = await request(app)
      .put(`/api/v1/users/profile/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.username).toEqual('Cheekie')
    expect(res.body._id).toEqual(userId)
  })

  it('should not update user profile with wrong userId', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const update = {
      username: 'Cheekie',
      firstname: 'Chee',
      lastname: 'kie',
    }

    res = await request(app)
      .put(`/api/v1/users/profile/${nonExistingUserId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(update)
    expect(res.status).toEqual(404)
  })

  // it('should change user password', async () => {
  //   let res = await createUser()
  //   expect(res.status).toBe(200)

  //   const username = 'ChicKadoo'
  //   const oldPassword = 'ChicKadoo123'
  //   const newPassword = 'ChicKudaa123'

  //   res = await request(app)
  //     .put('/api/v1/users/account/changePassword')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({
  //       username: username,
  //       oldPassword: oldPassword,
  //       newPassword: newPassword,
  //     })

  //   expect(res.status).toEqual(200)
  // })

  it('should not change user password with non-existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const username = 'Chickadun'
    const oldPassword = 'ChicKadoo123'
    const newPassword = 'ChicKudaa123'

    res = await request(app)
      .put('/api/v1/users/account/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })

    expect(res.status).toEqual(404)
  })

  it('should not change user password with wrong old password', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const username = 'ChicKadoo'
    const oldPassword = 'ChicKadoo12'
    const newPassword = 'ChicKudaa123'

    res = await request(app)
      .put('/api/v1/users/account/changePassword')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })

    expect(res.status).toEqual(400)
  })

  it('should add product to cart', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const productCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 4,
    }

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(productCart)

    expect(res.status).toBe(200)
    expect(res.body.message).toEqual('Product added')
  })

  it('should not add product to cart with wrong userId', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const productCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 4,
    }

    res = await request(app)
      .post(`/api/v1/users/cart/${nonExistingUserId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(productCart)

    expect(res.status).toBe(404)
  })

  it('should get all users', async () => {
    const res = await createUser()
    const res2 = await createUser2()

    const res3 = await request(app)
      .get('/api/v1/users')
      .set({ Authorization: `Bearer ${token}` })

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  // it('should get all the product in cart', async () => {
  //   let res = await createUser()
  //   const userId = res.body._id
  //   const productCart = {
  //     product: {
  //       productId: '5e60a698e5ea4f06b3202b1d',
  //       variantId: '5e60a698e5ea4f06b3202b1e',
  //     },
  //     quantity: 1,
  //   }

  //   res = await request(app)
  //     .post(`/api/v1/users/cart/${userId}`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send(productCart)

  //   console.log(res.status)

  //   const res1 = await request(app)
  //     .get('/api/v1/users/cart')
  //     .set({ Authorization: `Bearer ${token}` })
  //   expect(res1.status).toEqual(200)
  // })

  it('should decrease the product quantity in cart', async () => {
    let res = await createUser({
      email: 'admin@gmail.com',
      lastname: 'Mock',
      firstname: 'Admin',
      username: 'Admin Mock',
    })
    expect(res.status).toBe(200)

    const userId = res.body._id
    const productCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 4,
    }
    const productId = '5e60a698e5ea4f06b3202b1d'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(productCart)

    res = await request(app)
      .delete(`/api/v1/users/cart/${productId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res.status).toEqual(204)
  })

  it('should decrease the product quantity in cart', async () => {
    let res = await createUser({
      email: 'admin@gmail.com',
      lastname: 'Mock',
      firstname: 'Admin',
      username: 'Admin Mock',
    })
    expect(res.status).toBe(200)

    const userId = res.body._id
    const productCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 4,
    }

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(productCart)

    res = await request(app)
      .delete(`/api/v1/users/cart/${nonExistingProductId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res.status).toEqual(404)
  })
})
