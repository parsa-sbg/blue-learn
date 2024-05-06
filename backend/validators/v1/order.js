const yup = require("yup");

const getOneValidator = yup.object().shape({
  id: yup
    .string()
    .required("آیدی سفارش الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "آیدی سفارش معتبر نیست"),
});

module.exports = {
  getOneValidator,
};
