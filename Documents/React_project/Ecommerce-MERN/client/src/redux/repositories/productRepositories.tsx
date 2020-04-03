import axios from 'axios'

const token = localStorage.getItem('id_token')
const config = {
  headers: { Authorization: `Bearer ${token}` },
}
const base = 'http://localhost:3000/api/v1'

type AddedProduct = {
  productId: string
  variantId: string | undefined
}

export default {
  async addProductToCart(userId: string | null, addedProduct: AddedProduct) {
    return await axios.post(
      `${base}/users/cart/${userId}`,
      addedProduct,
      config
    )
  },

  async getCartProduct() {
    return await axios
      .get(`${base}/users/cart`, config)
      .then(res => res)
      .catch(error => error.response.data)
  },

  async decreaseCartQuantity(productId: string) {
    return await axios
      .patch(`${base}/users/cart/${productId}`, '', config)
      .then(res => res)
  },
}
