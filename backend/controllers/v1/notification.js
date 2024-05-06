const notificationModel = require("../../models/notification");

exports.see = async (req, res, next) => {
  try {
    await notificationModel.seeValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const updateNotification = await notificationModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        see: 1,
      },
      { new: true }
    );
    if (!updateNotification) {
      return res.status(404).json({ message: "Notification Not Found!" });
    }
    return res.json(updateNotification);
  } catch (error) {
    next(error);
  }
};
