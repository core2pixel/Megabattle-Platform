var express = require('express');
var router = express.Router();

//User lib
const User = require('../core/user');
const user = new User();

//Render lib
const Render = require('../core/render');
const render_layout = new Render();

let path = require('path');
router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Возникла ошибка!',
    action: '/'
  })
});
router.get('/accountAlreadyRegistered', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Вы уже были зарегистрированы на платформе!',
    action: '/'
  })
});
router.get('/wasntegistered', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Вы ещё не зарегистрировались',
    action: '/register'
  })
});

router.get('/noAuth', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Вы не авторизированы!',
    action: '/'
  })
});
router.get('/player_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Доступ к плееру запрещён.<br>Неверные входные данные.',
    action: '/home'
  })
});
router.get('/stream_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Произошла ошибка при подключении к стриму.',
    action: '/home'
  })
});
router.get('/voting_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Голосование вам не доступно!<br>Убедитесь, что вы посмотрели видео всех факультетов.',
    action: '/home'
  })
});
router.get('/votingAlready_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Вы уже проголосовали!',
    action: '/home'
  })
});
router.get('/renderSeries_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Возникла ошибка при отображении видео.',
    action: '/'
  })
});
router.get('/noFractionSeries_issues', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Возникла ошибка при отображении видео.<br>Не указан факультет',
    action: '/home'
  })
});
router.get('/content_disabled', (req, res) =>{
    res.render('notification', {
    layout: 'notification',
    message: 'Данное видео ещё недоступно.',
    action: '/home'
  })
});

//export this router to use in our index.js
module.exports = router;