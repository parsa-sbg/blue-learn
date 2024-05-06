//*getAll
//*getOne

const courseUserModel = require("../../models/course-user");

exports.getAll = async (req, res, next) => {
  try {
    const allOrders = await courseUserModel
      .find({ user: req.user._id })
      .populate("course")
      .lean();

    if (!allOrders) {
      return res.status(404).json({ message: "No Order Available!" });
    }

    res.json(allOrders);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    await courseUserModel.getOneValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const mainOrder = await courseUserModel
      .find({ _id: req.params.id })
      .populate("course")
      .lean();

    if (!mainOrder) {
      return res.status(404).json({ message: "Order Not Found!" });
    }
    res.json(mainOrder);
  } catch (error) {
    next(error);
  }
};
