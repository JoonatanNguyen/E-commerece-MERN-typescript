import User, { UserDocument, ShoppingCartType } from '../models/User'
import bcrypt from 'bcrypt'

function signup(user: UserDocument): Promise<UserDocument | null | undefined> {
  return User.findOne({ email: user.email })
    .exec()
    .then(foundUser => {
      if (!foundUser) {
        return user.save()
      } else {
        throw new Error('Existing account')
      }
    })
}

function signin(
  email: string,
  password: string
): Promise<UserDocument | null | undefined> {
  return User.findOne({ email: email })
    .exec()
    .then(async user => {
      if (!user) {
        throw new Error('User not found')
      }

      const comparePassword = await bcrypt.compare(password, user.password)
      if (!comparePassword) {
        throw new Error('ValidationError')
      }
      return user
    })
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }

      if (update.username) {
        user.username = update.username
      }
      if (update.firstname) {
        user.firstname = update.firstname
      }
      if (update.lastname) {
        user.lastname = update.lastname
      }
      if (update.email) {
        user.email = update.email
      }

      return user.save()
    })
}

function sendEmailRequest(email: string, token: string): Promise<UserDocument> {
  return User.findOne({ email: email })
    .exec()
    .then(user => {
      if (!user) {
        throw new Error('Not exisiting email')
      }

      user.passwordToken = {
        token: token,
        timeStamps: 300000,
        timeOfCreated: Date.now(),
      }

      return user.save()
    })
}

function validateToken(token: string): Promise<UserDocument> {
  return User.findOne({ 'passwordToken.token': token })
    .exec()
    .then(token => {
      if (!token) {
        throw new Error('Invalid token')
      }
      const tokenValidationTime =
        token.passwordToken.timeOfCreated + token.passwordToken.timeStamps
      const currentTime = Date.now()
      if (currentTime > tokenValidationTime) {
        throw new Error('Token is expired')
      } else {
        token.set('passwordToken', null)
      }

      return token.save()
    })
}

function resetPassword(
  userId: string,
  password: string
): Promise<UserDocument> {
  return User.findOne({ _id: userId })
    .exec()
    .then(async user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      if (password) {
        user.password = await bcrypt.hash(password, 12)
      }

      return user.save()
    })
}

function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<UserDocument> {
  return User.findOne({ username: username })
    .exec()
    .then(async user => {
      if (!user) {
        throw new Error('User not found')
      }
      const comparedPassword = await bcrypt.compare(oldPassword, user.password)

      if (!comparedPassword) {
        throw new Error('Not match old password')
      } else {
        user.password = await bcrypt.hash(newPassword, 12)
      }
      return user.save()
    })
}

function findAll(): Promise<UserDocument[]> {
  return User.find()
    .sort({ name: 1 })
    .exec()
}

function addProductToCart(
  userId: string,
  addedProduct: ShoppingCartType
): Promise<UserDocument> {
  return User.findOne({ _id: userId })
    .exec()
    .then(user => {
      if (!user) {
        throw new Error('User not found')
      }

      const existingProduct = user.shoppingCart.find(
        item => item.productId === addedProduct.productId
      )

      if (existingProduct) {
        existingProduct.quantity++
      } else {
        user.shoppingCart.push({
          quantity: 1,
          ...addedProduct,
        })
      }

      return user.save()
    })
}

function getProductInCart(userId: string): Promise<UserDocument> {
  return User.findOne({ _id: userId })
    .sort({ name: 1 })
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

//increase product quantity

function decreaseProductQuantity(
  email: string | undefined,
  productId: string
): Promise<UserDocument> {
  return User.findOne({ email: email })
    .exec()
    .then(user => {
      if (!user) {
        throw new Error('User not found')
      }
      const existingProduct = user.shoppingCart.find(
        item => item.productId === productId
      )

      const exisingProductIndex = user.shoppingCart.findIndex(
        item => item.productId === productId
      )

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--
        } else {
          user.shoppingCart.splice(exisingProductIndex, 1)
        }
      } else {
        throw new Error(`Product ${productId} not found`)
      }
      return user.save()
    })
}

export default {
  signup,
  signin,
  findAll,
  update,
  sendEmailRequest,
  validateToken,
  resetPassword,
  changePassword,
  addProductToCart,
  getProductInCart,
  decreaseProductQuantity,
}
