const Article = require('../models/article');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors');

const getArticles = (req, res, next) => Article.find({ owner: req.user._id })
  .then((articles) => res.send(articles))
  .catch(next);

const createArticle = (req, res, next) => {
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
        return next(new BadRequestError('Invalid article data'));
      }

      return next(error);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  return Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return next(new NotFoundError('Article not found'));
      }

      if (article.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError('You cannot delete another user’s article'),
        );
      }

      return article.deleteOne().then(() => res.send(article));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Invalid article ID'));
      }

      return next(error);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
