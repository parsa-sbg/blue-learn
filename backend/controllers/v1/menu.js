const menuModel = require("../../models/menu");

exports.getAll = async (req, res, next) => {
  try {
    const menus = await menuModel.find().lean();
    if (menus.length === 0) {
      return res.status(404).json({ message: "No Menus Available!" });
    }

    for (const menu of menus) {
      const submenus = [];
      for (let i = 0; i < menus.length; i++) {
        const m = menus[i];
        if (m.parent?.equals(menu._id)) {
          submenus.push(menus.splice(i, 1)[0]);
          i = i - 1;
        }
      }
      menu.submenus = submenus;
    }

    return res.json(menus);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    await menuModel.createValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { href, title, parent } = req.body;

    const menu = await menuModel.create({ title, href, parent });

    return res.status(201).json(menu);
  } catch (error) {
    next(error);
  }
};

exports.getAllTopbarLinks = async (req, res, next) => {
  try {
    const menus = await menuModel.find().lean();
    if (menus.length === 0) {
      return res.status(404).json({ message: "No Topbar Link Available!" });
    }
    let topbarLinks = [];

    for (const menu of menus) {
      if (menu.parent) {
        topbarLinks.push(menu);
      }
    }
    res.json(topbarLinks);
  } catch (error) {
    next(error);
  }
};

exports.getAllPanelMenus = async (req, res, next) => {
  try {
    const menus = await menuModel.find({}).populate("parent").lean();
    if (menus.length === 0) {
      return res.status(404).json({ message: "No Topbar Link Available!" });
    }
    res.json(menus);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await menuModel.removeValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const deletedMenu = await menuModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu Not Found!" });
    }
    return res.json(deletedMenu);
  } catch (error) {
    next(error);
  }
};
