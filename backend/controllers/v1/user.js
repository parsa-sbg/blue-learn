const userModel = require("../../models/user");
const banUserModel = require("../../models/ban-phone");
const courseUserModel = require("../../models/course-user");
const bcrypt = require("bcrypt");

// exports.create = async (req, res, next) => {
//   const { name, description, shortName, categoryID, price } = req.body;

//   const course = await courseModel.create({
//     name,
//     description,
//     shortName,
//     creator: req.user._id,
//     categoryID,
//     price,
//     isComplete: 0,
//     support: "گروه تلگرامی",
//     cover: "/images/courses/fareelancer.png",
//   });

//   const populatedCourse = await courseModel
//     .findById(course._id)
//     .populate("creator", "-password");

//   return res.status(201).json(populatedCourse);
// };

exports.getAll = async (req, res, next) => {
  try {
    const users = await userModel.find();

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const { name, username, email, password, phone, role } = req.body;
    const { id } = req.params;
    await userModel.editUserValidation({ ...req.body, id }).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const hashedPassword = password
      ? await bcrypt.hash(password, 12)
      : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        role,
      },
      { new: true }
    );

    return res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    await userModel.removeUserValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const deletedUser = await userModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!deletedUser) {
      return res.status(404).json("There is not user");
    }

    return res.status(200).json("User Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    await userModel.removeUserValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
    if (!mainUser) {
      return res.status(404).json("User not Found!");
    }

    const banUserResult = banUserModel.create({ phone: mainUser.phone });

    if (banUserResult) {
      return res.status(200).json({ msg: "User banned successfully" });
    }
    return res.status(500).json({ msg: "Error" });
  } catch (error) {
    next(error);
  }
};

exports.getUserCourses = async (req, res, next) => {
  try {
    const userCourses = await courseUserModel
      .find({ user: req.user._id })
      .populate("course")
      .lean();

    res.json(userCourses);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await userModel.updateUserValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { name, username, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
      }
    );

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    await userModel.changeUserRoleValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { role, id } = req.body;
    console.log(role);

    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        role: role,
      }
    );

    res.json({ msg: `User role changed to ${role} successfully` });
  } catch (error) {
    next(error);
  }
};
