
if(document.getElementById("content") !== null){
    contentFix();
}
let show_profile_popup = 0;
$('.profile_user-photo').click(function(){
    if(show_profile_popup===0){
        $('.profile_popup').fadeIn(); 
        show_profile_popup = 1;
    }else{
        $('.profile_popup').fadeOut();
        show_profile_popup = 0;
    }
   
});

function contentFix(){
let headerHeight = document.getElementById('header').clientHeight;
let contentHeight = document.getElementById('content').clientHeight;
let rootHeight = document.getElementById('root').clientHeight;
let galeryHeight = rootHeight - (headerHeight+contentHeight);
let controlHeight = document.getElementById('seriesControl').clientHeight;
if(galeryHeight > 280){
    galeryHeight = 280;
}
let seriesSliderHeight = galeryHeight - controlHeight;
document.getElementById('galery').style.height = galeryHeight + "px";
document.getElementById('seriesSlider').style.height = seriesSliderHeight + "px";
}

jQuery(document).ready(function(){
$('#seriesSlider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
    dots: false,
    autoplay: true,
    arrows: false
    
});
    $('#frame_slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        arrows: false,
        speed: 1500,
        swipe: false

    });
});

$('#slide_back').click(function(){
    $('#seriesSlider').slick('slickPrev');
});
$('#slide_forward').click(function(){
    $('#seriesSlider').slick('slickNext');
})



$( ".voteMark > img" ).click(function() {
  $( this ).attr('src','img/start_enabled.png');
});


$('.field_like > button').click(function(){
    savePoints();
    $('.field_like > button').css('background-color', 'rgba(219, 117, 253, 0.5)');
    
});

    function savePoints() {
        $.ajax({
            type: "POST",
            url: "/action/like",
            data: "",
            success: function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }


