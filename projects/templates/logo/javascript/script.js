const slider_l = document.querySelector('#left'),
	  slider_r = document.querySelector('#right'),
	  slider_body = document.querySelector('#slider ul'),
	  slider_elems = document.querySelectorAll('#slider ul li');

slider_l.addEventListener('click', (e) => {
	let left = document.querySelector('#slider .left'),
		active = document.querySelector('#slider .active'),
		right = document.querySelector('#slider .right'),
		next = document.querySelector('#slider .right + li');

		left.classList.remove('left');
		slider_body.append(left);
		active.classList.remove('active');
		active.classList.add('left');
		right.classList.remove('right');
		right.classList.add('active');
		next.classList.add('right');
});
slider_r.addEventListener('click', (e) => {
	let left = document.querySelector('#slider .left'),
		active = document.querySelector('#slider .active'),
		right = document.querySelector('#slider .right'),
		last = document.querySelector('#slider ul li:last-child');

		right.classList.remove('right');
		active.classList.remove('active');
		active.classList.add('right');
		left.classList.remove('left');
		left.classList.add('active');
		last.classList.add('left');
		slider_body.prepend(last);
});

const services_slider_left = document.querySelector('#services_slider_left'),
	  services_slider_right = document.querySelector('#services_slider_right'),
	  services_slider = document.querySelector('#services_slider ul'),
	  services_slider_elems = document.querySelectorAll('#services_slider ul li');
let width = parseFloat(getComputedStyle(services_slider_elems[0]).width),
	max = services_slider_elems.length - 2;

window.addEventListener('resize', () => {
	width = parseFloat(getComputedStyle(services_slider_elems[0]).width);
	services_slider.style.left = "";
});

services_slider_left.addEventListener('click', (e) => {
	let left = parseFloat(getComputedStyle(services_slider).left);
	if(left - width < 0 - max * width) return;
	services_slider.style.left = left - width + 'px';
});
services_slider_right.addEventListener('click', (e) => {
	let left = parseFloat(getComputedStyle(services_slider).left);
	if(left + width > 0) return;
	services_slider.style.left = left + width + 'px';
});