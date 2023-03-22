const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
    const result = await Category.findAll();
    res.json(result);
}

exports.getSingleCategory = async (req, res) => {
    const result = await Category.findByPk(req.params.id);
    if(result != null){
        return res.json(result);
    }
    return res.send("Category not found");  
}

exports.addNewCategory = async (req, res) => {
    await Category.create({
        name: req.body.name
    });
    const result = await Category.findByPk(req.params.id);
    return res.json(result);
}

exports.editCategory = async (req, res) => {
    const result = await Category.findByPk(req.params.id);
    if(result != null){
        await Category.update({name: req.body.name}, {where: {id: req.params.id}});
        return res.json(result);
    }
    return res.send("Category not found"); 
}

exports.deleteCategory = async (req, res) => {
    const result = await Category.findAll({where: {id: req.params.id}});
    if(result != null){
        await Category.destroy({where: {id: req.params.id}});
        return res.json(result);
    }
    return res.send("Category not found"); 
}