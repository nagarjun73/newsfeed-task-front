import toast from 'react-hot-toast'

const clientErrorHandler = (e) => {
  const serverError = e.response.data.errors
  if (serverError) {
    serverError.forEach((ele) => {
      toast.error(ele.msg);
    })
  } else {
    toast.error(e.message);
  }
}

export default clientErrorHandler