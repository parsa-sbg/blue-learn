const yup = require("yup");

const createOffValidator = yup.object().shape({
  code: yup.string().required("کد تخفیف الزامی است"),
  percent: yup.number().required("درصد تخفیف الزامی است").min(0,"درصد تخفیف نمیتواند منفی باشد").max(100,"درصد تخفیف نمیتواند بیشتر از 100 باشد"),
  course: yup.string().required("شناسه دوره الزامی است"),
  max: yup.number().required("تعداد کاربران الزامی است").min(1),
});

const getOneOffValidator = yup.object().shape({
  code: yup.string().required("کد تخفیف الزامی است"),
  course: yup.string().required("شناسه دوره الزامی است"),
});

const removeOffValidator = yup.object().shape({
  id: yup.string().required("شناسه تخفیف الزامی است"),
});

const setDiscountOnAllValidator = yup.object().shape({
  discount: yup.number().required("تخفیف الزامی است").min(0).max(100),
});

module.exports = {
  getOneOffValidator,
  createOffValidator,
  removeOffValidator,
  setDiscountOnAllValidator,
};
