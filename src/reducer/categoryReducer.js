

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORY": {
      return { ...state, categories: action.payload }
    }

    case "ADD_CATEGORY": {
      console.log(action.payload);
      return { ...state, categories: [...state.categories, action.payload] }
    }

    case "EDIT_CATEGORY": {
      return {
        ...state, categories: state.categories.map((ele) => {
          if (ele._id === action.payload._id) {
            return action.payload
          } else {
            return ele
          }
        })
      }
    }

    case "DELETE_CATEGORY": {
      return { ...state, categories: state.categories.filter((ele) => ele._id !== action.payload._id) }
    }
    default: {
      return { ...state }
    }
  }
}


export default categoryReducer