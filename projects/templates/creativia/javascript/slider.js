class Slider {
	constructor(slider) {
		this.slider = document.getElementById(slider);
		this.left_btn = this.slider.querySelector('[data-rule="left"]');
		this.right_btn = this.slider.querySelector('[data-rule="right"]');
		this.body = this.slider.querySelector('[data-rule="body"]');
		this.items = this.slider.querySelectorAll('[data-item]');
		this.center = Math.floor(this.items.length / 2);
	}
	get_items() {
		this.items = this.slider.querySelectorAll('[data-item]');
	}
	to_left() {
		this.get_items();
		this.body.append(this.items[0]);
		this.set_position();
	}
	to_right() {
		this.get_items();
		this.body.prepend(this.items[this.items.length - 1]);
		this.set_position();
	}
	set_position() {
		this.get_items();
		this.items.forEach((elem, index) => {
			elem.classList.remove('active');
			elem.style.left = (index - this.center) * 100 + '%';
		});
		this.items[this.center].classList.add('active');
	}
	init() {
		this.set_position()
		this.left_btn.addEventListener('click', this.to_left.bind(this));
		this.right_btn.addEventListener('click', this.to_right.bind(this));
	}
}

let slider = new Slider('slider');
slider.init();