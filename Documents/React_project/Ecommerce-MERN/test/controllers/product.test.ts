import request from 'supertest'
import jwt from 'jsonwebtoken'

import Product, { ProductDocument } from '../../src/models/Product'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets'

const nonExistingProductId = '5e57b77b5744fa0b461c7642'
const nonExistingSearchTerm = 'blasblas'

const admin = {
  email: 'admin@gmail.com',
  lastname: 'Mock',
  firstname: 'Admin',
  username: 'Admin Mock',
  isAdmin: true,
}

const token = jwt.sign(admin, JWT_SECRET, { expiresIn: '1h' })

async function createProduct(updateRequest?: Partial<ProductDocument>) {
  let product = {
    name: 'Heritage',
    shortDescription: 'This is a fashion watch',
    categories: ['Men', 'Watch'],
    variants: [
      {
        image: [
          'https://primeambassador.com/assets/images/blocks/watch_header/2/3.jpg',
        ],
        color: 'green',
      },
      {
        image: [
          'https://primeambassador.com/assets/images/blocks/watch_header/2/3.jpg',
        ],
        color: 'blue',
      },
    ],
  }

  if (updateRequest) {
    product = { ...product, ...updateRequest }
  }

  return await request(app)
    .post('/api/v1/products/newProduct')
    .set({ Authorization: `Bearer ${token}` })
    .send(product)
}

describe('product controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Heritage')
    expect(res.body.shortDescription).toBe('This is a fashion watch')
    expect(res.body.categories).toEqual(['Men', 'Watch'])
    // expect(res.body.variants).toEqual(['Men', 'Watch'])
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products/newProduct')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        // name: 'Heritage',
        description: 'This is a fashion watch',
        categories: ['Men', 'Watch'],
        //missing variants as required in the schema
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app)
      .get(`/api/v1/products/${productId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app)
      .get(`/api/v1/products/${nonExistingProductId}`)
      .set({ Authorization: `Bearer ${token}` })
    expect(res.status).toBe(404)
  })

  it('should get back all product', async () => {
    const res1 = await createProduct({
      name: 'Heritage 1',
      categories: ['Men', 'Watch'],
    })

    const res2 = await createProduct({
      name: 'Heritage 2',
      categories: ['Women', 'Watch'],
    })

    const res3 = await request(app)
      .get(`/api/v1/products`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  //case for existing search term

  it('should get back all product with correct search term', async () => {
    const res1 = await createProduct({
      name: 'Heritage 1',
      categories: ['Men', 'Watch'],
    })

    const res2 = await createProduct({
      name: 'Heritage 2',
      categories: ['Women', 'Watch'],
    })
    const searchTerm = 'Men'

    const res3 = await request(app)
      .get(`/api/v1/products/?searchTerm=${searchTerm}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res3.body.length).toEqual(1)
    expect(res3.body[0]._id).toEqual(res1.body._id)
  })

  it('should not get back product/products with wrong search term', async () => {
    const res = await request(app)
      .get(`/api/v1/products/?searchTerm=${nonExistingSearchTerm}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res.status).toBe(404)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'DW 2017',
    }

    res = await request(app)
      .put(`/api/v1/products/${productId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('DW 2017')
  })

  it('should not update a non-existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const update = {
      name: 'DW 2017',
    }

    res = await request(app)
      .put(`/api/v1/products/${nonExistingProductId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(update)

    expect(res.status).toEqual(404)
  })

  it('should delete an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app)
      .delete(`/api/v1/products/${productId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/products/${productId}`)
      .set({ Authorization: `Bearer ${token}` })
    expect(res.status).toBe(404)
  })
})
