import mongoose, { Document } from 'mongoose'

type PasswordTokenType = {
  token: string;
  timeStamps: number;
  timeOfCreated: number;
}

export type ShoppingCartType = {
  productId: string;
  variantId: string;
  quantity: number;
}

export type UserDocument = Document & {
  username: string;
  sessionId: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  passwordToken: PasswordTokenType;
  shoppingCart: ShoppingCartType[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  sessionId: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passwordToken: {
    token: String,
    timeStamps: Number,
    timeOfCreated: Number,
  },
  shoppingCart: [
    {
      productId: String,
      variantId: String,
      quantity: Number,
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document: Document, returnedObject: UserDocument) => {
    delete returnedObject.password
    delete returnedObject.passwordToken
    delete returnedObject.firstname
    delete returnedObject.lastname
    delete returnedObject.__v
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
