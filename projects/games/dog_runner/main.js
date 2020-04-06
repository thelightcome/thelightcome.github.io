const canvas = document.getElementById('canvas'),
	  canvas_wrap = document.querySelector('.canvas_wrap'),
	  opt = document.querySelector('.options'),
	  score = document.getElementById('score');

let w = canvas.width = canvas_wrap.offsetWidth,
	h = canvas.height = canvas_wrap.offsetHeight;

window.onresize = () => {
	w = canvas.width = canvas_wrap.offsetWidth;
	h = canvas.height = canvas_wrap.offsetHeight;
};

document.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		opt.classList.add('hide');
	}
});

function gameOver() {
	opt.innerHTML = "Game over <p>Press <span>Enter</span> to replay</p>";
	opt.classList.remove('hide');
}