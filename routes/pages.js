var express = require('express');
var router = express.Router();

//User lib
const User = require('../core/user');
const user = new User();

//Render lib
const Render = require('../core/render');
const render_layout = new Render();

const session = require('express-session');
const request = require('request');

let host = 'http://mbtl.ru';
let key = 'xYxUYtbUNbuL6b3KAH8T';
let client_id = '7482992';

let host_test = 'http://localhost';
let key_test = 's9MDB4f4bR48TQf78IV3';
let client_id_test = '7493736';

let dev_mode = false;

let access;
if(!dev_mode){
}else{
    host = host_test;
    key = key_test;
    client_id = client_id_test;
}
router.get('/', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.redirect('/intro');
        return;
    }
    // IF not we just send the index page.
    
    res.render('login', {layout: 'auth',  bg: 'login'});
})

router.get('/intro', (req, res) =>{
    let user = req.session.user;
    if(user) {
            console.log(user.user_id + '['+translateFraction(user.fraction)+'] зашёл на начальную страницу.');
            res.render('intro',  {name:user.username,layout: 'intro', avatar:user.vk_image, fraction: translateFraction(user.fraction), bg: 'stream'});  
        //
    }else{
       res.redirect('/notification/noAuth'); 
    }
    
    
});
// Get home page
router.get('/home', (req, res, next) => {
    //Загружаем инфо о сессии
    let user = req.session.user;
    //Проверяем вход
    if (user) {
        //Рендерим конкретную серию
        let episode;
        let fractionSpelling = checkGetFraction(req.query.series);
        if (req.query.series !== undefined && fractionSpelling) {
            episode = req.query.series;
        }else{
            episode = 'mff';
        }
        
        render_layout.seriesByFraction(episode, user.user_id, function (result) {

                if(result){ 
                user.currentFraction = result[0]['fraction'];
                console.log(user.user_id + '['+translateFraction(user.fraction)+'] загрузил плейлист по факультету ' + translateFraction(user.currentFraction));
                res.render('series', {
                    layout: 'galery',
                    name: user.username,
                    avatar: user.vk_image,
                    series: result,
                    color: getColor(result[0]['fraction']),
                    banger_is_enabled: result[0]['bangers_is_enabled'],
                    series_is_enabled: result[0]['series_is_enabled'],
                    like: result[0]['like'],
                    fraction: translateFraction(user.fraction),
                    fraction_code: req.query.series
                });    
                }else{
                    res.redirect('/notification/noFractionSeries_issues');
                }
            });
            return;
//        } else {
//        //Рендерим рандомную серию
//            render_layout.seriesRandom(user.user_id, function (result) {
//                
//                if(result){
//                user.currentFraction = result[0]['fraction'];
//                console.log(user.user_id + '['+translateFraction(user.fraction)+'] загрузил рандомный плейлист по факультету ' + translateFraction(user.currentFraction));
//                res.render('series', {
//                    layout: 'galery',
//                    name: user.username,
//                    avatar: user.vk_image,
//                    series: result,
//                    banger_is_enabled: result[0]['bangers_is_enabled'],
//                    series_is_enabled: result[0]['series_is_enabled'],
//                    like: result[0]['like'],
//                    fraction: translateFraction(user.fraction),
//                    fraction_code: result[0]['fraction']
//                });    
//                }else{
//                    res.redirect('/notification/renderSeries_issues');
//                }
//            });
//            return;
//        }

    }
    res.redirect('/notification/noAuth');
});
router.get('/player', (req, res) => {
    let user = req.session.user;
    if (user) {
        if (req.query.type !== undefined && req.query.fraction !== undefined) {
            
            render_layout.player(req.query.fraction, req.query.type, user.user_id, function (result) {
                if(result){
                let script;
                if(result[0]['passed']){
                    script = 'player.js';
                    console.log(user.user_id + '['+translateFraction(user.fraction)+'] зашёл в плеер снова. Смотрит ' + result[0]['text']);
                }else{
                    script = 'noclip_player.js';
                    console.log(user.user_id + '['+translateFraction(user.fraction)+'] зашёл в первый раз. Смотрит ' + result[0]['text']);
                    
                }
                    
                res.render('player', {
                    layout: 'player',
                    link: result[0]['youtube_link'],
                    text: result[0]['text'],
                    fraction: result[0]['fraction'],
                    vk_id: user.vk_id,
                    avatar: user.vk_image,
                    script: script,
                    bg: 'player'
                });    
                }else{
                    res.redirect('/notification/player_issues');
                }
                
            });
            return;
        } else {
            //TO DO
            //Уведомление о неправильном заходе
            res.redirect('/notification/player_issues');
        }
    }
    res.redirect('/notification/noAuth');
});
router.get('/stream', (req, res) =>{
    let user = req.session.user;
    if(user) {
            console.log(user.user_id + '['+translateFraction(user.fraction)+'] зашёл на стрим.');
            res.render('stream',  {name:user.username,layout: 'stream', avatar:user.vk_image, fraction: translateFraction(user.fraction), bg: 'stream', link: 'LFwiWefqCiA'});  
        //VazHDDYiPZU
        //tmqzbuARkIo
        //LFwiWefqCiA
    }else{
       res.redirect('/notification/noAuth'); 
    }
    
    
});
router.get('/voting', (req, res) =>{
    let user = req.session.user;
    if(user) {
            render_layout.voting(user.fraction, user.user_id, function(result, fractions){
                if(result === 'voted'){
                    res.redirect('/notification/votingAlready_issues');
                }else{
                    if(result){
                        console.log(user.user_id + '['+translateFraction(user.fraction)+'] зашёл на голосовалку.');
                    res.render('voting', {layout: 'voting', bg: 'voting', name:user.username, avatar:user.vk_image, fraction_name: translateFraction(result[0].fraction), fraction: translateFraction(user.fraction), voting: result});
                }else{
                    if(fractions !== undefined){
                        res.redirect('/notification/votingList_issues'+createRequest(fractions));
                    }else{
                        res.redirect('/notification/voting_issues');
                    }
                    
                }
                }
                
            });
            return;
        
    }
    res.redirect('/notification/noAuth');
});

