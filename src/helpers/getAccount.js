import axios from "axios"

const getAccount = async () => {
  const result = await axios.get('http://localhost:3073/users/account', {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return result.data
}

export default getAccount