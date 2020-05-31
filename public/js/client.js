
if(document.getElementById("content") !== null){
    contentFix();
}
let show_profile_popup = 0;
$('.profile_user-photo').click(function(){
    if(show_profile_popup===0){
        $('.profile_popup').fadeIn(); 
        show_profile_popup = 1;
        if($(window).width() < 470){
            $('.header_logotype').fadeOut();
        }
        
    }else{
        $('.profile_popup').fadeOut();
        show_profile_popup = 0;
        $('.header_logotype').fadeIn();
    }
   
});


let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
function contentFix(){

let headerHeight = document.getElementById('header').clientHeight;
let contentHeight = document.getElementById('content').clientHeight;
let rootHeight = document.getElementById('root').clientHeight;
let galeryHeight = rootHeight - (headerHeight+contentHeight);
let controlHeight = document.getElementById('seriesControl').clientHeight;
if(galeryHeight > 280){
    galeryHeight = 280;
}

if(galeryHeight > 160 && $(document).width()<700){
    $('#content').height(contentHeight + (galeryHeight-160));
    galeryHeight = 160;
}
let seriesSliderHeight = galeryHeight - controlHeight;
document.getElementById('galery').style.height = galeryHeight + "px";
document.getElementById('seriesSlider').style.height = seriesSliderHeight + "px";
    alert(rootHeight);
    alert(headerHeight);
    alert(contentHeight);
    alert(galeryHeight);
    
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(isChrome){
        $('#content').height($('#content').height()-50);
    }
//if($(document).width()<700){
//    let fix = rootHeight - (headerHeight + galeryHeight+6);
//    $('#content').height(fix);
//}
    
    
    
}

jQuery(document).ready(function(){
$('#seriesSlider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
    dots: false,
    autoplay: true,
    arrows: false,
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
        {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
    
});
    
    if(!($(document).width()<700)){
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
}else{
    $('#frame_slider').remove();
}
    
});

$('#slide_back').click(function(){
    $('#seriesSlider').slick('slickPrev');
});
$('#slide_forward').click(function(){
    $('#seriesSlider').slick('slickNext');
})
    
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

    
//$('.voteScore').rate();
let optionsMFF = {
    max_value: 5,
    step_size: 1,
    cursor: 'cursor',
    ajax_method: 'POST',
    url: '/action/voting',
    additional_data: {fraction: 'mff'}
}
let optionsTINT = {
    max_value: 5,
    step_size: 1,
    cursor: 'cursor',
    ajax_method: 'POST',
    url: '/action/voting',
    additional_data: {fraction: 'tint'}
}
let optionsKTU = {
    max_value: 5,
    step_size: 1,
    cursor: 'cursor',
    ajax_method: 'POST',
    url: '/action/voting',
    additional_data: {fraction: 'ktu'}
}
let optionsBTINS = {
    max_value: 5,
    step_size: 1,
    cursor: 'cursor',
    ajax_method: 'POST',
    url: '/action/voting',
    additional_data: {fraction: 'btins'}
}
let optionsFTMI = {
    max_value: 5,
    step_size: 1,
    cursor: 'cursor',
    ajax_method: 'POST',
    url: '/action/voting',
    additional_data: {fraction: 'ftmi'}
}
$("#voting_mff").rate(optionsMFF);
$("#voting_tint").rate(optionsTINT);
$("#voting_ktu").rate(optionsKTU);
$("#voting_btins").rate(optionsBTINS);
$("#voting_ftmi").rate(optionsFTMI);


let colors = ['#db75fd', '#cb71e8', '#d078ec', '#cc72e8', '#d276ef'];
$("#voting_tint").on("updateSuccess", function(ev, data){
    
    if(data.status==='success'){
        $("#voting_tint").rate('destroy');
        $("#voting_tint").parent().parent().remove();
        $('.btn_vote').show();
        $('.btn_vote > button').text('Сохранено!').css('background-color', colors[4]);
        checkAmount();
    }else{
        alert(data.message);
    }
});
$("#voting_mff").on("updateSuccess", function(ev, data){
    
    if(data.status==='success'){
        $("#voting_mff").rate('destroy');
        $("#voting_mff").parent().parent().remove();
        $('.btn_vote').show();
        $('.btn_vote > button').text('Сохранено!').css('background-color', colors[3]);
        checkAmount();
    }else{
        alert(data.message);
    }
});
$("#voting_btins").on("updateSuccess", function(ev, data){
    
    if(data.status==='success'){
        $("#voting_btins").rate('destroy');
        $("#voting_btins").parent().parent().remove();
        $('.btn_vote').show();
        $('.btn_vote > button').text('Сохранено!').css('background-color', colors[2]);
        checkAmount();
    }else{
        alert(data.message);
    }
});
$("#voting_ktu").on("updateSuccess", function(ev, data){
    
    if(data.status==='success'){
        $("#voting_ktu").rate('destroy');
        $("#voting_ktu").parent().parent().remove();
        $('.btn_vote').show();
        $('.btn_vote > button').text('Сохранено!').css('background-color', colors[1]);
        checkAmount();
    }else{
        alert(data.message);
    }
});
$("#voting_ftmi").on("updateSuccess", function(ev, data){
    
    if(data.status==='success'){
        $("#voting_ftmi").rate('destroy');
        $("#voting_ftmi").parent().parent().remove();
        $('.btn_vote').show();
        $('.btn_vote > button').text('Сохранено!').css('background-color', colors[0]);
        checkAmount();
    }else{
        alert(data.message);
    }
});


function checkAmount(){
    let numItems = $('.field_vote').length;
    if(numItems == 0){
        $('.btn_vote > button').text('Готово!');
        setTimeout(function(){window.location.href = "/home"}, 3000);
    }
}



