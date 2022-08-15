
function page_adaptation(){

	let ratio = window.innerWidth / 2160 < 0.75 ? 0.75 : window.innerWidth / 2160;

	$("body").css({
		"zoom": ratio,
		"-moz-zoom": ratio,
		"width": `${ 1 / ratio * 100}vw`,
		"height": `${ 1 / ratio * 100}vh`
	});
}

$(window).ready(() => page_adaptation());
$(window).resize(() => page_adaptation());


function hideAll() {
	$(".form").removeClass("active");
	$(".mainContainer").css("overflow-y", "scroll");
	$(".userSelect").hide();
	$(".list").hide();
	$(".modal").removeClass("active");
}

// Закрытие форм при клике вне
$(document).mouseup(function (e) {
	let exceptions = [$(".form-wrapper"), $(".alert"), $(".trigger"), $(".modal__viewport")]

	if(!(exceptions.filter(exception => exception.has(e.target).length !== 0).length)){
		hideAll();
	}
});

// Горячие клавиши
$('body').keyup((event) => {
	if (event.keyCode == 27){
		hideAll();
	} 
});

// Открыть форму по ID
function open_form(form_id) {
	hideAll();
	$(".mainContainer").css("overflow", "hidden");
	$(form_id).addClass("active");
}

// Поиск пользователя
function filterFunction(input, select, option, parameter, hide) {
	let substr = input.value.toUpperCase();
	if (substr.trim()) {
		$(select).show();
		let users = $(select).find(option);

		// Сортируем
		users.sort((a, b) => {
			a = $(a).find(parameter)[0].textContent.toUpperCase().indexOf(substr);
			b = $(b).find(parameter)[0].textContent.toUpperCase().indexOf(substr);

			if (a == -1) return 1
			if (b == -1) return -1
			return a - b
		});

		// Перезаполняем
		$(select).find(option).detach();
		users.map(index => $(select).append(users[index]));
		
		// Скрываем пользователей неудолетворяющих поиску
		users.map((index) => 
			$(users[index]).find(parameter)[0].textContent.toUpperCase().indexOf(substr) !== -1 ? $(users[index]).show() : $(users[index]).hide()
		);
	}
	else {
		hide ? $(select).hide() : $(select).find(option).show();
	}

	// Специально для SearchPage
	resetCheckboxes();
}

function filterApplying(substr, select, option, parameter){
	let users = $(select).find(option);
	users.map((index) => {
		let flag = false
		$(users[index]).find(parameter).toArray().forEach(element => {
			if (element.textContent.indexOf(substr) !== -1)
				flag = true
		});
		flag ? $(users[index]).show() : $(users[index]).hide();
	});

	// Специально для SearchPage
	resetCheckboxes();
}

// Сменить тему оформления
function switch_theme() {
	$('body').toggleClass('light__theme dark__theme');
}
// Сменить цветовую схему
function switch_color_scheme() {
	schemes = ['colorScheme__green', 'colorScheme__blue', 'colorScheme__red', 'colorScheme__purple'];

	let currentSchemeIndex = schemes.indexOf($('body').attr("colorScheme"));
	let nextSchemeIndex = (currentSchemeIndex + 1) % schemes.length;

	$('body').attr("colorScheme", schemes[nextSchemeIndex]);
}


// Копирование текста
function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    
	let alert = $(`
		<div class='alert good'>
			<p>Скопировано</p>
        </div>
	`);

	$tmp.remove();

	$('.alertsContainer').append(alert);
	setTimeout(() => {
		alert.fadeOut();
		setTimeout(() => {
			alert.detach();
		}, 1000);
	}, 1500);
};
