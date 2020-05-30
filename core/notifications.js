
function notify() {};

notify.prototype = {
    test: function () {
        console.log('notify');
    }

}

module.exports = notify;