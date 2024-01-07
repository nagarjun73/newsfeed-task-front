import axios from "../config/axiosConfig"



const getUserData = async (userDispatch) => {
  const getAccount = await axios.get('http://localhost:3073/users/account', {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  userDispatch({ type: "USER_LOGIN", payload: getAccount.data })
}

export default getUserData
