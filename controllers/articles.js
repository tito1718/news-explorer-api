const Article = require('../models/article');

const getArticles = (req, res) => Article.find({ owner: req.user._id })
  .then((articles) => res.send(articles))
  .catch(() => res.status(500).send({
    message: 'An error occurred on the server',
  }));

const createArticle = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Invalid article data',
        });
      }

      return res.status(500).send({
        message: 'An error occurred on the server',
      });
    });
};

const deleteArticle = (req, res) => {
  const { articleId } = req.params;

  return Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          message: 'Article not found',
        });
      }

      if (article.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: 'You cannot delete another user’s article',
        });
      }

      return article.deleteOne().then(() => res.send(article));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({
          message: 'Invalid article ID',
        });
      }

      return res.status(500).send({
        message: 'An error occurred on the server',
      });
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
