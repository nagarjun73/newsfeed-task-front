const runValidaion = (formData) => {
  const errors = {}
  if (formData.name) {
    if (formData.name.trim().length === 0) {
      errors.name = "name should not be Empty."
    }
  }

  if (formData.email.trim().length === 0) {
    errors.email = "email should not be Empty."
  } else if (
    formData.email.indexOf("@") === -1
    || formData.email.indexOf(".") === -1
    || formData.email.indexOf(" ") !== -1
  ) {
    errors.email = "Invalid Email."
  }

  if (formData.password.trim().length === 0) {
    errors.password = "password should not be Empty"
  }
  return errors
}

export default runValidaion
