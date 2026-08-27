const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('NewsExplorer API is connected to MongoDB');
});

router.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

module.exports = router;
