const pool = require('./pool');
let series = [
{"id":"1","name":"Ленинградский эксперимент","youtube_link":"q0YWP0QKZQs","descr":"Путешествия во времени невозможны. Только если у тебя нет таинственного кристалла. Но будь осторожен. У всего в этом мире есть последствия.","year":"2020","genre":"Фантастика","duration":"4 мин","fraction":"mff","fraction_name":"МФФ","likes":"0","bangers_is_enabled":true,"series_is_enabled":false, likes: false, text: "Эпизод факультета Фотоники"},
{"id":"3","name":"Обратная сторона звезды","youtube_link":"iX7Q0fYDvdw","descr":"Инопланетяне ближе, чем вы думаете. Возможно, вы даже знаете их песни, ходите на их концерты, покупаете одежду их лейбла и едите их бургеры. Пришло время во всем разобраться.","year":"2020","genre":"Расследование","duration":"4 мин","fraction":"ftmi","fraction_name":"ФТМИ","likes":"0","bangers_is_enabled":true,"series_is_enabled":false, likes: false, text: "Эпизод факультета ФТМИ"},
{"id":"4","name":"Ктукла","youtube_link":"iX7Q0fYDvdw","descr":"Игра вышла из-под контроля. Теперь не смешно уже никому. Обычная кукла принесла слишком много проблем. Как спасти себя и друзей от старого проклятья?","year":"2020","genre":"Ужасы","duration":"5 мин","fraction":"ktu","fraction_name":"КТиУ","likes":"0","bangers_is_enabled":true,"series_is_enabled":false, likes: false, text: "Эпизод факультета КТиУ"},
{"id":"6","name":"Скрываясь за маской","youtube_link":"Pf7soG40Hrk","descr":"Маски в Instagram прочно вошли в нашу жизнь. А в жизнь четырех друзей даже слишком прочно. Виртуальный мир перешел в реальность. Теперь им остается только открыть свое истинное лицо, чтобы стать свободными.","year":"2020","genre":"Комедия","duration":"5 мин","fraction":"btins","fraction_name":"БТИНС","likes":"0","bangers_is_enabled":true,"series_is_enabled":false, likes: false, text: "Эпизод факультета БТИНС"}
]
let voting = [
{"id":"1","fraction":"mff","fraction_name":"МФФ","type":"banger","is_enabled":"1"},
{"id":"2","fraction":"ftmi","fraction_name":"ФТМИ","type":"banger","is_enabled":"1"},
{"id":"4","fraction":"ktu","fraction_name":"КТУ","type":"banger","is_enabled":"1"},
{"id":"5","fraction":"btins","fraction_name":"БТИНС","type":"banger","is_enabled":"1"},
{"id":"6","fraction":"mff","fraction_name":"МФФ","type":"series","is_enabled":"0"},
{"id":"7","fraction":"ftmi","fraction_name":"ФТМИ","type":"series","is_enabled":"0"},
{"id":"9","fraction":"ktu","fraction_name":"КТУ","type":"series","is_enabled":"0"},
{"id":"10","fraction":"btins","fraction_name":"БТИНС","type":"series","is_enabled":"0"}
]
let bangers = [
{"id":"1","name":"Бэнгер","text":"Бэнгер факультета Фотоники","fraction":"mff","youtube_link":"q0YWP0QKZQs","bangers_is_enabled":false},
{"id":"4","name":"Бэнгер","text":"Бэнгер ФТМИ","fraction":"ftmi","youtube_link":"iX7Q0fYDvdw","bangers_is_enabled":false},
{"id":"5","name":"Бэнгер","text":"Бэнгер факультета КТиУ","fraction":"ktu","youtube_link":"GShDe1sk4b8","bangers_is_enabled":false},
{"id":"6","name":"Бэнгер","text":"Бэнгер факультета БТИНС","fraction":"btins","youtube_link":"Pf7soG40Hrk","bangers_is_enabled":false}
]

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function Render() {};

