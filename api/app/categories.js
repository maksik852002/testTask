const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");

const Category = require("../models/Category");
const Article = require("../models/Article");

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "articles",
        localField: "_id",
        foreignField: "category",
        as: "articles",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        articlesCount: { $size: "$articles" },
      },
    },
  ]);

  return res.send(categories);
});

router.post("/", auth, async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
      description: req.body.description,
    });
    await category.save();
    return res.send(category);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Not found" });
    }
    category.title = req.body.title;
    category.description = req.body.description;
    await category.save();
    return res.send({
      message: `Category ${req.params.id} successfully edited`,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const articles = await Article.find({category: req.params.id})
    if (articles.length > 0) {
      return res.status(422).send({ error: "Delete related articles first" });
    }
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Not found" });
    }
    return res.send({
      message: `Category: ${req.params.id} successfully deleted`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
