const fs = require("fs");
const path = require("path");

const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const commentModel = require("../../models/comment");
const categoryModel = require("../../models/category");
const courseUserModel = require("../../models/course-user");

exports.create = async (req, res, next) => {
  try {
    const cover = req.file;
    await courseModel.createValidation({ ...req.body, cover }).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const {
      name,
      description,
      shortName,
      categoryID,
      price,
      support,
      status,
      discount,
    } = req.body;

    const course = await courseModel.create({
      name,
      description,
      shortName,
      creator: req.user._id,
      categoryID,
      price,
      isComplete: 0,
      status,
      support,
      cover: req.file.filename,
      discount: Boolean(discount) === true ? discount : 0,
    });

    const populatedCourse = await courseModel
      .findById(course._id)
      .populate("creator", "-password");

    return res.status(201).json(populatedCourse);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, title: req.body.title },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category Not Found!" });
    }
    return res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const cover = req.file;
    await courseModel.updateValidation({ ...req.body, cover }).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const {
      name,
      description,
      shortName,
      categoryID,
      price,
      support,
      status,
      discount,
      isComplete,
    } = req.body;

    const oldCourse = await courseModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        description,
        shortName,
        creator: req.user._id,
        categoryID,
        price,
        isComplete,
        support,
        status,
        cover:
          Boolean(req.file?.filename) === true ? req.file.filename : undefined,
        discount: Boolean(discount) === true ? discount : 0,
      }
    );
    if (!oldCourse) {
      return res.status(404).json({ message: "Course Not Update!" });
    }
    const newCourse = await courseModel
      .findById(oldCourse._id)
      .populate("creator", "-password");

    if (oldCourse.cover !== newCourse.cover) {
      const imgPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "courses",
        "covers",
        oldCourse.cover
      );

      fs.unlink(imgPath, async (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.status(200).json(newCourse);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const courses = await courseModel
      .find()
      .populate("creator", "-password")
      .populate("categoryID")
      .lean()
      .sort({ _id: -1 });

    if (!courses) {
      return res.status(404).json({ message: "No Course Available!" });
    }

    const registers = await courseUserModel.find({}).lean();
    const comments = await commentModel.find().lean();

    let allCourses = [];
    courses.forEach((course) => {
      let courseTotalScore = 5;
      let courseRegisters = registers.filter(
        (register) => register.course.toString() === course._id.toString()
      );

      let courseScores = comments.filter(
        (comment) => comment.course.toString() === course._id.toString()
      );

      courseScores.forEach((comment) => {
        courseTotalScore += Number(comment.score);
      });

      allCourses.push({
        ...course,
        categoryID: course.categoryID,
        creator: course.creator.name,
        registers: courseRegisters.length,
        courseAverageScore: Math.floor(
          courseTotalScore / (courseScores.length + 1)
        ),
      });
    });

    return res.json(allCourses);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    await courseModel.getOneValidation(req).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const course = await courseModel
      .findOne({ shortName: req.params.shortName })
      .populate("categoryID", "-password")
      .populate("creator", "-password")
      .lean();
    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    const sessions = await sessionModel.find({ course: course._id }).lean();
    const comments = await commentModel
      .find({ course: course._id, answer: 1 })
      .populate("creator", "-password")
      .lean();

    const courseStudentsCount = await courseUserModel
      .find({
        course: course._id,
      })
      .count();

    let isUserRegisteredToThisCourse = null;
    if (req.user) {
      isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
        user: req.user._id,
        course: course._id,
      }));
    } else {
      isUserRegisteredToThisCourse = false;
    }

    let allComments = [];

    comments.forEach((comment) => {
      let mainCommentAnswerInfo = null;
      comments.forEach((answerComment) => {
        if (String(comment._id) == String(answerComment.mainCommendID)) {
          mainCommentAnswerInfo = { ...answerComment };
        }
      });
      if (!comment.mainCommendID) {
        allComments.push({
          ...comment,
          course: comment.course.name,
          answerContent: mainCommentAnswerInfo,
        });
      }
    });

    return res.json({
      ...course,
      courseStudentsCount,
      sessions,
      comments: allComments,
      isUserRegisteredToThisCourse,
    });
  } catch (error) {
    next(error);
  }
};

