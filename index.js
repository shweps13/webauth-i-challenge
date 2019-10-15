const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.get('/', (req, res) => {
    const nameInsert = req.teamName ? ` ${req.teamName}` : '';
    const yourData = process.env
    res.send(`
    <h2>Heorhii "Users" API</h2>
    <p>Hello ${yourData.USER}</p>
    <p>Welcome ${nameInsert} to the Heorhii Hubs API on port ${yourData.PORT}</p>
    `);
  });

server.post('/api/register', (req, res) => {
    let user = req.body;
  
    //hash the pass
    const hash = bcrypt.hashSync(user.password, 8)
  
    //we override ht pass with the hash
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


server.post('/api/login', (req, res) => {
let { username, password } = req.body;

if (username && password){
    Users.findBy({ username })
    .first()
    .then(user => {
    
        if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
        res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
} else {
    res.status(400).json({ message: 'please provide credentials' });
}


});

server.get('/api/users', protected, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });


function protected(req, res, next) {
let { username, password } = req.headers;

if (username && password) {
    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
        next();
        } else {
        res.status(401).json({ message: 'You shall not pass!' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
} else {
    res.status(400).json({ message: 'please provide credentials' });
}
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));