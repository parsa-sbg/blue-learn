const categoryModel = require("../../models/category");

exports.create = async (req, res, next) => {
  try {
    const { title, name } = req.body;

    await categoryModel.validation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const newCategory = await categoryModel.create({ title, name });

    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allCategories = await categoryModel.find();
    if (allCategories.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no categories available" });
    }
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deletedCategory = await categoryModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category Not Found!" });
    }
    return res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await categoryModel.validation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
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
