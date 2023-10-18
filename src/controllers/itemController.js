const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");

const getAllItems = async (req, res) => {
  try {
    const result = await Item.findAll({
      attributes: {
        exclude: ["id", "category_id"],
      },
      include: { model: Category, attributes: ["name"] },
    });
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const getSingleItem = async (req, res) => {
  try {
    const result = await Item.findByPk(req.params.id, {
      attributes: {
        exclude: ["id", "category_id"],
      },
      include: { model: Category, attributes: ["name"] },
    });
    if (result != null) {
      return res.json(result);
    }

    return res.send("Item not found!");
  } catch (error) {
    // res.status(500).then();
    res.send(error);
  }
};

const createNewItem = async (req, res) => {
  try {
    const result = await Item.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category_id,
    });
    return res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const updateItem = async (req, res) => {
  try {
    console.log(req.body);
    const result = await Item.findByPk(req.params.id);
    if (result != null) {
      const updatedItem = await Item.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updatedItem) throw "error while updating item.";
      const returnUpdatedItem = await Item.findByPk(req.params.id);
      if (!returnUpdatedItem) throw "error while fetching updated item.";
      return res.json(returnUpdatedItem);
    }
    return res.send("Item not found!");
  } catch (error) {
    res.send(error).status(500);
  }
};

const deleteItem = async (req, res) => {
  try {
    const result = await Item.findAll({ where: { id: req.params.id } });
    if (result != null) {
      await Item.destroy({ where: { id: req.params.id } });
      return res.json(result);
    }
    return res.send("Item not found");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

module.exports = {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
};
