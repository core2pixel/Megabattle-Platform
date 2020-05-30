
      var tag = document.createElement('script');
    let link = $('.streamStatus').attr('id');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
      function onPlayerReady(event) {
        player.playVideo();
      }
      function onPlayerStateChange(event) {
      }
      function stopVideo() {
        player.stopVideo();
      }
