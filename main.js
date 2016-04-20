ymaps.ready(init);

function init() {
  var myPlacemark,
  //создаем карту
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9
    }, {
      searchControlProvider: 'yandex#search'
    });

  // Создание макета содержимого балуна.
  // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
  // Без экранирования кавычек:)
  BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="mr-wrapper">' +
    '<header class="review-header"><span class="header-adress">{{properties.address}}</span>' +
    '<div class="x-wrapper"><a id = "closeBalloon"href="#"><img src="img/x.png" alt="review-close"></a></div>' +
    '</header>' +
    '<div class="review-list-wrapper">' +
    '<ul id="rl" class="review-list">' +
    '</ul><hr></div>' +
    '<div class="review-form-wrapper">' +
    '<form name="newReview" class="review-add__form"><span class="form-header">Ваш отзыв</span>' +
    '<input type="text" name="name" placeholder="Ваше имя" class="review-add__input">' +
    '<input type="text" name="place" placeholder="Укажите место" class="review-add__input">' +
    '<textarea type="text" name="text" placeholder="Поделитесь впечатлениями" class="review-add__textarea"></textarea><a id="sendReview" href="#" class="review-add__button">Добавить</a>' +
    '</form></div></div></div>');

  // Создаем собственный макет с информацией о выбранном геообъекте.
  var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
    '<span class=ballon_header>{{ properties.balloonContentHeader|raw }}</span>' +
    '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
    '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
  );

  var mapClusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    // Устанавливаем собственный макет.
    clusterBalloonItemContentLayout: customItemContentLayout,
    // Устанавливаем режим открытия балуна. 
    // В данном примере балун никогда не будет открываться в режиме панели.
    clusterBalloonPanelMaxMapArea: 0,
    // Устанавливаем размеры макета контента балуна (в пикселях).
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 130,
    // Устанавливаем максимальное количество элементов в нижней панели на одной странице
    clusterBalloonPagerSize: 5
      // Настройка внешего вида нижней панели.
      // Режим marker рекомендуется использовать с небольшим количеством элементов.
      // clusterBalloonPagerType: 'marker',
      // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
      // clusterBalloonCycling: false,
      // Можно отключить отображение меню навигации.
      // clusterBalloonPagerVisible: false
  });
  myMap.geoObjects.add(mapClusterer);

  // функиця генрирующая ЛИшку отзыва
  function generateReviewMarkup(obj) {
    var li = '<li class = "review-list-item">' +
      '<strong class="reviewer-name">' +
      obj.name +
      ' </strong>' +
      '<span class="review-place">' +
      obj.place +
      ' </span>' +
      '<span class="review-date">' +
      new Date(obj.date).toLocaleDateString() +
      ' </span>' +
      '<span class="review-text">' +
      obj.text +
      '<span></li>';
    return li;
  }

  //посылаем запрос на сервер за уже существующими метками
  var xhr = new XMLHttpRequest();
  var allRequest = JSON.stringify({
    op: "all"
  });
  xhr.open('POST', 'http://localhost:3000');
  xhr.responseType = 'json';
  xhr.send(allRequest);
  xhr.onloadend = function() {
    for (var key in xhr.response) {
      xhr.response[key].forEach(function(i) {
        ymaps.geocode(key, {
          results: 1
        }).then(function(res) {

          var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates();
          // Добавляем первый найденный геообъект на карту.
          myPlacemark = new ymaps.Placemark(coords, {
            address: firstGeoObject.properties.get('name'),
            balloonContentHeader: firstGeoObject.properties.get('name'),
            balloonContentBody: i.name + ' - ' + i.place + ' <br>' + new Date(i.date).toLocaleDateString(),
            balloonContentFooter: i.text
          }, {
            balloonContentLayout: BalloonContentLayout,
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
          });
          //наполняем контеном кластерер

          mapClusterer.add(myPlacemark);
          myPlacemark.events.add('click', function() {
            setTimeout(function() {
              var reviewList = document.getElementById('rl');

              //отправимся на сервер за запросом отзывов по этому адресу

              var xhr = new XMLHttpRequest();
              var adrRequest = JSON.stringify({
                op: "get",
                address: firstGeoObject.getAddressLine()
              });
              xhr.open('POST', "http://localhost:3000");
              xhr.responseType = 'json';
              xhr.send(adrRequest);
              xhr.onloadend = function() {

                for (var i = 0; i < xhr.response.length; i++) {
                  //console.log(xhr.response[i])

                  var li = generateReviewMarkup(xhr.response[i]);
                  reviewList.innerHTML = null;
                  reviewList.innerHTML += li;
                }
              };
            }, 200);
          });
        });

      });

    }
  };

  // Слушаем клик на карте
  myMap.events.add('click', function(e) {
    var coords = e.get('coords');
    //определим адрес клика 
    ymaps.geocode(coords).then(function(res) {
      return new Promise(function(resolve) {
        var firstGeoObject = res.geoObjects.get(0);
        resolve(firstGeoObject);
      });
    }).then(function(firstGeoObject) {
      //создаем метку по определнному адресу
      myPlacemark = new ymaps.Placemark(coords, {
        address: firstGeoObject.properties.get('name')
      }, {
        balloonContentLayout: BalloonContentLayout,
        // Запретим замену обычного балуна на балун-панель.
        // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
        balloonPanelMaxMapArea: 0
      });

      mapClusterer.add(myPlacemark);
      //навешиваем обработчик по клику на метку - чтобы загрузить отзывы
      myPlacemark.events.add('click', function() {
        setTimeout(function() {
          var reviewList = document.getElementById('rl');

          //отправимся на сервер за запросом отзывов по этому адресу

          var xhr = new XMLHttpRequest();
          var adrRequest = JSON.stringify({
            op: "get",
            address: firstGeoObject.getAddressLine()
          });
          xhr.open('POST', "http://localhost:3000");
          xhr.responseType = 'json';
          xhr.send(adrRequest);
          xhr.onloadend = function() {
            for (var i = 0; i < xhr.response.length; i++) {
              //console.log(xhr.response[i])
              var li = generateReviewMarkup(xhr.response[i]);
              reviewList.innerHTML += li;
            }
          };
        }, 200);
      });
      //Добавляем отзыв 
      document.addEventListener('click', function(e) {
        if (e.target.id == 'sendReview') {
          e.preventDefault();
          // Запишем данные формы в переменные
          var name = newReview.name.value,
            place = newReview.place.value,
            text = newReview.text.value,
            date = new Date();
          date = date.toLocaleString();
          //Проверим заполнена ли форма отзыва.
          if (name.length === 0 || place.length === 0 || text.length === 0) {
            alert('Вы не написали отзыв!');
          } else {
            //Если заполнена, отправляем на сервер XHR
            var xhr = new XMLHttpRequest();

            var addRequest = {
              "op": "add",
              "review": {
                "coords": {
                  "x": coords[0],
                  "y": coords[1]
                },
                "address": firstGeoObject.getAddressLine(),
                "name": name,
                "place": place,
                "text": text,
                "date": Date.now()
              }
            };
            addRequest = JSON.stringify(addRequest);
            xhr.open('POST', 'http://localhost:3000');
            xhr.send(addRequest);
            var reviewList = document.getElementById('rl');
            var li = generateReviewMarkup(JSON.parse(addRequest).review);
            reviewList.innerHTML += li;
            alert('Ваш отзыв успешно добавлен!');
          }
        }
      });
    });
  });
}
