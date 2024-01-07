

const logoutButtonHandle = (userDispatch) => {
  userDispatch({ type: "LOGOUT" })
  localStorage.removeItem('token')
  localStorage.removeItem('selectedOption')
}

export default logoutButtonHandle