/*ymaps.ready(init);

function init() {
    var myPlacemark,
      mapCenter = [55.753994, 37.622093],
        myMap = new ymaps.Map('map', {
            center: mapCenter,
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconContent: 'поиск...'
        }, {
            preset: 'islands#violetStretchyIcon',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование)
    function getAddress(coords) {
        myPlacemark.properties.set('iconContent', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    iconContent: firstGeoObject.properties.get('name'),
                    balloonContent: firstGeoObject.properties.get('text')
                });
        });
    }

      // Создаем собственный макет с информацией о выбранном геообъекте.
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    var clusterer = new ymaps.Clusterer({
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

    // Заполняем кластер геообъектами со случайными позициями.
    var placemarks = [];
    for (var i = 0, l = 100; i < l; i++) {
        var placemark = new ymaps.Placemark(getRandomPosition(), {
            // Устаналиваем данные, которые будут отображаться в балуне.
            balloonContentHeader: 'Метка №' + (i + 1),
            balloonContentBody: getContentBody(i),
            balloonContentFooter: 'Мацуо Басё'
        });
        placemarks.push(placemark);
    }

    clusterer.add(placemarks);
    myMap.geoObjects.add(clusterer);


    function getRandomPosition () {
        return [
            mapCenter[0] + (Math.random() * 0.3 - 0.15),
            mapCenter[1] + (Math.random() * 0.5 - 0.25)
        ];
    }

    var placemarkBodies;
    function getContentBody (num) {
        if (!placemarkBodies) {
            placemarkBodies = [
                ['Слово скажу -', 'Леденеют губы.', 'Осенний вихрь!'].join('<br/>'),
                ['Вновь встают с земли', 'Опущенные дождем', 'Хризантем цветы.'].join('<br/>'),
                ['Ты свечу зажег.', 'Словно молнии проблеск,', 'В ладонях возник.'].join('<br/>')
            ];
        }
        return '<br>' + placemarkBodies[num % placemarkBodies.length];
    }
    clusterer.balloon.open(clusterer.getClusters()[0]);


}

*/

var response = {
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


/*var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
var context = {title: "My New Post", body: "This is my first post!"};
var html    = template(context);

rl.innerHTML = html;*/

 var formData = new FormData(document.forms.newReview);
 var allRevs = {op: "all"};


sendd.addEventListener('click', function(e){

  e.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET',"http://localhost:3000");
  xhr.send(allRevs);
});








