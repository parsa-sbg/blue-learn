const coursesModel = require("./../../models/course");
const articlesModel = require("./../../models/article");
const { searchValidator } = require("../../validators/v1/search");

// exports.get = async (req, res, next) => {
//   try {
//     const { value } = await searchValidator.validate(req.params);
//     console.log(value);
//     const allResultCourses = await coursesModel.find({
//       name: { $regex: ".*" + value + ".*" },
//     });
//     const allResultArticles = await articlesModel.find({
//       title: { $regex: ".*" + value + ".*" },
//     });

//     res.json({ allResultCourses, allResultArticles });
//   } catch (error) {
//     next(error);
//   }
// };

exports.get = async (req, res, next) => {
  try {
    const { value } = await searchValidator.validate(req.params);
    const regex = new RegExp(value, "i");

    const allResultCourses = await coursesModel.find({
      name: regex,
    });
    const allResultArticles = await articlesModel.find({
      title: regex,
    });

    res.json({ allResultCourses, allResultArticles });
  } catch (error) {
    next(error);
  }
};
