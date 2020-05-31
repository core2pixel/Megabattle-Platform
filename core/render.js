const pool = require('./pool');
let series = [
{"id":"1","name":"Ленинградский эксперимент","youtube_link":"L0blnTRD2qU","descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","year":"2020","genre":"Комедия","duration":"4 мин","fraction":"mff","fraction_name":"МФФ","likes":"0","bangers_is_enabled":"1","series_is_enabled":"0", likes: false},
{"id":"3","name":"Ленинградский эксперимент","youtube_link":"K09_5IsgGe8","descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","year":"2020","genre":"Комедия","duration":"4 мин","fraction":"ftmi","fraction_name":"ФТМИ","likes":"0","bangers_is_enabled":"1","series_is_enabled":"0", likes: false},
{"id":"4","name":"Ленинградский эксперимент","youtube_link":"jPan651rVMs","descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","year":"2020","genre":"Комедия","duration":"4 мин","fraction":"ktu","fraction_name":"КТиУ","likes":"0","bangers_is_enabled":"1","series_is_enabled":"0", likes: false},
{"id":"6","name":"Ленинградский эксперимент","youtube_link":"pz1ztvu77FM","descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","year":"2020","genre":"Комедия","duration":"4 мин","fraction":"btins","fraction_name":"БТИНС","likes":"0","bangers_is_enabled":"1","series_is_enabled":"0", likes: false}
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
{"id":"1","name":"Ленинградский эксперимент","text":"Бэнгер факультета Фотоники","fraction":"mff","youtube_link":"pB-GfkFu_lM","bangers_is_enabled":"1"},
{"id":"4","name":"Ленинградский эксперимент","text":"Бэнгер ФТМИ","fraction":"ftmi","youtube_link":"5mm163wWKL8","bangers_is_enabled":"1"},
{"id":"5","name":"Ленинградский эксперимент","text":"Бэнгер факультета КТиУ","fraction":"ktu","youtube_link":"oYhB8F7LF2I","bangers_is_enabled":"1"},
{"id":"6","name":"Ленинградский эксперимент","text":"Бэнгер факультета БТИНС","fraction":"btins","youtube_link":"g9wFQTzRfog","bangers_is_enabled":"1"}
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
            console.log(sql);
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
            console.log(result);
            if (result.length) {
                checkProgress(result[0]['type'], vk_id, result);
            } else {
                callback(null);
            }
        });
        
        function checkProgress(type, vk_id, data){
        let sql = `SELECT * FROM progress WHERE (vk_id = '`+vk_id+`' AND type = '`+type+`' AND points = 3) LIMIT 5`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length === 3) {
                checkAlreadyVoted(type, data);
            } else {
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
                   for(let i = 0; i < data.length; i++){
                    for(let x = 0; x < result.length; x++){
                        if(data[i]['fraction'] === result[x]['fraction']){
                            data.splice(i, 1);
                        }
                    }
                }
                mergeJSONVoting(data, voting, callback);
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
        let sql = `SELECT points FROM progress WHERE (vk_id ='`+vk_id+`' AND link = '`+link+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length != 0 && result[0]['points'] == 3) {
                data[0]['passed'] = true;
                callback(data);
            } else {
                data[0]['passed'] = false;
                callback(data);
            }
        });    
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