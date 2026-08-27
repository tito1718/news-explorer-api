const router = require('express').Router();
const { createUser } = require('../controllers/users');

router.get('/', (req, res) => {
  res.send('NewsExplorer API is connected to MongoDB');
});

router.post('/signup', createUser);

router.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

module.exports = router;
