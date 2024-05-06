const yup = require("yup");

const removeUserValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
});

const banUserValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
});

const editUserValidator = yup.object().shape({
  username: yup.string(),
  email: yup.string().email("آدرس ایمیل نامعتبر است"),
  password: yup.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  name: yup
    .string()
    .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
    .max(40, "نام و نام خانوادگی نباید بیشتر از 40 کاراکتر باشد"),
  phone: yup.string(),
  role: yup
  .string()
  .oneOf(["ADMIN", "USER"], "نقش کاربر باید یکی از مقادیر ADMIN و USER باشد"),
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
});

const updateUserValidator = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  username: yup.string().required("نام کاربری الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  phone: yup
    .string()
    .required("شماره تلفن همراه الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره تلفن همراه معتبر نیست"),
});


const changeUserRoleValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه کاربر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
  role: yup
    .string()
    .oneOf(["ADMIN", "USER"], "نقش کاربر باید یکی از مقادیر ADMIN و USER باشد")
    .required("نقش کاربر الزامی است"),
});

module.exports = {
  removeUserValidator,
  banUserValidator,
  editUserValidator,
  updateUserValidator,
  changeUserRoleValidator,
};