exports.createSession = async (req, res, next) => {
  try {
    const { title, time, free } = req.body;
    const { id } = req.params;
    const video = req.file;
    await courseModel
      .createSessionValidation({
        title,
        time,
        free,
        id,
        video,
      })
      .catch((err) => {
        err.statusCode = 400;
        throw err;
      });

    const session = await sessionModel.create({
      title,
      time,
      free,
      course: id,
      video: req.file.filename,
    });

    return res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
    const allSessions = await sessionModel
      .find()
      .populate("course", "name")
      .lean();

    if (!allSessions) {
      return res.status(404).json({ message: "No Session Available!" });
    }
    res.json(allSessions);
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    await courseModel.registerValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const isUserAlreadyRegistered = await courseUserModel
      .findOne({ user: req.user._id, course: req.params.id })
      .lean();

    if (isUserAlreadyRegistered) {
      return res
        .status(409)
        .json({ message: "you are already registered to this course." });
    }

    await courseUserModel.create({
      user: req.user._id,
      course: req.params.id,
      price: req.body.price,
    });

    return res
      .status(201)
      .json({ message: "you are registered successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryCourses = async (req, res, next) => {
  try {
    await courseModel.getCategoryCoursesValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { categoryName } = req.params;
    const category = await categoryModel.find({ name: categoryName });
    if (category.length) {
      const categoryCourses = await courseModel
        .find({
          categoryID: category[0]._id,
        })
        .populate("creator")
        .lean();

      const registers = await courseUserModel.find({}).lean();
      const comments = await commentModel.find().lean();

      let allCourses = [];
      categoryCourses.forEach((course) => {
        let courseTotalScore = 5;
        let courseRegisters = registers.filter(
          (register) => register.course.toString() === course._id.toString()
        );

        let courseScores = comments.filter(
          (comment) => comment.course.toString() === course._id.toString()
        );

        courseScores.forEach((comment) => {
          courseTotalScore += Number(comment.score);
        });
        allCourses.push({
          ...course,
          categoryID: course.categoryID.title,
          creator: course.creator.name,
          registers: courseRegisters.length,
          courseAverageScore: Math.floor(
            courseTotalScore / (courseScores.length + 1)
          ),
        });
      });
      res.json(allCourses);
    } else {
      res.json([]);
    }
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await courseModel.removeCourseValidation(req).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const deletedCourse = await courseModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    const deletedComments = await commentModel.deleteMany({
      course: deletedCourse._id,
    });
    console.log(deletedComments);

    return res.json(deletedCourse);
  } catch (error) {
    next(error);
  }
};

exports.removeSession = async (req, res, next) => {
  try {
    await courseModel.removeSessionValidation(req).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const deletedSession = await sessionModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedSession) {
      return res.status(404).json({ message: "Session Not Found!" });
    }

    const videoPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "courses",
      "covers",
      deletedSession.video
    );
    fs.unlink(videoPath, async (err) => {
      if (err) {
        console.log(err);
      }
    });

    return res.json(deletedSession);
  } catch (error) {
    next(error);
  }
};

exports.getSessionInfo = async (req, res, next) => {
  try {
    await courseModel.getSessionInfoValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const course = await courseModel
      .findOne({ shortName: req.params.shortName })
      .lean();

    const session = await sessionModel.findOne({
      course: course._id,
      _id: req.params.sessionID,
    });

    const sessions = await sessionModel.find({ course: course._id });

    res.json({ sessions, session });
  } catch (error) {
    next(error);
  }
};

exports.getRelated = async (req, res, next) => {
  try {
    await courseModel.getRelatedValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { shortName } = req.params;
    const course = await courseModel.findOne({ shortName });
    let relatedCourses = await courseModel.find({
      categoryID: course.categoryID,
    });

    relatedCourses = relatedCourses.filter(
      (course) => course.shortName !== shortName
    );

    res.json(relatedCourses.splice(0, 4));
  } catch (error) {
    next(error);
  }
};
