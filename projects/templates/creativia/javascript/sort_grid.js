const links = document.querySelectorAll('.check li'),
	  flats = document.querySelectorAll('.flat_sort .flat');

links.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		links.forEach((elem) => {elem.classList.remove('active')});
		e.target.classList.add('active');
		let data_type = e.target.dataset.type;
		flats.forEach((elem) => {
			if(data_type == 'all') {
				elem.classList.remove('hide');
			}
			else if(elem.dataset.type.indexOf(data_type) !== -1) {
				elem.classList.remove('hide');
			}
			else {
				elem.classList.add('hide');
			}
		});
	});
});