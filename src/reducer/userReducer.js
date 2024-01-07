

const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, currentUser: action.payload }
    }

    case "LOGOUT": {
      return { ...state, currentUser: {} }
    }
    default: {
      return { ...state }
    }
  }

}


export default userReducer