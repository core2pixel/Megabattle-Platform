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
        let duration = 14;
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
            timer = setInterval(function(){checkTime(checkControlPoints); }, 7000);
        }
      }
function checkControlPoints(time){

        
    }
      function stopVideo() {
        player.stopVideo();
      }
    
    function checkTime(callback){
        let time = player.getCurrentTime();
        let delta = time - last_time;
        console.log(delta);
        if(delta < 10){
            last_time = time;
        }else{
            //preventCheating();
        }
        
    }
    function preventCheating(){
        player.seekTo(last_time, true);
    }
let points = 0;
    function savePoints(){
    points++;
    $.ajax({
  type: "POST",
  url: "/action/stream",
  data: "link="+link+"&points="+points ,
  success: function(msg){
    console.log(msg);
  },
 error: function(msg){
    console.log(msg);
  }       
});
    }


setInterval(savePoints, 180000);