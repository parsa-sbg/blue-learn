const yup = require("yup");

//* article schema
exports.articleValidator = yup.object().shape({
  title: yup.string().trim().required("عنوان (title) مقاله الزامی می باشد"),
  description: yup
    .string()
    .required("توضیحات (description) مقاله الزامی می باشد"),
  body: yup.string().required("محتوای مقاله (body) الزامی می باشد"),
  shortName: yup
    .string()
    .trim()
    .required("اسم کوتاه (shortName) مقاله الزامی می باشد"),

  cover: yup.object().shape({
    size: yup
      .number()
      .max(30 * 1024 * 1024, "حجم تصویر نباید بیشتر از 30 مگابایت باشد"),
    mimetype: yup
      .string()
      .oneOf(
        ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        "فرمت تصویر باید JPEG یا PNG یا WebP باشد"
      )
      .required("تصویر الزامی می باشد"),
  }),

  categoryID: yup
    .string()
    .required("شناسه دسته بندی مقاله الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه دسته بندی نامعتبر است"),
});
