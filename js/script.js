ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.756810, 37.642994],
        zoom: 14,
        controls: []
    });

    var markersData = [
        {   
            id: 'marker1',
            coords: [55.752953, 37.641449],
            content: 'Хостел на Земле имени Кленова Владислава',
            rubles: '22 000 ₽',
            reviews: '4 отзыва',
            rating: '3.2',
            image: './pics/marker_hotel.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 3*'
        },
        {
            id: 'marker2',
            coords: [55.752859, 37.643474],
            content: 'Хостел на Меркурии',
            rubles: '122 000 ₽',
            reviews: '121 отзыв',
            rating: '4.9',
            image: './pics/hotel.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 2*'
        },
        {
            id: 'marker3',
            coords: [55.749656, 37.641003],
            content: 'Хостел на Венере',
            rubles: '22 000 ₽',
            reviews: '4 отзыва',
            rating: '3.2',
            image: './pics/hotel2.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 3*'
        },
        {
            id: 'marker4',
            coords: [55.748807, 37.638287],
            content: 'Хостел на Юпитере',
            rubles: '9 000 ₽',
            reviews: '4 отзыва',
            rating: '3.2',
            image: './pics/hotel3.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 3*'
        },
        {
            id: 'marker5',
            coords: [55.750800, 37.636651],
            content: 'Отель на Сатурне',
            rubles: '132 000 ₽',
            reviews: '4 отзыва',
            rating: '3.2',
            image: './pics/hotel5.svg',
            people: 'За 5 ночей и 2 гостя',
            about: 'Гостиница 3*'
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
        let ratingClass = content.rating >= 4.0 ? 'high' : 'low';
        return ymaps.templateLayoutFactory.createClass(`
            <div class="custom-balloon">
                <img src="${content.image}">
                <div class="content">
                    <div class="about">${content.about}</div>
                    <div class="header">${content.content}</div>
                    <div class="rating__reviews">
                        <div class="rating ${ratingClass}">${content.rating}</div>
                        <div class="reviews"> ${content.reviews}</div>
                    </div>
                    <div class="people">${content.people}</div>
                    <div class="rubles">${content.rubles}</div>
                </div>
            </div>
        `);
    };

    var currentPlacemark = null;
    var placemarks = {};
    
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
        placemarks[marker.id] = placemark;
        myMap.geoObjects.add(placemark);

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

    document.querySelectorAll('.show_on_map').forEach(function(button) {
        button.addEventListener('click', function() {
            var markerId = this.getAttribute('data-marker-id');
            var placemark = placemarks[markerId];

            if (placemark) {
                if (currentPlacemark && currentPlacemark === placemark && placemark.balloon.isOpen()) {
                    currentPlacemark.options.set('iconImageHref', './pics/marker.svg');
                    currentPlacemark.balloon.close();
                    currentPlacemark.isClicked = false;
                    currentPlacemark = null;
                } else {
                    if (currentPlacemark && currentPlacemark !== placemark) {
                        currentPlacemark.options.set('iconImageHref', './pics/marker.svg');
                        currentPlacemark.balloon.close();
                        currentPlacemark.isClicked = false;
                    }

                    placemark.balloon.open();
                    placemark.options.set('iconImageHref', './pics/marker_onclick.svg');
                    placemark.isClicked = true;
                    currentPlacemark = placemark;
                }
            }
        });
    });

}

var currentSlide = {
    slider1: 1,
    slider2: 1,
    slider3: 1,
    slider4: 1,
    slider5: 1
  };

function showSlide(slideNumber, sliderId, dotsId) {
    var slider = document.getElementById(sliderId);
    var slides = slider.getElementsByClassName('slide');
    var dots = document.getElementById(dotsId).getElementsByClassName('dot');
  
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    slides[slideNumber - 1].classList.add('active');

    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[slideNumber - 1].classList.add('active');
  
    currentSlide[sliderId] = slideNumber;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    showSlide(1, 'slider1', 'dots1');
    showSlide(1, 'slider2', 'dots2');
    showSlide(1, 'slider3', 'dots3');
    showSlide(1, 'slider4', 'dots4');
    showSlide(1, 'slider5', 'dots5');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var badge = document.querySelector('.badge');
    var favoriteItems = document.querySelectorAll('.favorite_hotel img');
    
    function updateBadgeVisibility() {
        var count = parseInt(badge.textContent);
        if (count > 0) {
            badge.style.display = 'flex'; 
        } else {
            badge.style.display = 'none'; 
        }
    }

    favoriteItems.forEach(function (favoriteImage) {
        favoriteImage.addEventListener('click', function () {
            var count = parseInt(badge.textContent);
            
            if (favoriteImage.classList.contains('favorite')) {
                favoriteImage.classList.remove('favorite');
                badge.textContent = count - 1;
            } else {
                favoriteImage.classList.add('favorite');
                badge.textContent = count + 1;
            }

            updateBadgeVisibility();
        });
    });

    updateBadgeVisibility();
});

document.addEventListener('DOMContentLoaded', function () {
    var timeDisplay = document.querySelector('.time-clock p');

    var initialTime = timeDisplay.textContent.trim();
    var [initialHours, initialMinutes] = initialTime.split(':').map(Number);

    var hours = initialHours;
    var minutes = initialMinutes;

    function updateTime() {
        if (minutes === 0) {
            if (hours === 0) {
                clearInterval(timerInterval);
                return;
            }
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }

        var formattedHours = String(hours).padStart(2, '0');
        var formattedMinutes = String(minutes).padStart(2, '0');

        timeDisplay.textContent = `${formattedHours}:${formattedMinutes}`;
    }

    var timerInterval = setInterval(updateTime, 60000);
});

document.addEventListener('DOMContentLoaded', function () {
    var timeDisplay = document.querySelector('.time-clock2 p');

    var initialTime = timeDisplay.textContent.trim();
    var [initialHours, initialMinutes] = initialTime.split(':').map(Number);

    var hours = initialHours;
    var minutes = initialMinutes;

    function updateTime() {
        if (minutes === 0) {
            if (hours === 0) {
                clearInterval(timerInterval);
                return;
            }
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }

        var formattedHours = String(hours).padStart(2, '0');
        var formattedMinutes = String(minutes).padStart(2, '0');

        timeDisplay.textContent = `${formattedHours}:${formattedMinutes}`;
    }

    var timerInterval = setInterval(updateTime, 60000);
});

const pullout = document.querySelector('.pullout');
const line = document.querySelector('.line');

let isPanelOpen = false;

function togglePullout() {
    if (isPanelOpen) {
        pullout.classList.remove('open');
    } else {
        pullout.classList.add('open');
    }
    isPanelOpen = !isPanelOpen;
}

let touchStartY = 0;
let touchEndY = 0;

line.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

line.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;

    if (touchEndY < touchStartY) {
        if (!isPanelOpen) {
            togglePullout();
        }
    } else if (touchEndY > touchStartY) {
        if (isPanelOpen) {
            togglePullout();
        }
    }
});



