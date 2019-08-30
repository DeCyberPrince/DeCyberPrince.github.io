$(document).ready(function(){
    
    //Spoiler
    var title = $(".menu .nameMenu");
    title.click(function(){
        var tileWrapper = $(this).next(".tileWrapper");
        tileWrapper.slideToggle();
    });
});