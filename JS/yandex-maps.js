ymaps.ready(init);

var myBaloonContent =         "<div class=\"mr-wrapper\">" +
          "<header class=\"review-header\"><span class=\"header-adress\">Выберите друзей</span>" +
            "<div class=\"x-wrapper\"><a href=\"#\"><img src=\"img/x.png\" alt=\"review-close\"></a></div>" +
          "</header>" +
          "<div class=\"review-list-wrapper\">" +
            "<ul id=\"rl\" class=\"review-list\">" +
            "<script id=\"review-list\" type=\"text/x-handlebars-template\">" +
              "<li class = \"review-list-item\">" +
                "<strong class=\"reviewer-name\">" +
               //   "{{name}}" +
                "</strong>" +
                "<span class=\"review-place\">" +
                //  "{{place}}" +
                "</span>" +
                "<span class=\"review-date\">" +
                 // "{{date}}" +
                "</span>" +
                "<span class=\"review-text\">" +
                  //"{{text}}" +
                "</span></li>" +
              "</script>" +
        "</ul><hr></div>";

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
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
              "<li class = \"review-list-item\">" +
                "<strong class=\"reviewer-name\">" +
                "{{properties.name}}" +
                "</strong>" +
                "<span class=\"review-place\">" +
                //  "{{place}}" +
                "</span>" +
                "<span class=\"review-date\">" +
                 // "{{date}}" +
                "</span>" +
                "<span class=\"review-text\">" +
                  //"{{text}}" +
                "</span></li>" +
              "</script>" +
        "</ul><hr></div>", {

            // Переопределяем функцию build, чтобы при создании макета начинать
            // слушать событие click на кнопке-счетчике.
            build: function () {
                // Сначала вызываем метод build родительского класса.
                BalloonContentLayout.superclass.build.call(this);
                // А затем выполняем дополнительные действия.
                var closeBaloon = document.getElementById('closeBaloon');
                function baloonCloser (e){
                  /*
                  * TODO - закрытие балуна
                  */
                  e.preventDefault();
                }
                closeBaloon.addEventListener('click', baloonCloser(e));
            },

            // Аналогично переопределяем функцию clear, чтобы снять
            // прослушивание клика при удалении макета с карты.
            clear: function () {
                // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                // а потом вызываем метод clear родительского класса.
                closeBaloon.removeEventListener('click', baloonCloser(e));
                BalloonContentLayout.superclass.clear.call(this);
            },

            onCounterClick: function () {
/*                $('#count').html(++counter);
                if (counter == 5) {
                    alert('Вы славно потрудились.');
                    counter = 0;
                    $('#count').html(counter);
                }*/
            }
        });



    // Слушаем клик на карте
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
            myPlacemark = new ymaps.Placemark(coords, {
            name: 'Считаем'
        }, {
            balloonContentLayout: BalloonContentLayout,
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
        });

            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
       // getAddress(coords);
    });


    // Определяем адрес по координатам (обратное геокодирование)
    function getAddress(coords) {
        myPlacemark.properties.set('iconContent', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    balloonContentLayout: BalloonContentLayout,
                    balloonContent: firstGeoObject.properties.get('text')
                });
        });
    }
}