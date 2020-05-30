const pool = require('./pool');
function Render() {};

Render.prototype = {
    // Find the user data by id or username.
    seriesRandom: function (vk_id, callback) {
        let sql = `SELECT * FROM series ORDER BY RAND() LIMIT 5`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length > 0) {
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
                callback(data);
            } else {
                data[0]['like'] = false;
                callback(data);
            }
        });    
        }
    },
    series: function (callback) {
        let sql = `SELECT * FROM series`;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length) {
                callback(result);
            } else {
                callback(null);
            }
        });
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
                callback(data);
            } else {
                data[0]['like'] = false;
                callback(data);
            }
        });    
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
            if (result.length === 5) {
                callback(data);
            } else {
                callback(null);
            }
        });    
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

module.exports = Render;