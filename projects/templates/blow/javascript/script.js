const nav_rule = document.querySelector("#nav-rule"),
	  nav_body = document.querySelector("nav ul"),
	  touch = document.querySelector("#touch"),
	  nav_links = document.querySelectorAll("nav ul a"),
	  canvas = document.querySelector("#canvas"),
	  ctx = canvas.getContext("2d"),
	  explore_btn = document.querySelector("#explore_btn");

let w = canvas.width = window.innerWidth,
	h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
});

explore_btn.addEventListener('click', () => {
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fillRect(0, 0, w, h);
	canvas.classList.add('active');
});

canvas.addEventListener('dblclick', () => {
	canvas.classList.remove('active');
});

nav_rule.addEventListener('click', () => {
	nav_body.classList.toggle('active');
});

nav_links.forEach((el) => {
	el.addEventListener('click', (e) => {
		nav_links.forEach((el) => {
			el.classList.remove('active');
		});
		e.target.classList.add('active');
	});
});

document.body.addEventListener('mousemove', (e) => {
	if(e.clientX < 50) {
		touch.style.left = 0;
	}
	else {
		touch.style.left = null;
	}
})

canvas.addEventListener('click', (e) => {
	click(e);
});

let spy = {
		spy_const: 10,
		k: 10,
		step: 1,
		max: Math.max(Math.round(w / 20), 15)
	};

function getRandom(min = 0, max = 255) {
	return Math.floor((Math.random() * (max - min) + min) / 10) * 10;
}

function click(e) {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, w, h);
	let x = e.clientX,
		y = e.clientY;

	animate.i = 0;
	animate.x = x;
	animate.y = y;
	animate.alpha = 1;
	animate.color = `rgba(${getRandom()}, ${getRandom()}, ${getRandom()}, alpha)`;
	animate(x, y);
}

function animate() {
	animate.i += spy.step;
	animate.alpha = animate.alpha - 1 / Math.max(spy.max, 10);
	let color = animate.color.replace('alpha', animate.alpha);
	let phi = (animate.i + 3) * Math.PI / spy.spy_const,
        r = spy.k * phi;
    console.log(color)
    s_x = animate.x + r * Math.cos(phi);
    s_y = animate.y + r * Math.sin(phi);
    paint(s_x, s_y, color);
    if(animate.i < spy.max) {
    	requestAnimationFrame(animate);
    }
}

function paint(x, y, color) {
	ctx.beginPath();
	ctx.arc(x, y, 2, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}