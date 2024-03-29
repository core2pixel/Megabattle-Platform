var express = require('express');
var router = express.Router();
const User = require('../core/user');
const user = new User();

router.post('/points', (req, res, next) => {
let sessionVk = req.session.user;
let body;
let point = req.body.point;
let link =  req.body.link;
let user_id = sessionVk.user_id;
let fraction = req.body.fraction;
let type = req.body.type;    
user.points(point,link,user_id, fraction, type, function(result){
      });
});
router.post('/like', (req, res, next) => {
let sessionLike = req.session.user;
let user_id = sessionLike.user_id;
let currentFraction = sessionLike.currentFraction;
user.likes(user_id, currentFraction, function(result){
    
});
});
router.post('/stream', (req, res, next) => {
let sessionLike = req.session.user;
let vk_id = sessionLike.user_id;
let fraction = sessionLike.fraction;
let link = req.body.link;
let points = req.body.points;
let type = 'ending';
user.stream(vk_id, link, points, fraction, type, function(result){
  
});
});
router.post('/voting', (req, res, next) => {
let sessionVk = req.session.user;
user.voting(sessionVk.user_id, req.body.fraction, req.body.value,  sessionVk.fraction, function(result){
    res.send(result);
});
});
//export this router to use in our index.js
module.exports = router;