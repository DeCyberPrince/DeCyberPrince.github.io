$(document).ready(function(){
    $('#preloader').delay(2000).fadeOut(300);
    var headerH = parseFloat($('header').css('height'));
    var avatar = $('.avatar');
    var label = $('.name');
    var bg = $('.pic');
    $(window).scroll(function(){
        var pos = $(window).scrollTop();
        var per = Math.round((pos / headerH) * 100);
        var lim;
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            lim = 30;
        } else {
            lim = 47;
        }
        if (per < lim) {
            avatar.css('transform', 'translateY(' + per + 'vh' + ')');
            label.css('transform', 'translateY(' + per + 'vh' + ')');
            label.css('opacity', per / 30);
            avatar.css('border', per / 6 + 'px solid #fff');
            avatar.css('box-shadow',  'inset 0 0 ' + per + 'px #fff');
            bg.css('filter', 'blur(' + per / 3 + 'px)');
        } else {
            label.css('opacity', 1);
        }
    });
    var avC = 1;
    avatar.click(function(){
        $(this).css('background', 'url(\'../pics/avatars/' + avC + '.jpg\') center');
        $(this).css('background-size', 'cover');
        if (avC >= 10) {
            avC = 1;
        } else {
            avC++;
        }
    });
});