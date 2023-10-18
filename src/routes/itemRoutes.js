const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", getAllItems);

router.get("/:id", getSingleItem);

router.post("/", createNewItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

module.exports = router;
