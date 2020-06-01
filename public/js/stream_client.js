
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




