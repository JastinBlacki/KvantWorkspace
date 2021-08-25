// Адаптивность от бога 2.0
$(window).resize(function(){
	$('body')[0].style.zoom = window.innerWidth / 1800 < 0.5 ? 0.5 : window.innerWidth / 1800;
});

// Закрытие форм и меню при клике вне
$(document).mouseup(function (e) {
	var form = $(".form-wrapper");
	var menu = $("menu");
	var alert = $(".alert")
	if (form.has(e.target).length === 0 && menu.has(e.target).length === 0 && alert.has(e.target).length === 0){
		// $(".form").hide();
		$(".form").removeClass("active");
		$("menu").hide();
		$("body").css("overflow-y", "scroll");
	}
});

// Открыть меню
function open_menu(menu_id) {
	$(menu_id).show();
}

// Открыть форму
function open_form(form_id) {
	// $(form_id).show();
	$("body").css("overflow", "hidden");
	$(form_id).addClass("active");
}

// Открытие формы по нажатию на урок
$("#diary .item").click(function () {
	$('#diary .form').addClass("active");
	$("body").css("overflow", "hidden");
});

// Открытие формы по нажатию на курс
$("#schedule-widget .item").click(function () {
	$('#schedule-widget .form').addClass("active");
	$("body").css("overflow", "hidden");
});

// Открытие формы по нажатию на письмо
$("#mail .item").click(function () {
	$('#mail .form').first().addClass("active");
	$("body").css("overflow", "hidden");
});


let filters = ['Ученик', 'Учитель', 'Группа', 'Администратор'];
// Поиск пользователя
function filterFunction(input) {
	let substr = input.value.toUpperCase();
	if (substr.trim()) {
		$('.unselected').show();
		let users = $('.unselected .user').map(function (index) {
			let user = $('.unselected .user')[index]

			user.style.display = 'none';
			return user
		});

		let unblocked = users.map(function (index) {
			let user = users[index]

			let name = $(user).find('h2')[0].textContent;
			let category = $(user).find('h4')[0].textContent;

			if (name.toUpperCase().indexOf(substr) !== -1 && filters.indexOf(category) !== -1) {
				user.style.display = 'flex'
				return user
			}
		})

		if (unblocked.length) { $('.unselected').show() }
		else { $('.unselected').hide(); }
	}
	else { $('.unselected').hide(); }
}

function filter_applying(button, filter) {
	if ($(button).hasClass('active')) {
		$(button).removeClass('active');
		filters.splice(filters.indexOf(filter), 1);
	} else {
		$(button).addClass('active');
		filters.push(filter);
	}
	filterFunction($('.dropdown-input')[0]);
}

// Сменить тему
function switch_theme() {
	if ($('body').hasClass('light__theme')) {
		$('.light__theme').toggleClass('light__theme dark__theme');
	} else {
		$('.dark__theme').toggleClass('dark__theme light__theme');
	}
}

// Сменить цветовую схему
function switch_color_scheme() {
	if ($('body').hasClass('blue__color__scheme')) {
		$('.blue__color__scheme').toggleClass('blue__color__scheme orange__color__scheme');
	} else {
		$('.orange__color__scheme').toggleClass('orange__color__scheme blue__color__scheme');
	}
}

function hue(range) {
	$(".active svg").css("filter", `hue-rotate(${range.value}deg)`)
	$("aside p").css("filter", `hue-rotate(${range.value}deg)`)
}


// Кнопка вернуться в начало страницы
arrowTop.onclick = function() {
	window.scrollTo(pageXOffset, 0);
};

window.addEventListener('scroll', function() {
	arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});