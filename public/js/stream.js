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
        control_points = [4, 7, 10, 13];
        console.log(control_points);
        player.seekTo(0, true);  
        player.playVideo();
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
