      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
    let link = $('.streamStatus').attr('id');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          videoId: link,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
        
let control_points;
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        let duration = 13;
        let control_point = duration/4;
        control_points = [control_point, control_point*2, control_point*3];
        console.log(control_points);
        player.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      let timer;
    let last_time = 0;
      function onPlayerStateChange(event) {
        
        if (event.data == YT.PlayerState.PAUSE) {
            clearInterval(timer);
        }
        if (event.data == YT.PlayerState.BUFFERING) {
            clearInterval(timer);
        }
        if (event.data == YT.PlayerState.PLAYING) {
            timer = setInterval(function(){checkTime(checkControlPoints); }, 5000);
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    function checkControlPoints(time){
        let delta1 = Math.abs(time - control_points[0]);
        let delta2 = Math.abs(time - control_points[1]);
        let delta3 = Math.abs(time - control_points[2]);
        if(delta1 < 6 || delta2 < 6 || delta3 < 6){
            if(time > control_points[0] && Math.abs(time - control_points[0]) < 7){
                console.log(1);
                savePoints(1);
            }
            if(time > control_points[1] && Math.abs(time - control_points[1]) < 7){
                console.log(2);
                savePoints(2);
            }
            if(time > control_points[2] && Math.abs(time - control_points[2]) < 7){
                console.log(3);
                savePoints(3);
            }
        }
        
    }
    
    function checkTime(callback){
        let time = player.getCurrentTime();
        console.log('time');
        console.log(getCurrentTime);
        let delta = time - last_time;
        console.log(delta);
        if(delta < 6){
            last_time = time;
            callback(time);
        }else{
            preventCheating();
        }
        
    }
    function preventCheating(){
        player.seekTo(last_time, true);
    }

    function savePoints(point){
    $.ajax({
  type: "POST",
  url: "/action/stream",
  data: "link="+link+"&point="+point,
  success: function(msg){
    console.log(msg);
  },
 error: function(msg){
    console.log(msg);
  }       
});
    }
