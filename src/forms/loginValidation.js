import {createValidator, required} from 'redux/utils/validation'

const surveyValidation = createValidator({
  username: required,
  password: required
})

export default surveyValidation
