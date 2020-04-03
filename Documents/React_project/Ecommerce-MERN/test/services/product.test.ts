import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7642'
const nonExistingSearchTerm = 'blasblas'

async function createProduct() {
  const product = new Product({
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
  })
  return await ProductService.create(product)
}

describe('product service', () => {
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
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Heritage')
    expect(product).toHaveProperty(
      'shortDescription',
      'This is a fashion watch'
    )
    expect(product.categories).toHaveLength(2)
    expect(product.variants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          image: expect.arrayContaining([]),
          color: expect.anything(),
        }),
      ])
    )
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found.shortDescription).toEqual(product.shortDescription)
    expect(found._id).toEqual(product._id)
    expect([...found.categories]).toEqual([...product.categories])
    //missing expect variants
  })

  it('should not get a non-existing product', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch(e => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should find all the product', async () => {
    const product1 = await createProduct()
    const product2 = await createProduct()
    const products = await ProductService.findAll()
    expect(products).toHaveLength(2)
    expect(products[0]._id).toEqual(product1._id)
    expect(products[1]._id).toEqual(product2._id)
  })

  it('should find product/products with match search term', async () => {
    await createProduct()
    const query = 'Heritage'
    const found = await ProductService.findAll(query)
    expect(
      found.map(f => f.name) ||
        found.map(f => f.categories) ||
        found.map(f => f.variants.map(c => c.color))
    ).toContain(query)
  })

  it('should not get a non-existing search term', async () => {
    expect.assertions(1)
    return ProductService.findAll(nonExistingSearchTerm).catch(e => {
      expect(e.message).toMatch('Product not found')
    })
  })

  it('should update an existing product', async () => {
    const product = await createProduct()
    const update = {
      name: 'DW 2017',
      shortDescription: 'This is Daniel Welington watch',
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'DW 2017')
    expect(updated).toHaveProperty(
      'shortDescription',
      'This is Daniel Welington watch'
    )
  })

  it('should not update non-existing product', async () => {
    expect.assertions(1)
    const update = {
      categories: ['Kid', 'Watch'],
    }
    return ProductService.update(nonExistingProductId, update).catch(e => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.findById(product._id).catch(e => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })
})
