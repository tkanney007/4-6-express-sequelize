const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");
const categoryModel = require("./categoryModel");

const Item = sequelize.define(
  "items",
  {
    // The model name is typically the singular form of the table name.
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

categoryModel.hasMany(Item, {
  foreignKey: "category_id",
});

Item.belongsTo(categoryModel, {
  foreignKey: "category_id",
});

Item.sync({ force: false });

module.exports = Item;
