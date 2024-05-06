const yup = require("yup");

const searchValidator = yup.object().shape({
  value: yup.string().required("مقدار جستجو الزامی است"),
});

module.exports = {
  searchValidator,
};
