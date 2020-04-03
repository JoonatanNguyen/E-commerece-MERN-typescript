import express from 'express'

import {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.post('/newProduct', createProduct)
router.delete('/:productId', deleteProduct)
export default router
