//@prepros-prepend JS/hbs-templates.js
//@prepros-prepend JS/yandex-maps.js





/*var response = {
    "op": "add",
    "review": {
        "coords": {"x": 55.76048396289834, "y": 37.58335174560545},
        "address": "Россия, Москва, Большая Грузинская улица, 8с36",
        "name": "Сергей",
        "place": "Шоколадница",
        "text": "Кругом зомби!!!!",
        "date": "2016.04.09 22:32:00"
    }
};
 var adrRequest = {op: "get", address: "Россия, Москва, Большая Грузинская улица, 8с36"};


*/





/*sendReview.addEventListener('click', function(e){
  e.preventDefault();
  // Запишем данные формы в переменные
  var name = newReview.name.value,
  place = newReview.place.value,
  text = newReview.text.value,
  date = new Date();
  date = date.toLocaleString();
//Проверим заполнена ли форма отзыва.
if(name.length === 0 || place.length === 0 || text.length === 0){  
  alert('Вы не написали отзыв!');
} else {
  //Если заполнена, отправляем на сервер XHR
  var xhr = new XMLHttpRequest();

var addRequest = {
    "op": "add",
    "review": {
        "coords": {"x": 55.76048396289834, "y": 37.58335174560545},
        "address": "Россия, Москва, Большая Грузинская улица, 8с36",
        "name": name,
        "place": place,
        "text": text,
        "date": date
    }
};

}
});*/
/*//Наносим все существующие отзывы
  var p = new Promise(function(resolve, reject) {
    //запрашиваем все добавленные отзывы
    var request = JSON.stringify({
      op: 'all'
    });
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000');
    xhr.responseType = 'json';
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.send(request);
  }).then(function(response) {

    for (var key in response) {
      ymaps.geocode(key)
        .then(function(res) {
      for (var i = 0; i < response[key].length; i++) {

      //перебираем результат ответа от сервера
          var geoObject = res.geoObjects.get(i);
          var address = geoObject.properties.get('name') + ", " + geoObject.properties.get('description');

          // Добавляем первый найденный геообъект на карту.
          myMap.geoObjects.add(geoObject);
      //запишем полученные данные отзывов в переменные
      var reviewerName = response[key][i].name;
      var reviewPlace = response[key][i].place;
      var reviewText = response[key][i].text;
      var reviewDate = new Date(response[key][i].date).toLocaleDateString();
    }
          
        });
    }


  });

   // Создание макета содержимого балуна.
        // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            "<div class=\"mr-wrapper\">" +
        "<header class=\"review-header\"><span class=\"header-adress\">Выберите друзей</span>" +
        "<div class=\"x-wrapper\"><a href=\"#\"><img src=\"img/x.png\" alt=\"review-close\"></a></div>" +
        "</header>" +
        "<div class=\"review-list-wrapper\">" +
        "<ul id=\"rl\" class=\"review-list\">" +
        "<script id=\"review-list\" type=\"text/x-handlebars-template\">" +
        "{{#each this}}" +
        "<li class = \"review-list-item\">" +
        "<strong class=\"reviewer-name\">" +
        "{{name}}" +
        "</strong>" +
        "<span class=\"review-place\">" +
        "{{place}}" +
        "</span>" +
        "<span class=\"review-date\">" +
        "{{date}}" +
        "</span>" +
        "<span class=\"review-text\">" +
        "{{text}}" +
        "</span></li>" +
        "{{/each}}" +
        "</script>" +
        "<li class=\"review-list-item\"><strong class=\"reviewer-name\">svetlana </strong><span class=\"review-place\">Шоколадница </span><span class=\"review-date\">13.12.2015</span><span class=\"review-text\">Очень хорошее место!</span></li>" +
        "<li class=\"review-list-item\"><strong class=\"reviewer-name\">svetlana </strong><span class=\"review-place\">Шоколадница </span><span class=\"review-date\">13.12.2015</span><span class=\"review-text\">Очень хорошее место!</span></li>" +
        "</ul><hr></div>", {

            // Переопределяем функцию build, чтобы при создании макета начинать
            // слушать событие click на кнопке-счетчике.
            build: function () {
                // Сначала вызываем метод build родительского класса.
                BalloonContentLayout.superclass.build.call(this);
                // А затем выполняем дополнительные действия.

            }
        });

    var placemark = new ymaps.Placemark([55.650625, 37.62708], {
            name: 'Считаем'
        }, {
            balloonContentLayout: BalloonContentLayout,
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
        });

  // Слушаем клик на карте
  myMap.events.add('click', function(e) {
      var coords = e.get('coords');*/








// Добавляем отзыв
  /*document.addEventListener('click', function(e){

    console.log(e.target.id)
    if(e.target.id == 'sendReview'){
  e.preventDefault();
  // Запишем данные формы в переменные
  var name = newReview.name.value,
  place = newReview.place.value,
  text = newReview.text.value,
  date = new Date();
  date = date.toLocaleString();
//Проверим заполнена ли форма отзыва.
if(name.length === 0 || place.length === 0 || text.length === 0){  
  alert('Вы не написали отзыв!');
} else {
  //Если заполнена, отправляем на сервер XHR
  var xhr = new XMLHttpRequest();

var addRequest = {
    "op": "add",
    "review": {
        "coords": {"x": 55.76048396289834, "y": 37.58335174560545},
        "address": "Россия, Москва, Большая Грузинская улица, 8с36",
        "name": name,
        "place": place,
        "text": text,
        "date": Date.now()
    }
};
addRequest = JSON.stringify(addRequest)
    xhr.open('POST', 'http://localhost:3000');
    xhr.send(addRequest)
}
}
});*/

/*------------ ЗАГОТОВКА ДЛЯ ФОРМЫ добавления отзывовов -------------*/

/*var adrRequest = {op: "get", address: "Россия, Москва, Большая Грузинская улица, 8с36"};
var allRevs = JSON.stringify(adrRequest);

var response1 = {};

  var xhr = new XMLHttpRequest();
  xhr.open('POST',"http://localhost:3000");
  xhr.send(allRevs);
  
xhr.onload = function (){
  response = JSON.parse(xhr.response);
  //Преобразем дату в удобный формат
  for (var i= 0; i<response.length; i++){ 
    response[i].date = new Date(response[i].date);
    response[i].date = response[i].date.toLocaleDateString();
  }
  var source   = document.getElementById("review-list").innerHTML;
  var template = Handlebars.compile(source);
  var html    = template(response);
  rl.innerHTML = html;
};*/





