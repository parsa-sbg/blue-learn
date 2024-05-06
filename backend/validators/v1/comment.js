const yup = require("yup");

const createCommentValidator = yup.object().shape({
  body: yup.string().required("متن نظر الزامی است"),
  courseShortName: yup.string().required("نام کوتاه دوره الزامی است"),
  score: yup
    .number()
    .integer()
    .min(1, "حداقل امتیاز 1 است")
    .max(5, "حداکثر امتیاز 5 است")
    .required("امتیاز الزامی است"),
});

const answerCommentValidator = yup.object().shape({
  body: yup.string().required("متن پاسخ الزامی است"),
});

const commentIdValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه نظر الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه نظر معتبر نیست"),
});

module.exports = {
  createCommentValidator,
  answerCommentValidator,
  commentIdValidator,
};
