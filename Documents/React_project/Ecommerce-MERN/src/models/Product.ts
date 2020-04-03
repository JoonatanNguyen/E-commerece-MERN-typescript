import mongoose, { Document } from 'mongoose'

type Variant = {
  color: string;
  image: string[];
  _id: string;
  colorSpecific: string;
}

export type ProductDocument = Document & {
  name: string;
  shortDescription: string;
  longDescription: string;
  categories: string[];
  variants: Variant[];
  price: number;
  medias: string[];
}

const VariantSchema = new mongoose.Schema({
  color: String,
  image: [String],
  colorSpecific: String,
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  categories: {
    type: [String],
    required: true,
    index: true,
  },
  variants: {
    type: [VariantSchema],
    required: true,
    index: true,
  },
  price: Number,
  medias: [String],
})

export default mongoose.model<ProductDocument>('Product', productSchema)
