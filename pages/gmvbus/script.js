var timePerm = ['06:00','06:30','06:50','07:10','07:25','07:45','08:05','08:20','08:50','09:10','09:40','10:00','10:20','11:00','11:30','12:00','12:30','13:05','13:30','13:45','14:00','14:20','14:50','15:20','15:55','16:30','16:50','17:10','17:30','17:50','18:20','18:45','19:00','19:25','19:45','20:00','20:30','21:20','21:50'];
var timePermWeekend = ['06:00','06:50','07:25','08:05','08:20','09:10','09:40','10:20','11:30','12:30','13:05','13:45','14:00','15:20','15:55','16:30','17:10','17:50','18:20','19:00','19:45','20:30','21:20','21:50'];
var timeGamovo = ['06:00','06:20','06:40','07:00','07:30','07:50','08:10','08:30','08:50','09:10','09:30','10:00','10:30','11:00','11:20','11:40','12:00','12:30','13:00','13:30','14:00','14:30','14:50','15:20','15:35','15:50','16:30','17:00','17:30','18:00','18:30','18:50','19:10','19:40','20:10','20:30','21:00','21:30','22:00у','22:35у'];
var timeGamovoWeekend = ['06:40','07:00','07:50','08:30','09:10','09:30','10:30','11:00','11:40','12:30','13:30','14:00','14:50','15:35','16:30','17:00','17:30','18:30','19:10','19:40','20:30','21:00','21:30','22:00у','22:35у'];
var myTime, myHours, myMins, myDay;

myTime = new Date(); myHours = myTime.getHours(); myMins = myTime.getMinutes(); myDay = myTime.getDay();
if (myHours < 10) {myHours = '0' + myHours;} 
if (myMins < 10) {myMins = '0' + myMins;}
myTime = myHours + ':' + myMins;

function createBoxes(timeLine){
  $('main').empty();
  for (i = 0; i < timeLine.length; i++) {
    var box = '<div class="box">'+timeLine[i]+'</div>';
    $('main').append(box);
  }
}

function makeAviable(timeLine, timeLineWeekend) {
  var weekendTime = [];
  for (i = 0; i < timeLineWeekend.length; i++) {
    weekendTime.push(timeLine.indexOf(timeLineWeekend[i]));
    $('.box:eq('+weekendTime[i]+')').addClass('aviable');
  }
}

function markSoonest(timeLine) {
  var index = 0;
  while (myTime >= timeLine[index]) {index++;}
  $('.aviable:eq('+(index-1)+')').addClass('last');
  $('.aviable:eq('+index+')').addClass('soonest');
  $('.aviable:eq('+(index+1)+')').addClass('next');
  $('.aviable:eq('+(index+2)+')').addClass('after');
}

$('header').change(function(){
  var dir = $('input:checked').val();
  var weekend = $('#weekend').prop('checked');
  
  if (dir === 'perm') {createBoxes(timePerm);}
  if (dir === 'gamovo') {createBoxes(timeGamovo);}

  if (weekend === true && dir === 'perm') {makeAviable(timePerm, timePermWeekend);} 
  if (weekend === false && dir === 'perm') {makeAviable(timePerm, timePerm);}
  if (weekend === true && dir === 'gamovo') {makeAviable(timeGamovo, timeGamovoWeekend);} 
  if (weekend === false && dir === 'gamovo') {makeAviable(timeGamovo, timeGamovo);}

  if (weekend === true && dir === 'perm') {markSoonest(timePermWeekend);} 
  if (weekend === false && dir === 'perm') {markSoonest(timePerm);}
  if (weekend === true && dir === 'gamovo') {markSoonest(timeGamovoWeekend);} 
  if (weekend === false && dir === 'gamovo') {markSoonest(timeGamovo);}  
});

if (myDay === 0 || myDay === 6) {$( "#weekend" ).prop( "checked", true);}
else {$( "#weekend" ).prop( "checked", false);}

if (myDay === 0 || myDay === 6) {
  createBoxes(timePerm);
  makeAviable(timePerm, timePermWeekend);
  markSoonest(timePermWeekend);
} else {
  createBoxes(timePerm);
  makeAviable(timePerm, timePerm);
  markSoonest(timePerm);
}