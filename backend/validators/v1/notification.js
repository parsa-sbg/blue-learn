const yup = require("yup");

const seeNotificationValidator = yup.object().shape({
  id: yup
    .string()
    .required("شناسه اعلان الزامی است")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه اعلان معتبر نیست"),
});

module.exports = {
  seeNotificationValidator,
};
