const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');

router.post('/', authenticate);

function authenticate(req, res, next) {
    adminService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

module.exports = router;