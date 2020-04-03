import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodeMailer from 'nodemailer'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

//POST /users/account/signup
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, firstname, lastname, email } = req.body
    const BCRYPT_SALT_ROUNDS = 12
    const password = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)

    const user = new User({
      username,
      password,
      firstname,
      lastname,
      email,
    })

    await UserService.signup(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error.message === 'Existing account') {
      res.status(201)
      res.json({
        message: 'Email you use is already exist',
      })
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// POST /user/account/signin
export const signinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    await UserService.signin(email, password)
    res.json({
      success: true,
      message: 'User logged in',
    })
  } catch (error) {
    if (error.message === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//PUT /users/profile/:userId
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId

    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

//POST /users/account/emailRequest
export const sendEmailRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestToken = await crypto.randomBytes(32).toString('hex')
    await UserService.sendEmailRequest(req.body.email, requestToken)

    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'minhng1811@gmail.com',
        clientId:
          '1078333593786-b6btm82b28topincgmqncaum8ojuu97d.apps.googleusercontent.com',
        clientSecret: 'b8Ij8Q0-z26Bj4_E1xOqYQOi',
        refreshToken:
          '1//04amiayhPWh8DCgYIARAAGAQSNwF-L9Iro_XsSCqLY1W8EUgbinzDYCFrk4C5iUwUAU-y6awjqwun3ui5SQcGmesUKNYRVAmIv7Q',
      },
    })

    const mailOptions = {
      from: 'minhng1811@gmail.com',
      to: req.body.email,
      subject: 'Reset user password',
      text: `Thank you for using our service. Click the link to reset the password ${`http://localhost:3000/api/v1/users/account/emailRequest?token=${requestToken}`}`,
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        res.json({
          message: `Email sent ${info.response}`,
        })
      }
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else if (error.name === 'Not exisiting email') {
      next(new NotFoundError('Email not found', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// POST /users/account/validateToken
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.validateToken(req.query.token)
    res.json({
      statusCode: 200,
      message: 'Correct token',
    })
  } catch (error) {
    if (error.message === 'Invalid token') {
      next(new NotFoundError('Token not found', error))
    } else if (error.name === 'Token is expired') {
      next(new BadRequestError('Invalid token', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//POST /users/account/resetPassword
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers['authorization'] || ''
    const token = authorization.split('Bearer ')[1]
    const tokenDecoded: any = jwt.decode(token, { complete: true })

    const password = req.body.password
    await UserService.resetPassword(tokenDecoded.payload.id, password)
    res.json({
      statusCode: 200,
      message: 'Password reset',
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /users/account/changePassword
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, oldPassword, newPassword } = req.body
    await UserService.changePassword(username, oldPassword, newPassword)
    res.json({
      statusCode: 200,
      message: 'Password changed',
    })
  } catch (error) {
    if (error.message === 'User not found') {
      next(new NotFoundError('User not found', error))
    } else if (error.message === 'Not match old password') {
      next(new BadRequestError('Not match old password', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// POST /users/google-authenticate
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, id, username, isAdmin } = req.user as any
    const token = await jwt.sign(
      {
        username,
        email,
        id,
        isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: '2h',
      }
    )
    res.json({ token, id, email, username, isAdmin })
  } catch (error) {
    return next(new InternalServerError())
  }
}

// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}

//POST /users/cart/:userId
export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers['authorization'] || ''
    const token = authorization.split('Bearer ')[1]
    const tokenDecoded: any = jwt.decode(token, { complete: true })

    await UserService.addProductToCart(tokenDecoded.payload.id, req.body)
    res.json({
      statusCode: 200,
      message: 'Product added',
    })
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

//GET /users/cart
export const getProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers['authorization'] || ''
    const token = authorization.split('Bearer ')[1]
    const tokenDecoded: any = jwt.decode(token, { complete: true })

    res.json(await UserService.getProductInCart(tokenDecoded.payload.id))
  } catch (error) {
    next(new NotFoundError('No product in cart', error))
  }
}

//PATCH /users/cart/:productId
export const decreaseProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers['authorization'] || ''
    const token = authorization.split('Bearer ')[1]
    const tokenDecoded: any = jwt.decode(token, { complete: true })

    await UserService.decreaseProductQuantity(
      tokenDecoded.payload.email,
      req.params.productId
    )
    res.json({
      success: true,
      message: 'product decreased',
    })
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}
