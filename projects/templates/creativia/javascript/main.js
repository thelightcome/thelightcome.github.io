const features_list = document.querySelectorAll('.features li');
features_list.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		e.target.closest('li').classList.toggle('active');
	});
});
const clients_items = document.querySelectorAll('.clients_item'),
	  clients_indicators = document.querySelectorAll('.clients_indicators span');
clients_indicators.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		clients_items.forEach((elem) => {
			elem.classList.remove('active');
		});
		clients_indicators.forEach((elem) => {
			elem.classList.remove('active');
			if(elem == e.target) clients_items[e.target.dataset.num].classList.add('active');
		});
		e.target.classList.add('active');
	});
});