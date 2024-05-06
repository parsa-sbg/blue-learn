const yup = require("yup");

const createTicketValidator = yup.object().shape({
  departmentID: yup.string().required("شناسه دپارتمان الزامی است"),
  departmentSubID: yup.string().required("شناسه زیردپارتمان الزامی است"),
  title: yup.string().required("عنوان الزامی است"),
  body: yup.string().required("متن الزامی است"),
  priority: yup.number().required("اولویت الزامی است"),
  course: yup.string().notRequired(),
});

const getAnswerValidator = yup.object().shape({
  id: yup.string().required("شناسه تیکت الزامی است"),
});

const setAnswerValidator = yup.object().shape({
  body: yup.string().required("متن جواب الزامی است"),
  ticketID: yup.string().required("شناسه تیکت الزامی است"),
});

const departmentsSubsValidator = yup.object().shape({
  id: yup.string().required("شناسه دپارتمان الزامی است"),
});

module.exports = {
  createTicketValidator,
  getAnswerValidator,
  setAnswerValidator,
  departmentsSubsValidator,
};
