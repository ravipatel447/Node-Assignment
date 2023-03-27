const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
const validatePassword = (password) => {
  const errors = []
  if (password.length < 7) {
    errors.push('Your password must be at least 7 characters')
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.')
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.')
  }
  if (errors.length > 0) {
    return { error: true, message: errors.join('\n') }
  }
  return { error: false }
}

const loginValidation = ({ email, password }) => {
  if (!validateEmail(email)) {
    return { error: true, message: 'Please enter Valid Email' }
  }
  return { error: false, data: { email: email.trim(), password } }
}

const registerValidation = ({ name, email, password }) => {
  if (name.trim().length <= 2) {
    return { error: true, message: 'Enter Name Properly' }
  } else if (!validateEmail(email)) {
    return { error: true, message: 'Please enter Valid Email' }
  } else if (validatePassword(password).error) {
    return { error: true, message: validatePassword(password).message }
  } else {
    return {
      error: false,
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        profile: '',
        role: 'user'
      }
    }
  }
}

module.exports = {
  loginValidation,
  registerValidation
}
