const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login, getCurrentUser } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.get('/users/me', getCurrentUser);

router.get('/', (req, res) => {
  res.send('NewsExplorer API is connected to MongoDB');
});

router.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

module.exports = router;
