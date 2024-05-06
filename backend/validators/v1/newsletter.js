const yup = require("yup");

const createNewsletterValidator = yup.object().shape({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

module.exports = {
  createNewsletterValidator,
};
