//SIDEMENU

var showSidemenu = false;
$('.blackout').hide();

$('header').change(function () {
  if (showSidemenu == false) {
    $('aside').css('left', '0');
    //$('main').css('background' , '#018585');
    $('main').css('margin-top', '10vh');
    $('header').css('border-bottom', '0px solid #00BEBE');
    $('header').addClass('hFixed');
    $('header>label').text('✖');
    $('.blackout').fadeIn();
    showSidemenu = !showSidemenu;
  } else {
    $('aside').css('left', '-80%');
    //$('main').css('background' , '#fff');
    $('main').css('margin-top', '0');
    $('header').css('border-bottom', '4px solid #00BEBE');
    $('header').removeClass('hFixed');
    $('header>label').text('☰');
    $('.blackout').fadeOut();
    showSidemenu = !showSidemenu;
  }
  //console.log(showSidemenu);
});

//SPOILER FOR H1

$('h1').click(function () {
  $(this).parent().children('ul').slideToggle();
  $(this).parent().children('div').slideToggle();
  $(this).parent().toggleClass('closed');
  $(this).toggleClass('title');
  $(this).next('h3').toggleClass('title');
});

//TABS

$('.block>.content>div').hide();
$('.block>.content>div:first-child').show();

var curTab = $('ul>li:first-child');
var prevTab;
$(curTab).addClass('curTab');
$('li').click(function () {
  var curTab = $(this).prop('id');
  var otherTabs = $(this).parent().parent().children('.content').children('div');
  var otherLis = $(this).parent().children();
  if (prevTab == curTab) {
    $(otherTabs).hide();
    $("." + curTab).show();
  } else {
    $(otherTabs).hide();
    $(otherLis).removeClass('curTab');
    $("." + curTab).fadeIn(300);
    $(curTab).addClass('curTab');
  }
  $(this).addClass('curTab');
  //console.log('prevTab = ', prevTab);
  //console.log('curTab = ', curTab);
  prevTab = curTab;
});

//SCROLL A# TO ALGS

var prevPos;
$("a[href^='#']").click(function (a) {
  a.preventDefault();
  prevPos = $(this).offset().top - 200;
  var elem = $($(this).attr("href"));
  var position = $($(this).attr("href")).offset().top - 200;
  $('body, html').animate({
    scrollTop: position
  }, 500);
  elem.parent('.algorithm').addClass('active_alg');
  //console.log(position);
});

//SCROLL IMG TO ALGS

$('.sit, .issue img').click(function () {
  var whereAlg = $(this).attr('data-id');
  var elem = $("#" + whereAlg);
  var elemPos = elem.offset().top - 200;
  prevPos = $(this).offset().top - 200;
  elem.parent('.algorithm').addClass('active_alg');
  $('body, html').animate({
    scrollTop: elemPos
  }, 500);
  //console.log(elemPos);
});

//SCROLL BACK

$('.upButton').click(function (a) {
  a.preventDefault();
  $('body, html').animate({
    scrollTop: prevPos
  }, 500);
});

//SCROLL UP / DOWN

var lastScrollTop = 0;
$(window).scroll(function (event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    //$('.active_alg').removeClass('active_alg');
    //console.log("DOWN");
  } else {
    $('.active_alg').removeClass('active_alg');
    //console.log("UP");
  }
  lastScrollTop = st;
});

//LINKS

$(".box").click(function (id) {
  var id = $(this).prop('id');
  id = id + '.html';
  window.location = id;
  //console.log(id);
});

$('#titleOfPage').click(function () {
  window.location = '../index.html';
});

//FIXES 
$('.s_alg').parent().css('width', '100%');