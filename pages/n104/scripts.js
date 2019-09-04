let timetable = {
    perm: {
        weekday: ['06:00','06:30','06:50','07:10','07:25','07:45','08:05','08:20','08:50','09:10','09:40','10:00','10:20','11:00','11:30','12:00','12:30','13:05','13:30','13:45','14:00','14:20','14:50','15:20','15:55','16:30','16:50','17:10','17:30','17:50','18:20','18:45','19:00','19:25','19:45','20:00','20:30','21:20','21:50'],
        weekend: ['06:00','06:50','07:25','08:05','08:20','09:10','09:40','10:20','11:30','12:30','13:05','13:45','14:00','15:20','15:55','16:30','17:10','17:50','18:20','19:00','19:45','20:30','21:20','21:50'],
        get weekendIndexes() {let arr = [];for (let time of this.weekend) {arr.push(this.weekday.indexOf(time));}return arr;}
    },
    gamovo: {
        weekday: ['06:00','06:20','06:40','07:00','07:30','07:50','08:10','08:30','08:50','09:10','09:30','10:00','10:30','11:00','11:20','11:40','12:00','12:30','13:00','13:30','14:00','14:30','14:50','15:20','15:35','15:50','16:30','17:00','17:30','18:00','18:30','18:50','19:10','19:40','20:10','20:30','21:00','21:30','22:00*','22:35*'],
        weekend: ['06:40','07:00','07:50','08:30','09:10','09:30','10:30','11:00','11:40','12:30','13:30','14:00','14:50','15:35','16:30','17:00','17:30','18:30','19:10','19:40','20:30','21:00','21:30','22:00*','22:35*'],
        get weekendIndexes() {let arr = [];for (let time of this.weekend) {arr.push(this.weekday.indexOf(time));}return arr;}
    }
}
let now = {
    get hours() {if (new Date().getHours() < 10) {return '0' + new Date().getHours()} else {return new Date().getHours()}},
    get minutes() {if (new Date().getMinutes() < 10) {return '0' + new Date().getMinutes()} else {return new Date().getMinutes()}},
    get time() {return this.hours + ':' + this.minutes},
    get day() {return new Date().getDay()},
    get isHoliday() {if (this.day === 6 || this.day === 0) {return true;} else {return false;}}
}

$(document).ready(function(){
    let direction = $('input[type="radio"]:checked').prop("id");
    $('input[type="checkbox"]').prop("checked", now.isHoliday);
    let checkHoliday = $('input[type="checkbox"]').prop("checked");
    createBoxes(timetable[direction].weekday);
    glowAvailable(direction, checkHoliday);
    findSoonest();
    $('.box').on('click', timeMagic);

    $('header').change(function(){
        direction = $('input[type="radio"]:checked').prop("id");
        checkHoliday = $('input[type="checkbox"]').prop("checked");
        createBoxes(timetable[direction].weekday);
        glowAvailable(direction, checkHoliday);
        findSoonest();
        $('.box').on('click', timeMagic);
    });
    
    function glowAvailable(direction, isHoliday) {
        if (isHoliday) {
            for (let box of timetable[direction].weekendIndexes) {
                $(`.box:nth-child(${box + 1})`).addClass('glow');
            }
        } else {
            $('main .box').addClass('glow');
        }
    }
    
    function createBoxes(direction) {
        let main = $('main');
        main.empty();
        for (let time of direction) {
            main.append(`<div class="box">${time}</div>`);
        }
    }

    function findSoonest() {
        for (let box of $('main .glow')) {
            let currentTime = $(box).text();
            if (currentTime >= now.time && $('main .now').length < 1) {
                $(box).addClass('now');
            } else if ($('main .now').length >= 1) {
                break;
            }
        }
    }
    
    function timeMagic() {
        if ($(this).hasClass('transformed')) {
            location.reload();
        } else {
            myTime = now.time.split(':');
            boxTime = $(this).text().split(':');
            boxTime = +boxTime[0] * 60 + +boxTime[1];
            myTime = +myTime[0] * 60 + +myTime[1];
            $(this).text(boxTime - myTime + ' m');
            $(this).addClass('transformed');
        }
    }
});