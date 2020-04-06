const slide = document.querySelector('.slide'),
	  slide_items = slide.querySelectorAll('.items'),
	  slider_indicators = document.querySelectorAll('.slider_indicators li'),
	  slide_left = document.querySelector('.btn_ruls .left'),
	  slide_right = document.querySelector('.btn_ruls .right');

slide_left.addEventListener('click', moveSlide);
slide_right.addEventListener('click', moveSlide);

function moveSlide(e) {
	let active_slide = document.querySelector('.slide .items.active'),
	    next;
	    active_slide.classList.remove('active');
	if(e.target == slide_left) {
		next = active_slide.previousElementSibling || document.querySelector('.slide .items:last-child');
	}
	else {
		next = active_slide.nextElementSibling || document.querySelector('.slide .items:first-child');
	}
	slide_items.forEach((elem, index) => {
		if(elem == next) {
			slide.style.left = -100 * index + '%';
			let active_indicators = document.querySelector('.slider_indicators li.active').classList.remove('active');
			slider_indicators[index].classList.add('active');
		}
	});
	next.classList.add('active');
}
slider_indicators.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		slide_items.forEach((elem) => {
			elem.classList.remove('active');
		});
		let i;
		slider_indicators.forEach((elem, index) => {
			elem.classList.remove('active');
			if(e.target == elem) {
				i = index;
			}
		});
		e.target.classList.add('active');
		slide.style.left = -100 * i + '%';
		slide_items[i].classList.add('active');
	});
});

const slider_body = document.querySelector('.slider_body'),
	  slider_control_left = document.querySelector('.slider_control .left'),
	  slider_control_right = document.querySelector('.slider_control .right'),
	  slider_items = slider_body.querySelectorAll('.slider_items');
slider_control_left.addEventListener('click', moveSlider);
slider_control_right.addEventListener('click', moveSlider);
function to_per(x, y) {
	return Math.floor((x / y) * 100 );
}
function moveSlider(e) {
	let left = Math.abs(parseInt(slider_body.style.left)) || 0,
		right = to_per(slider_body.scrollWidth, slider_body.offsetWidth) - 100 - left,
		per = 100;
	if(e.target == slider_control_right) {
		let to_left = per;
		if(Math.floor(right / per) == 0) {
			to_left = right % per;
		}
		slider_body.style.left = -left - to_left + '%';
	}
	else if(e.target == slider_control_left) {
		let to_right = per;
		if(Math.floor(left / per) == 0) {
			to_right = left % per;
		}
		slider_body.style.left = -left + to_right + '%';
	}
}
slider_items.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		slider_items.forEach((elem) => {
			elem.classList.remove('active');
		});
		e.target.closest('li').classList.add('active');
	});
});