Render.prototype = {
    // Find the user data by id or username.
    seriesRandom: function (vk_id, callback) {
//        let sql = `SELECT * FROM series ORDER BY RAND() LIMIT 5`;
//        pool.query(sql, function (err, result) {
//            if (err) throw err
//            if (result.length > 0) {
//                checkLikes(result[0]['fraction'], vk_id, result, callback);
//            } else {
//                callback(null);
//            }
//        });
        let rand_num = getRandomInt(4);
        checkLikes(series[getRandomInt(rand_num)]['fraction'], vk_id, series, rand_num, callback);
        
        function checkLikes(fraction, vk_id, data, rand_num, callback){
        let sql = `SELECT id FROM likes WHERE (fraction = '`+fraction+`' AND vk_id = '`+vk_id+`') `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length > 0) {
                data[rand_num]['like'] = true;
                callback(data);
            } else {
                data[rand_num]['like'] = false;
                callback(data);
            }
        });    
        }
    },
    series: function (callback) {
//        let sql = `SELECT * FROM series`;
//        pool.query(sql, function (err, result) {
//            if (err) throw err
//            if (result.length) {
//                
//                callback(result);
//            } else {
//                callback(null);
//            }
//        });
        callback(series);
    },
    seriesByFraction: function (fraction, vk_id, callback) {

        let sql = `SELECT * FROM series WHERE fraction='`+fraction+`' UNION SELECT * FROM series WHERE fraction != '`+fraction+`'`;
        
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length) {
                checkLikes(result[0]['fraction'], vk_id, result, callback);
            } else {
                callback(null);
            }
        });
        
        function checkLikes(fraction, vk_id, data, callback){
        let sql = `SELECT id FROM likes WHERE (fraction = '`+fraction+`' AND vk_id = '`+vk_id+`') `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length > 0) {
                data[0]['like'] = true;
                mergeJSONSeries(data, series, callback);
            } else {
                data[0]['like'] = false;
                mergeJSONSeries(data, series, callback);
            }
        });    
        }
        
        function mergeJSONSeries(original, needed, callback){
    for(let i = 0; i < original.length; i++){
        for(let x = 0; x < needed.length; x++){
            if(original[i]['fraction']===needed[x]['fraction']){
                original[i]['name'] = needed[x]['name'];
                original[i]['descr'] = needed[x]['descr'];
                original[i]['fraction_name'] = needed[x]['fraction_name'];
                original[i]['duration'] = needed[x]['duration'];
                original[i]['genre'] = needed[x]['genre'];
                original[i]['bangers_is_enabled'] = needed[x]['bangers_is_enabled'];
                original[i]['series_is_enabled'] = needed[x]['series_is_enabled'];
            }
            
        }
    }
    callback(original);
}
    },
    voting: function (user_fraction, vk_id, callback) {
        let sql = `SELECT * FROM voting WHERE (is_enabled = 1 AND fraction !='`+user_fraction+`')`;
        
        pool.query(sql, function (err, result) {
            if (err) throw err
            
            if (result.length) {
                checkProgress(result[0]['type'], vk_id, result);
            } else {
                callback(null);
            }
        });
        
        function checkProgress(type, vk_id, data){
        let sql = `SELECT fraction FROM progress WHERE (vk_id = '`+vk_id+`' AND type = '`+type+`' AND (points = 3 OR points = 4) AND fraction != '`+user_fraction+`' )`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            console.log(sql);
            if (result.length > 4 || result.length === 4 || (result.length === 3 && user_fraction !== 'watcher')) {
                checkAlreadyVoted(type, data);
            }else if(result.length < 4 && result.length != 0){
                callback(null, result);
            }else {
                callback(null);
            }
        }); 
         
        }
        function checkAlreadyVoted(type, data){
        let sql = `SELECT fraction FROM voting_results WHERE (vk_id = '`+vk_id+`' AND type = '`+type+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (!result.length) {
                mergeJSONVoting(data, voting, callback);
            } else {
                if(data.length === result.length){
                    callback('voted');
                }else{
                    let editedJSONVoting = voting;
                   for(let i = 0; i < data.length; i++){
                    for(let x = 0; x < result.length; x++){
                        if(data[i]['fraction'] === result[x]['fraction']){
                            data.splice(i, 1);
                            editedJSONVoting.splice(i, 1);
                        }
                    }
                }
                mergeJSONVoting(data, editedJSONVoting, callback);
                }
                
            }
        });    
        }
        
       function mergeJSONVoting(original, needed, callback){
    for(let i = 0; i < original.length; i++){
        for(let x = 0; x < needed.length; x++){
            if(original[i]['fraction']===needed[x]['fraction']){
                original[i]['fraction_name'] = needed[x]['fraction_name'];

            }
            
        }
    }
    callback(original);
}    
    },
    player: function (fraction, type, vk_id, callback) {
        let sql = `SELECT * FROM `+type+` WHERE (`+type+`_is_enabled = 1 AND fraction = '`+fraction+`') `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length) {
                checkIfCompleted(result[0]['youtube_link'], result, callback);
            } else {
                callback(null);
            }
        });
        
        function checkIfCompleted(link, data, callback){
        let sql = `SELECT points FROM progress WHERE (vk_id ='`+vk_id+`' AND type = '`+type+`' AND link = '`+link+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            console.log(sql);
            if (result.length != 0 && result[0]['points'] == 3) {
                data[0]['passed'] = true;
                if(type === 'bangers'){
                    mergeJSONBangersPlayer(data, bangers, callback);
                }
                if(type === 'series'){
                    mergeJSONSeriesPlayer(data, series, callback);
                }
            } else {
                data[0]['passed'] = false;
                if(type === 'bangers'){
                    mergeJSONBangersPlayer(data, bangers, callback);
                }
                if(type === 'series'){
                    mergeJSONSeriesPlayer(data, series, callback);
                }
            }
        });    
        }
        
        
        function mergeJSONSeriesPlayer(original, needed, callback){
    for(let i = 0; i < original.length; i++){
        for(let x = 0; x < needed.length; x++){
            if(original[i]['fraction']===needed[x]['fraction']){
                original[i]['name'] = needed[x]['name'];
                original[i]['descr'] = needed[x]['descr'];
                original[i]['fraction_name'] = needed[x]['fraction_name'];
                original[i]['duration'] = needed[x]['duration'];
                original[i]['genre'] = needed[x]['genre'];
                original[i]['text'] = needed[x]['text'];
                original[i]['youtube_link'] = needed[x]['youtube_link'];
            }
            
        }
    }
    callback(original);
}
        function mergeJSONBangersPlayer(original, needed, callback){
    for(let i = 0; i < original.length; i++){
        for(let x = 0; x < needed.length; x++){
            if(original[i]['fraction']===needed[x]['fraction']){
                original[i]['name'] = needed[x]['name'];
                original[i]['text'] = needed[x]['text'];
                original[i]['youtube_link'] = needed[x]['youtube_link'];
            }
            
        }
    }
    callback(original);
}
    }

}
function encodeSymbols(string) {
    switch(string) {
  case 'value1': 
    return 'Ленинградский эксперимент';
}
}


module.exports = Render;