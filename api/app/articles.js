const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");
const upload = require("../multer").uploads;

const Article = require("../models/Article");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }
    const articles = await Article.find(query).populate(
      "category user",
      "title username"
    );
    res.send(articles);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "category user",
      "title username"
    );
    if (!article) {
      return res.status(404).send({error: "Not found" });
    }
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", auth, async (req, res) => {

  try {
    const articleData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user._id,
    };

    const article = new Article(articleData);

    await article.save();

    return res.send({ message: `Successfully created with id: ${article._id }`});
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.post("/upload", [auth, upload.single("image")], async (req, res) => {
    try {
      return res.send("http://localhost:8000/" + req.file.filename);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) {
      return res.status(404).send({error: 'Not found'});
    };
    return res.send({ message: `Article: ${req.params.id} successfully deleted`});
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      return res.status(404).send({error: 'Not found'});
    };
    article.category = req.body.category;
    article.title = req.body.title;
    article.description = req.body.description;
    await article.save();
    return res.send({message: `Article: ${req.params.id} successfully edited`});
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});


module.exports = router;
