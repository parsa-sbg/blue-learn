const yup = require("yup");

const categoryValidator = yup.object().shape({
  title: yup.string().required(),
  name: yup.string().required(),
});

module.exports = categoryValidator;
