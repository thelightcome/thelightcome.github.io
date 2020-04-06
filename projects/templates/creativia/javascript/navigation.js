const nav__rule = document.querySelector('.nav__rule'),
	  nav__body = document.querySelector('.nav__body'),
	  nav__links = document.querySelectorAll('.nav__body a');

nav__rule.addEventListener('click', (e) => {
	nav__rule.classList.toggle('active');
	nav__body.classList.toggle('active');
});
nav__links.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		nav__links.forEach((elem) => {
			elem.classList.remove('active');
		});
		e.target.classList.add('active');
	});
});