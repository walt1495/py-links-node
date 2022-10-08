const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', (req, res) => {
    res.send('recived');
});

module.exports = router;