function createRequest(data){
    let string = '?fractions=';
    let url = '/notification/votingList_issues';
    for(let i = 0; i < data.length; i++){
        string = string + translateFraction(data[i]['fraction'])+',';
        
}
    return string;
}

/*Авторизация*/
router.get('/vk_register', (req, res)=>{
    //Дополнительные данные из запроса
    let state = req.query.state;
    //Если всё хорошо
    if(typeof req.query.code != 'undefined'){
        //Запрос к API вк
        let request_to_vk = 'https://oauth.vk.com/access_token?client_id='+client_id+'&client_secret='+key+'&code='+req.query.code + '&redirect_uri='+host+'/vk_register';
    request(request_to_vk, { json: true }, (err, res_vk, body) => {
  if (err) { return console.log(err); }
  if(typeof body['user_id'] != 'undefined'){
      let username = state.split('/')[0];
      let fraction = state.split('/')[1];
      body['username'] = username;
      body['fraction'] = fraction;
      user.create(body, function(result, vk_image){
          if(result === 'ok'){
            req.session.user = body;
            req.session.user.fraction = fraction;
            req.session.user.vk_image = vk_image['response'][0].photo_200;
            req.session.opp = 0;
            console.log(username + ' из '+fraction+' зарегистрировался');
            res.redirect('/intro');
          }else if(result==='Account already registered'){
              res.redirect('/notification/accountAlreadyRegistered');
          }
      });
  }
});
    }else{
        
    }
})
router.get('/vk_login', (req, res) =>{
    if(typeof req.query.code != 'undefined'){
        let request_to_vk = 'https://oauth.vk.com/access_token?client_id='+client_id+'&client_secret='+key+'&code='+req.query.code + '&redirect_uri='+host+'/vk_login';
        request(request_to_vk, { json: true }, (err, res_vk, body) => {
  if (err) { return console.log(err); }
  if(typeof body['user_id'] != 'undefined'){
      user.login(body, function(result){
          if(result!=='No such account'){
            req.session.user = body;
            req.session.opp = 0;
            console.log(body['user_id'] + ' вошёл в систему');
            res.redirect('/intro');
          }else{
              res.redirect('/notification/wasntegistered');
          }
      });
  }
});
    }
});


// Post login data
router.post('/login', (req, res, next) => {
let redirect = 'https://oauth.vk.com/authorize?client_id='+client_id+'&display=page&redirect_uri='+host+'/vk_login&scope=friends&response_type=code&v=5.107&state='+req.body.username + '/' + req.body.fraction;
    res.redirect(redirect);
});

// Post register data
router.post('/register', (req, res, next) => {
    let redirect = 'https://oauth.vk.com/authorize?client_id='+client_id+'&display=page&redirect_uri='+host+'/vk_register&scope=friends&response_type=code&v=5.107&state='+req.body.username + '/' + req.body.fraction;
    res.redirect(redirect);
});

router.get('/login', (req, res) =>
  res.render('login', {
    layout: 'auth',   bg: 'login'
  })
);
router.get('/register', (req, res) =>
  res.render('register', {
    layout: 'auth',   bg: 'register'
  })
);
// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});



//export this router to use in our index.js
module.exports = router;


function translateFraction(fraction){
    switch (fraction) {
    case 'mff':
    return 'МФФ';        
    break;        
    case 'ktu':
    return 'КТиУ';        
    break;
    case 'btins':
    return 'БТИНС';        
    break;
    case 'ftmi':
    return 'ФТМИ';
    break;
  default:
    return 'Наблюдатель';
}
}
function checkGetFraction(fraction){
    switch (fraction) {
    case 'mff':
    return true;        
    break;        
    case 'ktu':
    return true;          
    break;
    case 'btins':
    return true;         
    break;
    case 'ftmi':
    return true;  
    break;
  default:
    return false;  
}
}

function getColor(fraction){
        switch (fraction) {
    case 'mff':
    return '#00AE4C';        
    break;        
    case 'ktu':
    return '#4EB7A9';          
    break;
    case 'btins':
    return '#39B4E6';         
    break;
    case 'ftmi':
    return '#D97E1F';  
    break;
  default:
    return '#00AE4C';  
}
}