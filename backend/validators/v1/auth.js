const yup = require("yup");

//* Register Schema
const registerValidator = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی می‌باشد"),
  email: yup
    .string()
    .email("آدرس ایمیل نامعتبر است")
    .required("آدرس ایمیل الزامی می‌باشد"),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .required("رمز عبور الزامی می‌باشد"),
  confirmPassword: yup
    .string()
    .required("تکرار کلمه عبور الزامی می باشد")
    .oneOf([yup.ref("password"), null], "کلمه ی عبور و تکرار آن یکسان نیستند"),
  name: yup
    .string()
    .required("نام و نام خانوادگی الزامی می‌باشد")
    .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
    .max(40, "نام و نام خانوادگی نباید بیشتر از 40 کاراکتر باشد"),
  phone: yup.string().required("شماره تلفن همراه الزامی می‌باشد"),
});

//* Login Schema
const loginValidator = yup.object().shape({
  identifier: yup.string().required(" شناسه کاربری یا ایمیل الزامی است"),
  password: yup.string().required(" کلمه عبور الزامی است"),
});

module.exports = {
  registerValidator,
  loginValidator,
};
