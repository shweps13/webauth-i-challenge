const router = require('express').Router();

const Users = require('../users/users-model.js');
const restricted = require('../restricted-middleware.js');

router.use(restricted);

router.get('/', (req, res) => {
  console.log('username', req.session.username)
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/something', (req, res) => {
  console.log('username', req.session.username)
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/other', (req, res) => {
  console.log('username', req.session.username)
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
