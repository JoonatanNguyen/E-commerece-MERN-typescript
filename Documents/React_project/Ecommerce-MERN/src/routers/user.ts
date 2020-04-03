import express from 'express'
import passport from 'passport'

import {
  signupUser,
  getAllUsers,
  updateUserProfile,
  signinUser,
  sendEmailRequest,
  validateToken,
  resetPassword,
  changePassword,
  addProductToCart,
  getProductInCart,
  decreaseProductQuantity,
  authenticate,
} from '../controllers/user'

const router = express.Router()

router.get('/', getAllUsers)
router.post('/account/signup', signupUser)
router.post('/account/signin', signinUser)
router.post('/account/emailRequest', sendEmailRequest)
router.post('/account/validateToken', validateToken)
router.post('/account/resetPassword', resetPassword)
router.put('/account/changePassword', changePassword)
router.put('/profile/:userId', updateUserProfile)

router.post(
  '/google-authenticate',
  passport.authenticate('google-id-token'),
  authenticate
)

router.post('/cart/:userId', addProductToCart)
router.get('/cart', getProductInCart)
router.patch('/cart/:productId', decreaseProductQuantity)

export default router
