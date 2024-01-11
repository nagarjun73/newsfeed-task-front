import axios from "../config/axiosConfig"

const getCategoryData = async (userDispatch) => {
  const getCategory = await axios.get('http://localhost:3073/categories/all', {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  userDispatch({ type: "GET_CATEGORY", payload: getCategory.data })
}

export default getCategoryData