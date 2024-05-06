const yup = require("yup");

const createContactValidator = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  email: yup.string().email().required("ایمیل الزامی است"),
  phone: yup
    .string()
    .matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامی است"),
  body: yup.string().required("متن پیام الزامی است"),
});

const answerValidator = yup.object().shape({
  email: yup.string().email().required("آدرس ایمیل الزامی است"),
  answer: yup.string().required("متن پاسخ الزامی است"),
});

const removeValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه تماس الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه معتبر نیست"),
});

module.exports = {
  createContactValidator,
  answerValidator,
  removeValidator,
};
