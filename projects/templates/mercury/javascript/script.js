const nav_rule = document.querySelector('#nav-rule'),
	  nav = document.querySelector('nav');

nav_rule.addEventListener('click', () => {
	nav.classList.toggle('show');
});