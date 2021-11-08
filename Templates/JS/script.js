
function page_adaptation(){

	let ratio = window.innerWidth / 1920 < 0.75 ? 0.75 : window.innerWidth / 1920;

	$("body").css({
		"zoom": ratio,
		"-moz-zoom": ratio,
		"width": `${ 1 / ratio * 100}vw`,
		"height": `${ 1 / ratio * 100}vh`
	});
}

$(window).ready(() => page_adaptation());

$(window).resize(() => page_adaptation());


// Закрытие форм при клике вне
$(document).mouseup(function (e) {
	let exceptions = [$(".form-wrapper"), $(".alert"), $(".trigger")]

	if(!(exceptions.filter(exception => exception.has(e.target).length !== 0).length)){
		$(".form").removeClass("active");
		$("body").css("overflow-y", "scroll");
		$(".userSelect").hide();
		$("menu").removeClass("active");
	}
});

// Открыть форму по ID
function open_form(form_id) {
	$("body").css("overflow", "hidden");
	$(form_id).addClass("active");
}

// Поиск пользователя
function filterFunction(input) {
	let substr = input.value.toUpperCase();
	if (substr.trim()) {
		$('.userSelect').show();
		let users = $('.userSelect .userSelect__user');

		// Сортируем
		users.sort((a, b) => {
			a = $(a).find('h3')[0].textContent.toUpperCase().indexOf(substr);
			b = $(b).find('h3')[0].textContent.toUpperCase().indexOf(substr);

			if (a == -1) return 1
			if (b == -1) return -1
			return a - b
		});

		// Перезаполняем
		$('.userSelect').find('.userSelect__user').detach();
		users.map(index => $('.userSelect').append(users[index]));
		
		// Скрываем пользователей неудолетворяющих поиску
		users.map((index) => $(users[index]).find('h3')[0].textContent.toUpperCase().indexOf(substr) !== -1 ? $(users[index]).show() : $(users[index]).hide());
	}
	else { $('.userSelect').hide(); }
}

// Сменить тему оформления
function switch_theme() {
	$('body').toggleClass('light__theme dark__theme');
	page_adaptation();
}

// Сменить цветовую схему
function switch_color_scheme() {

	schemes = ['colorScheme__green', 'colorScheme__blue', 'colorScheme__red', 'colorScheme__purple'];

	let currentSchemeIndex = schemes.indexOf($('body').attr("colorScheme"));
	let nextSchemeIndex = (currentSchemeIndex + 1) % schemes.length;

	$('body').attr("colorScheme", schemes[nextSchemeIndex]);
	page_adaptation();
}


// Кнопка вернуться в начало страницы
arrowTop.onclick = function () {
	window.scrollTo(pageXOffset, 0);
};
window.addEventListener('scroll', function () {
	arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});