const newsletterModel = require("../../models/newsletter");

exports.create = async (req, res, next) => {
  try {
    await newsletterModel.createValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const { email } = req.body;

    const newEmail = await newsletterModel.create({ email });

    return res.status(201).json(newEmail);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allEmails = await newsletterModel.find();
    if (allEmails.length === 0) {
      return res.status(404).json({ message: "No Email Available!" });
    }
    res.json(allEmails);
  } catch (error) {
    next(error);
  }
};
