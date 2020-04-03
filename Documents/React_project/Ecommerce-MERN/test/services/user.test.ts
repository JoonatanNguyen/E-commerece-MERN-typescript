import User, { UserDocument } from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const nonExistingUserId = '5e57b77b5744fa0b461c9956'

async function createUser() {
  let user = new User({
    username: 'ChicKadoo',
    firstname: 'Chic',
    lastname: 'Kadoo',
    email: 'chickadoo@gmail.com',
    password: 'ChicKadoo123',
  })
  // let salt = crypto.randomBytes(6)
  user.password = await bcrypt.hash(user.password, 10)

  return await UserService.signup(user)
}
async function createUser2() {
  let user = new User({
    username: 'ChicKudaa',
    firstname: 'Chic',
    lastname: 'Kudaa',
    email: 'chickudaa@gmail.com',
    password: 'ChicKudaa123',
  })
  // let salt = crypto.randomBytes(6)
  user.password = await bcrypt.hash(user.password, 10)

  return await UserService.signup(user)
}

describe('user service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should sign new user up', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('username', 'ChicKadoo')
    expect(user).toHaveProperty('firstname', 'Chic')
    expect(user).toHaveProperty('lastname', 'Kadoo')
    expect(user).toHaveProperty('email', 'chickadoo@gmail.com')
    expect(user?.password.length).toBeGreaterThanOrEqual(10)
  })

  it('should not create user with existing account', async () => {
    expect.assertions(1)
    await createUser()
    const user2 = new User({
      username: 'ChicKadoo',
      firstname: 'Chic',
      lastname: 'Kadoo',
      email: 'chickadoo@gmail.com',
      password: 'ChicKadoo123',
    })

    return UserService.signup(user2).catch(e => {
      expect(e.message).toMatch('Existing account')
    })
  })

  it('should update an existing user profile', async () => {
    const user = await createUser()
    const update = {
      username: 'ChicKidoo',
      lastname: 'Kidoo',
      email: 'chickidoo@gmail.com',
    }

    const updated = await UserService.update(user?._id, update)
    expect(updated).toHaveProperty('_id', user?._id)
    expect(updated).toHaveProperty('username', 'ChicKidoo')
    expect(updated).toHaveProperty('lastname', 'Kidoo')
    expect(updated).toHaveProperty('email', 'chickidoo@gmail.com')
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      firstname: 'Chic',
    }

    return UserService.update(nonExistingUserId, update).catch(e => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should sign user in', async () => {
    await createUser()
    const email = 'chickadoo@gmail.com'
    const password = 'ChicKadoo123'

    const signedIn = await UserService.signin(email, password)
    expect(signedIn).toHaveProperty('_id')
    expect(signedIn).toHaveProperty('email', email)
  })

  it('should not sign user in with wrong email/password', async () => {
    expect.assertions(1)
    await createUser()

    const email = 'chickadoo@gmail.com'
    const password = 'ChicKadoo23'
    return UserService.signin(email, password).catch(e => {
      expect(e.message).toMatch('ValidationError')
    })
  })

  it('should get all users', async () => {
    const user1 = await createUser()
    const user2 = await createUser2()

    const allUser = await UserService.findAll()
    expect(allUser).toHaveLength(2)
    expect(allUser[0]._id).toEqual(user1?._id)
    expect(allUser[1]._id).toEqual(user2?._id)
  })

  it('should change user password', async () => {
    await createUser()
    const username = 'ChicKadoo'
    const oldPassword = 'ChicKadoo123'
    const newPassword = 'ChicKadoo456'
    const userChangedPassword = await UserService.changePassword(
      username,
      oldPassword,
      newPassword
    )

    expect(userChangedPassword).toHaveProperty('_id')
    expect(userChangedPassword).toHaveProperty('username', 'ChicKadoo')
  })

  it('should not change user password with wrong username', async () => {
    expect.assertions(1)
    await createUser()

    const username = 'ChicKaduu'
    const wrongOldPassword = 'ChicKudaa123'
    const newPassword = 'ChicKudaa123'
    return UserService.changePassword(
      username,
      wrongOldPassword,
      newPassword
    ).catch(e => {
      expect(e.message).toMatch('User not found')
    })
  })

  it('should not change user password with wrong old password', async () => {
    expect.assertions(1)
    await createUser()

    const username = 'ChicKadoo'
    const wrongOldPassword = 'ChicKudaa123'
    const newPassword = 'ChicKudaa123'
    return UserService.changePassword(
      username,
      wrongOldPassword,
      newPassword
    ).catch(e => {
      expect(e.message).toMatch('Not match old password')
    })
  })

  it('should reset user password', async () => {
    const user = await createUser()

    const userId = user?._id
    const userNewPassword = 'ChicKudaa456'

    const userPasswordReset = await UserService.resetPassword(
      userId,
      userNewPassword
    )
    expect(userPasswordReset).toHaveProperty('_id', userId)
    expect(userPasswordReset).toHaveProperty('email', 'chickadoo@gmail.com')
  })

  it('should not reset password for a non-exisitng user', async () => {
    expect.assertions(1)
    await createUser()
    const userNewPassword = 'ChicKudaa456'

    return UserService.resetPassword(nonExistingUserId, userNewPassword).catch(
      e => {
        expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
      }
    )
  })

  it('should add product to cart', async () => {
    const user = await createUser()

    const addedProductToCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 1,
    }

    const addProductToCart = await UserService.addProductToCart(
      user?._id,
      addedProductToCart
    )

    expect(addProductToCart.shoppingCart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: expect.objectContaining({
            productId: '5e60a698e5ea4f06b3202b1d',
            variantId: '5e60a698e5ea4f06b3202b1e',
          }),
        }),
      ])
    )

    expect(addProductToCart.shoppingCart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          quantity: 1,
        }),
      ])
    )
  })

  it('should not add product to cart with wrong userId', async () => {
    expect.assertions(1)

    const addedProductToCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 1,
    }
    return UserService.addProductToCart(
      nonExistingUserId,
      addedProductToCart
    ).catch(e => {
      expect(e.message).toMatch('User not found')
    })
  })

  it('should decrease product in cart', async () => {
    const user = await createUser()
    const addedProductToCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 1,
    }

    await UserService.addProductToCart(user?._id, addedProductToCart)

    const decreaseProduct = await UserService.decreaseProductQuantity(
      user?.email,
      '5e60a698e5ea4f06b3202b1d'
    )

    expect(decreaseProduct.shoppingCart).toEqual(
      expect.not.arrayContaining([addedProductToCart])
    )
  })

  it('should not decrease non-existing product in cart', async () => {
    expect.assertions(1)

    const user = await createUser()
    const addedProductToCart = {
      product: {
        productId: '5e60a698e5ea4f06b3202b1d',
        variantId: '5e60a698e5ea4f06b3202b1e',
        size: 'M',
      },
      quantity: 1,
    }

    const userEmail = user?.email
    await UserService.addProductToCart(user?._id, addedProductToCart)

    const productId = '5e60a698e5ea4f06b3202b13'
    return UserService.decreaseProductQuantity(userEmail, productId).catch(
      (e: any) => {
        expect(e.message).toMatch(`Product ${productId} not found`)
      }
    )
  })
})
