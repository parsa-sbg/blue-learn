const yup = require("yup");

const createMenuValidator = yup.object().shape({
  title: yup.string().required("عنوان منو الزامی است"),
  href: yup.string().required("لینک منو الزامی است"),
  parent: yup
    .string()
    .nullable()
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه والد معتبر نیست"),
});

const removeMenuValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه منو الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه معتبر نیست"),
});

module.exports = {
  createMenuValidator,
  removeMenuValidator,
};
