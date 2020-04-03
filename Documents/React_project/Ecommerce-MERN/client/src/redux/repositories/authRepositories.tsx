import axios from 'axios'

const token = localStorage.getItem('id_token')
const config = {
  headers: { Authorization: `Bearer ${token}` },
}
const base = 'http://localhost:3000/api/v1'

export default {
  async googleLogin(tokenId: any) {
    return await axios.post(
      `${base}/users/google-authenticate`,
      tokenId,
      config
    )
  },
}
