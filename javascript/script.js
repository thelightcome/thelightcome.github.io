const menu__title = document.querySelectorAll('.menu__title');

menu__title.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		if(e.target.classList.contains('active')) {
			elem.classList.remove('active');
			return
		}
		menu__title.forEach((elem) => {
			elem.classList.remove('active');
		});
		e.target.classList.add('active');
	});
});