const accordion = document.querySelector('.accordion'),
	  accordion_items = accordion.querySelectorAll('.accordion_items'),
	  accordion_btns = accordion.querySelectorAll('.accordion_btn');

accordion_btns.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		accordion_items.forEach((elem) => {
			elem.classList.remove('active');
		});
		e.target.parentNode.classList.add('active');
	});
});