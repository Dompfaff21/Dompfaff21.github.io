angular.module('tableApp', [])
.controller('HobbyCtrl', function ($scope){
		$scope.persons = [
		{"number": "1", "name": "Карпов Илья", "age":"18"},
		{"number": "2", "name": "Миронов Никита", "age":"18"},
		{"number": "3", "name": "Бурундуков Владислав", "age":"19"},
		{"number": "4", "name": "Санин Артем", "age":"18"},
		{"number": "5", "name": "Горбунов Владимир", "age":"18"},
		{"number": "6", "name": "Бирюков Илья", "age":"18"},
		{"number": "7", "name": "Мишукова Элина", "age":"19"},
		{"number": "8", "name": "Марченко Никита", "age":"19"},
		{"number": "9", "name": "Трухачева Мария", "age":"18"},
		{"number": "10", "name": "Сильвестрова Ксения", "age":"18"},
		{"number": "11", "name": "Грехов Владислав", "age":"18"},
		{"number": "12", "name": "Жилкин Артем", "age":"19"},
		{"number": "13", "name": "Артемьев Глеб", "age":"18"},
		{"number": "14", "name": "Поляков Дмитрий", "age":"18"},
		{"number": "15", "name": "Климовская Кристина", "age":"19"},
		{"number": "16", "name": "Сабадаш Алина", "age":"19"},
		{"number": "17", "name": "Ушакова Вероника", "age":"18"},
		{"number": "18", "name": "Галкина Александра", "age":"18"},
		{"number": "19", "name": "Нефедова Екатерина", "age":"18"},
		{"number": "20", "name": "Пономарев Сергей", "age":"18"},
		{"number": "21", "name": "Ефимова Юлия", "age":"18"},
		{"number": "22", "name": "Колотилин Кирилл", "age":"18"},
		{"number": "23", "name": "Ковальчук Татьяна", "age":"18"},
		{"number": "24", "name": "Гриднев Вадим", "age":"18"},
		{"number": "25", "name": "Майстров Андрей", "age":"18"},
		{"number": "26", "name": "Гаврилов Данил", "age":"18"},
		{"number": "27", "name": "Рыбин Кирилл", "age":"18"},
		{"number": "28", "name": "Ломов Никита", "age":"18"},
		{"number": "29", "name": "Роор Иван", "age":"18"},
		{"number": "30", "name": "Шиндер Марк", "age":"18"},
		{"number": "31", "name": "Шиндер Ян", "age":"18"}
		];
});

setInterval(function()  {
  if (currentSlide === 3) {
    showSlide(1);
  } else {
    showSlide(currentSlide + 1);
  }
}, 10000);


var currentSlide = 1;
showSlide(currentSlide);

function showSlide(slideNumber) {
  var slides = document.querySelectorAll('.slider__images img');
  var dots = document.querySelectorAll('.slider__dots .dot');
  
  // Скрываем все фотографии, кроме выбранной
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[slideNumber - 1].classList.add('active');
  
  // Выделяем текущую точку
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[slideNumber - 1].classList.add('active');
  
  currentSlide = slideNumber;
}

function prevSlide() {
  if (currentSlide === 1) {
    showSlide(3);
  } else {
    showSlide(currentSlide - 1);
  }
}

function nextSlide() {
  if (currentSlide === 3) {
    showSlide(1);
  } else {
    showSlide(currentSlide + 1);
  }
};


function checkAnswers() {
   var q1 = document.querySelector('input[name="q1"]:checked').value;
   var q2 = document.querySelector('input[name="q2"]:checked').value;
   var q3 = document.querySelector('input[name="q3"]:checked').value;
   var q4 = document.querySelector('input[name="q4"]:checked').value;
   var q5 = document.querySelector('input[name="q5"]:checked').value;

   var correctAnswers = 0;

   if (q1 === "a") {
    correctAnswers++;
   }

   if (q2 === "c") {
    correctAnswers++;
   }

   if (q3 === "c") {
    correctAnswers++;
   }

   if (q4 === "c") {
    correctAnswers++;
   }

   if (q5 === "a") {
    correctAnswers++;
   }

   document.getElementById("result").innerHTML = "Вы ответили правильно на " + correctAnswers + " вопросов из 5.";
  };