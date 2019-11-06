let app = angular.module('testApp', ['ngRoute', 'ngMask']);
let wikiPage = 'JavaScript';

app.config(function($routeProvider){
    $routeProvider
        .when('/', { templateUrl: '../pages/root.html', controller: 'rootCtrl as root' })
        .when('/text', { templateUrl: '../pages/text.html', controller: 'textCtrl as text' })
        .when('/table', { templateUrl: '../pages/table.html', controller: 'tableCtrl as table' })
        .when('/form', { templateUrl: '../pages/form.html', controller: 'formCtrl as form' })
        .otherwise({templateUrl: '../pages/404.html', controller: 'notfoundCtrl as notfound' })
});

app.controller('textCtrl', function($http, headerFactory){
    headerFactory.path = 'Текст';
    headerFactory.icon = 'text';
    //$http.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=${wikiPage}&format=json`)
    $http.get(`https://ru.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${wikiPage}`)
    .then(response => {
        let pageId = Object.keys(response.data.query.pages)[0];
        return response.data.query.pages[pageId];
    })
    .then(data => {
        this.title = data.title;
        return data;
    })
    .then(content => {
        const wrapper = document.getElementById('textContent');
        wrapper.innerHTML = content.extract;
        this.paragraphs = document.querySelectorAll('p');
        wrapper.hidden = true;
        return content.pageid;
    })
    .then(pageId => {
        $http.get(`https://ru.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=info&pageids=${pageId}&inprop=url`)
        .then(response =>  response.data.query.pages[pageId] )
        .then(data => {
            this.fullUrl = data.fullurl;
        })
    })
});

app.controller('tableCtrl', function(headerFactory){
    headerFactory.path = 'Таблица';
    headerFactory.icon = 'table';
    this.data = [
        {"id":1,"name":"One","audio":"http://dl2.mp3party.net/online/4396927.mp3","date":"1550122468"},
        {"id":2,"name":"Two","audio":"http://dl2.mp3party.net/online/8427523.mp3","date":"1550122568"},
        {"id":3,"name":"Three","audio":"http://dl2.mp3party.net/online/53679.mp3","date":"1550122668"},
        {"id":4,"name":"Four","audio":"http://dl2.mp3party.net/online/8502345.mp3","date":"1550122768"},
        {"id":5,"name":"Five","audio":"http://dl2.mp3party.net/online/8527609.mp3","date":"1550122868"},
        {"id":6,"name":"Six","audio":"http://dl2.mp3party.net/online/8511076.mp3","date":"1550122968"},
        {"id":7,"name":"Seven","audio":"http://dl2.mp3party.net/online/6185757.mp3","date":"1550123468"},
        {"id":8,"name":"Eight","audio":"http://dl2.mp3party.net/online/7416402.mp3","date":"1550123568"},
        {"id":9,"name":"Nine","audio":"http://dl2.mp3party.net/online/8483169.mp3","date":"1550126368"}, 
        {"id":10,"name":"Ten","audio":"http://dl2.mp3party.net/online/112547.mp3","date":"1550122668"}];
});

app.controller('formCtrl', function(headerFactory){
    headerFactory.path = 'Форма';
    headerFactory.icon = 'form';
    this.persons = [];
    this.addPerson = function() {
        this.persons.push({name: this.newName, phone: this.newPhone, text: this.newText});
        [this.newName, this.newPhone, this.newText] = ['', '', ''];
        
    };
    this.removePerson = function(name, phone) {
        this.persons = this.persons.filter( elem => {
            return elem.name !== name || elem.phone !== phone;
        });
    };
});

app.controller('headCtrl', function(headerFactory){
    this.getPath = function() {
        return headerFactory.path;
    }
    this.getIcon = function() {
        return `icons/${headerFactory.icon}/favicon.ico`;
    }
});

app.controller('rootCtrl', function(headerFactory){
    headerFactory.path = 'Меню';
    headerFactory.icon = 'menu';
});

app.controller('notfoundCtrl', function(headerFactory){
    headerFactory.path = '404 Страница не найдена';
    headerFactory.icon = '404';
});

app.filter('humanDate', function(){
    return function(date) {
        humanDate = new Date(parseFloat(date));
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Отябрь', 'Ноябрь', 'Декабрь' ];
        humanDate = `${months[humanDate.getUTCMonth()]},${humanDate.getUTCDate()} ${humanDate.getUTCHours()}:${humanDate.getUTCMinutes()}:${humanDate.getUTCSeconds()}(${humanDate.getUTCMilliseconds()}) ${humanDate.getUTCFullYear()}г.`;
        return humanDate;
    }
});

app.factory('headerFactory', function(){
    return {
        path: '/',
        icon: '_'
    }
});







