ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.756810, 37.642994],
        zoom: 14,
        controls: []
    });

    var markersData = [
        {
            coords: [55.752953, 37.641449],
            content: 'Отель на Земле имени Кленова Владислава',
            price: '6 000 ₽',
            reviews: '121 отзыв',
            rating: '4.9',
            image: './pics/marker_hotel.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 3*',
            openByDefault: true
        },
        {
            coords: [55.752859, 37.643474],
        },
        {
            coords: [55.749656, 37.641003],
        },
        {
            coords: [55.748807, 37.638287],
        },
        {
            coords: [55.750800, 37.636651],
        },
        {
            coords: [55.752516, 37.635735],
        },
        {
            coords: [55.752147, 37.649347],
        },
        {
            coords: [55.754777, 37.640589],
        },
        {
            coords: [55.759873, 37.639781],
        },
        {
            coords: [55.757266, 37.641521],
        },
        {
            coords: [55.756916, 37.646510],
        },
        {
            coords: [55.754494, 37.636171],
        },
        {
            coords: [55.757902, 37.631241],
        }
    ];

    var createBalloonLayout = function (content) {
        return ymaps.templateLayoutFactory.createClass(`
            <div class="custom-balloon">
                <img src="${content.image}">
                <div class="content">
                    <div class="about">${content.about}</div>
                    <div class="header">${content.content}</div>
                    <div class="rating__reviews"><div class="rating">${content.rating}</div><div class="reviews"> ${content.reviews}</div></div>
                    <div class="people">${content.people}</div>
                    <div class="price">${content.price}</div>
                </div>
            </div>
        `);
    };

    var currentPlacemark = null;
    
    markersData.forEach(function(marker) {
        var BalloonContentLayout = createBalloonLayout(marker);

        var placemark = new ymaps.Placemark(marker.coords, {}, {
            iconLayout: 'default#image',
            iconImageHref: './pics/marker.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [-10, -10],
            balloonContentLayout: BalloonContentLayout,
            hideIconOnBalloonOpen: false,
            balloonPanelMaxMapArea: 0,
            balloonOffset: [-100, 0]
        });
        
        myMap.geoObjects.add(placemark);

        if (marker.openByDefault) {
            placemark.balloon.open();
            currentPlacemark = placemark;
            placemark.isClicked = true;
            placemark.options.set('iconImageHref', './pics/marker_onclick.svg');
        }

        placemark.events.add('balloonopen', function () {
            if (currentPlacemark && currentPlacemark !== placemark) {
                currentPlacemark.options.set('iconImageHref', './pics/marker.svg');
                currentPlacemark.balloon.close();
                currentPlacemark.isClicked = false;
            }

            placemark.options.set('iconImageHref', './pics/marker_onclick.svg');
            placemark.isClicked = true;
            currentPlacemark = placemark;
        });

        placemark.events.add('balloonclose', function () {
            placemark.options.set('iconImageHref', './pics/marker.svg');
            placemark.isClicked = false;
        });

    });
}
