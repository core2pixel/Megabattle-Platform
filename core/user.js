const pool = require('./pool');
const request = require('request');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        pool.query(sql, user, function (err, result) {
            if (err) throw err

            if (result.length) {

                callback(result[0]);
            } else {

                callback(null);
            }
        });
    },
    stream: function (vk_id, link, points, fraction, type, callback) {
        let sql = `SELECT * FROM stream WHERE vk_id = '`+vk_id+`' ` ;

        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length && points < 5) {
                updateString();
            } else if(!result.length && points < 5) {
                createString();
            }
            
        });
        
        function updateString(){
            let sql = `UPDATE stream SET points = '`+points+`' WHERE vk_id = '`+vk_id+`'  ` ;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if(points === 4 || points === '4'){
                checkEpisodes();
            }
        });
        }
        
        function createString(){
            let sql = `INSERT INTO stream (points, link, vk_id, fraction) VALUES('`+points+`','`+link+`','`+vk_id+`', '`+fraction+`') `;

        pool.query(sql, function (err, result) {
            if (err) throw err
        });
        }
        
        function checkEpisodes(){
            let sql = `SELECT * FROM progress WHERE vk_id = '`+vk_id+`' `;
            pool.query(sql, function (err, result) {
            if (err) throw err
            });
            let status = typeof result;
            if (status) {
                clearEpisodes();
            }else{
                unlockEpisodes();
            }
        }
        function unlockEpisodes(){
            let sql = `INSERT INTO progress (vk_id, fraction, type, points, link) VALUES('`+vk_id+`', '`+fraction+`', '`+type+`', '`+points+`', '`+link+`'),('`+vk_id+`', '`+fraction+`', '`+type+`', '`+points+`', '`+link+`'),('`+vk_id+`', '`+fraction+`', '`+type+`', '`+points+`', '`+link+`'),('`+vk_id+`', '`+fraction+`', '`+type+`', '`+points+`', '`+link+`')`;
            pool.query(sql, function (err, result) {
            if (err) throw err
            });
            
        }
        function clearEpisodes(){
            let sql = `DELETE FROM progress WHERE vk_id = '`+vk_id+`' `;
            pool.query(sql, function (err, result) {
            if (err) throw err
            });
            unlockEpisodes();
        }
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create: function (body, callback) {
        checkExistingAccount(body['user_id']);

        function checkExistingAccount(id) {
            let sql = `SELECT * FROM users WHERE vk_id = ` + id;
            pool.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length === 0) {
                    createAccount(body)
                } else {
                    callback('Account already registered');
                }
            });
        }

        function createAccount(body) {
            var bind = [];
            for (prop in body) {
                bind.push(body[prop]);
            }
            let sql = `INSERT INTO users(vk_token, vk_expires_in, vk_id, username, fraction) VALUES (?, ?, ?, ?, ?)`;

            pool.query(sql, bind, function (err, result) {
                if (err) throw err;
                fillAccount(body, function(vk_image){
                    callback('ok', vk_image);
                });
                
            });
        }

        function fillAccount(body, callback) {
            let request_to_vk = 'https://api.vk.com/method/users.get?user_id='+body['user_id']+'&access_token='+body['access_token']+'&v=5.107&fields=photo_200';
            request(request_to_vk, {
                json: true
            }, (err, res_vk, body) => {
                if (err) {
                    return console.log(err);
                }
                if (typeof body['response'][0].photo_200 != 'undefined') {
                    let sql = `UPDATE users SET vk_image = '` + body['response'][0].photo_200 + `'  WHERE vk_id = ` + body['response'][0].id;
            pool.query(sql, function (err, result) {
                if (err) throw err;

                callback(body, body['response'][0].photo_200);
            });
                    
                }
            });
        }

    },

    login: function (body, callback) {
        checkExistingAccount(body);
        function checkExistingAccount(id) {
            let sql = `SELECT * FROM users WHERE vk_id = ` + body['user_id'];
            pool.query(sql, function (err, result) {
                if (err) throw err;
                if (result.length !== 0) {
                    body['vk_image'] = result[0]['vk_image'];
                    body['fraction'] = result[0]['fraction'];
                    body['username'] = result[0]['username'];
                    updateToken(body);
                } else {
                    callback('No such account');
                }
            });
        }

        function updateToken(body) {
            let sql = `UPDATE users SET vk_token = '` + body['access_token'] + `'  WHERE vk_id = ` + body['user_id'];
            pool.query(sql, function (err, result) {
                if (err) throw err;
                callback(body);
            });
        }
        
    },
    points: function (point, link, user_id, fraction, type, callback) {
        checkExisting();
        
        function checkExisting(){
        let sql = `SELECT points FROM progress WHERE vk_id = '`+user_id+`' AND link = '`+link+`' `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            if (result.length){ 
                fillRow(result[0]['points']);
            } else {
                createRow();
            }
        });    
        }
        function createRow(){
        let sql = `INSERT INTO progress (points, link, vk_id, fraction, type) VALUES('`+point+`','`+link+`','`+user_id+`','`+fraction+`','`+type+`') `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            fillRow(getCurrentPoints());
            
        });
        }
        function getCurrentPoints(){
        let sql = `SELECT points FROM progress WHERE vk_id = '`+user_id+`' AND link = '`+link+`'  `;
        pool.query(sql, function (err, result) {
            if (err) throw err
            return result[0]['points'];
            
        });
        }    
        function fillRow(data){
            if(point - data == 1 && point < 4){
             let sql = `UPDATE progress SET points = '`+point+`' WHERE vk_id = '`+user_id+`' AND link = '`+link+`'  `;
            pool.query(sql, function (err, result) {
            if (err) throw err
            
        });   
            }
        }
    },
    likes: function (user_id, currentFraction, callback) {
        let sql = `SELECT id FROM likes WHERE (vk_id = '` + user_id + `' AND fraction = '` + currentFraction + `')`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                insertLike();
            } else {

            }
        });
        
        function insertLike(){
        let sql = `INSERT INTO likes (value, vk_id, fraction) VALUE(1, '`+user_id+`', '`+currentFraction+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
        });    
        }



    },
    voting: function (vk_id, fraction, score, user_fraction, callback) {
        
        getType(checkAlreadyVoted);
        function getType(callback){
        let sql = `SELECT type FROM voting WHERE is_enabled = 1 LIMIT 1`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            callback(result[0]['type'], checkScores, sendMessage);
        });    
        }
        function checkAlreadyVoted(type, callback, messanger){
        let sql = `SELECT id FROM voting_results WHERE (vk_id = '`+vk_id+`' AND type = '`+type+`' AND fraction = '`+fraction+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            if(!result.length){
                callback(type, insertValue, messanger);
            }else{
                messanger({status: 'error', message: 'Вы уже проголосовали за этот факультет'});
            }
            
        });    
        }
        function checkScores(type, callback, messanger){
        let sql = `SELECT score FROM voting_results WHERE (vk_id = '`+vk_id+`' AND type = '`+type+`') `;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            if(compareScore(score, result)){
                callback(type);
            }else{
                messanger({status: 'error', message: 'Вы уже ставили эту оценку'});
            }
        });     
        }
        function compareScore(score, scores){
            for(let i = 0; i < scores.length; i++){
                if(scores[i]['score'] == score){
                    return false;
                }
            }
            return true;
        }
        function insertValue(type){
        let sql = `INSERT INTO voting_results (vk_id, fraction, score, user_fraction, type) VALUE('`+vk_id+`', '`+fraction+`', '`+score+`', '`+user_fraction+`', '`+type+`')`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            callback({status: 'success'});
        });      
        }
        
        function sendMessage(msg){
            callback(msg);
        }



    }

}

module.exports = User;