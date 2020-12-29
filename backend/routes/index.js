const express = require('express');
const router = express.Router();

//create a test route 
router.get('/hello/world', function(req,res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('mumblr');
});

module.exports = router;