import Product, { ProductDocument } from '../models/Product'
import _isEmpty from 'lodash/isEmpty'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then(product => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

function findAll(query?: any): Promise<ProductDocument[]> {
  return Product.find()
    .sort({ name: 1 })
    .exec() // Return a Promise
    .then(product => {
      const filterProduct = product.filter(
        product =>
          product.name.includes(query) ||
          product.categories.includes(query) ||
          product.variants.map(v => v.color).includes(query)
      )
      if (!_isEmpty(query) && _isEmpty(filterProduct)) {
        throw new Error('Product not found')
      }

      return _isEmpty(filterProduct) ? product : filterProduct
    })
}

function update(
  productId: string,
  updatedField: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then(product => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }

      if (updatedField.name) {
        product.name = updatedField.name
      }
      if (updatedField.shortDescription) {
        product.shortDescription = updatedField.shortDescription
      }
      if (updatedField.categories) {
        product.categories = updatedField.categories
      }
      if (updatedField.variants) {
        product.variants = updatedField.variants
      }
      if (updatedField.price) {
        product.price = updatedField.price
      }
      if (updatedField.medias) {
        product.medias = updatedField.medias
      }
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteProduct,
}
