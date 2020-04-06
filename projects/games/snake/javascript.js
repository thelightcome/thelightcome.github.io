function getRandom(min = 0, max = 255) {
	return Math.floor((Math.random() * (max - min) + min));
}

const canvas = document.getElementById('snake'),
	  canvas_wrap = document.querySelector('.canvas_wrap'),
	  score = document.querySelector('#score'),
	  enter = document.querySelector('#enter'),
	  pause = document.querySelector('#pause'),
	  replay = document.querySelector('#replay'),
	  up = document.querySelector('.up'),
	  left = document.querySelector('.left'),
	  right = document.querySelector('.right'),
	  down = document.querySelector('.down'),
	  blk_size = 16;
let w = Math.floor(canvas_wrap.offsetWidth / blk_size),
	h = Math.floor(canvas_wrap.offsetHeight / blk_size);

canvas.width = w * blk_size;
canvas.height = h * blk_size;
window.onresize = function() {
	w = Math.floor(canvas_wrap.offsetWidth / blk_size);
	h = Math.floor(canvas_wrap.offsetHeight / blk_size);
	canvas.width = w * blk_size;
	canvas.height = h * blk_size;
	if(game) {
		game.area.paint(game.snake.body);
	}
}

class Area {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.blk_size = blk_size;
		this.width = w;
		this.height = h;
		this.food = [];
	}

	clear() {
		this.context.fillStyle = "#020202";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	paint(arr) {
		arr.forEach((elem) => {
			this.context.fillStyle = "#f5f5f5";
			this.context.fillRect(elem[0] * this.blk_size + 2, elem[1] * this.blk_size + 2, this.blk_size - 4, this.blk_size - 4);
		});
		if(this.food) {
			this.context.fillStyle = "#ff00ff";
			this.context.fillRect(this.food[0] * this.blk_size + 2, this.food[1] * this.blk_size + 2, this.blk_size - 4, this.blk_size - 4);
		}
	}

	addFood(snake) {
		this.food = [getRandom(0, this.width - 1), getRandom(0, this.height - 1)];
		while(snake.filter((elem)=>{return String(elem) == String(this.food)}).length) {
			this.food = [getRandom(0, this.width - 1), getRandom(0, this.height - 1)];
		}
	}
}

class Snake {
	constructor(area) {
		this.body = [[0, 0]];
		this.speed = 4;
		this.direct = [1, 0];
		this.area = area;
		this.state = 'alive';
	}

	move() {
		let head = this.body[this.body.length - 1],
			step = [head[0] + this.direct[0], head[1] + this.direct[1]];
		if(this.check(step)) {
			this.body.push(step);
		}
		else {
			this.state = 'dead';
			return
		}
		if(!this.eating(step)) {
			this.body = this.body.slice(1);
		}
		else {
			if(this.body.length % 4 == 0) this.speed += 1;
			this.area.addFood(this.body);
			return 'eat';
		}
	}

	check(step) {
		if(step[0] >= 0 && step[0] < this.area.width && step[1] >= 0 && step[1] < this.area.height && !this.body.filter((elem)=>{return String(elem)==String(step)}).length) return true;
		return false
	}

	eating(step) {
		return String(this.area.food) === String(step);
	}

	rule(key) {
		if(key === 'up') {this.body.length > 1 && String(this.direct) == '0,1' ? this.direct : this.direct = [0, -1]}
		else if (key === 'down') {this.body.length > 1 && String(this.direct) == '0,-1' ? this.direct : this.direct = [0, 1]}
		else if (key === 'right') {this.body.length > 1 && String(this.direct) == '-1,0' ? this.direct : this.direct = [1, 0]}
		else if (key === 'left') {this.body.length > 1 && String(this.direct) == '1,0' ? this.direct : this.direct = [-1, 0]}
	}
}

class Game {
	constructor() {
		this.area = new Area(canvas);
		this.snake = new Snake(this.area);
		this.interval = null;
	}

	nextFrame() {
		this.area.clear();
		if(this.snake.move()) {
			this.addScore();
		}
		this.area.paint(this.snake.body);
	}

	addScore() {
		score.innerHTML = (this.snake.body.length - 1) * 10;
	}

	play() {
		if(this.snake.state === 'dead') {
			this.gameover();
			return;
		}
		this.nextFrame();
		this.setInterval(this.snake.speed);
	}

	pause() {
		if(this.interval) {
			this.clearInterval();
		}
		else {
			this.setInterval(this.snake.speed);
		}
	}

	replay() {
		this.area = new Area(canvas);
		this.snake = new Snake(this.area);
		this.addScore();
		this.clearInterval();
		this.start();
	}

	gameover() {
		score.innerHTML = 'GAME OVER) TOTAL - ' + (this.snake.body.length - 1) * 10;
	}

	clearInterval() {
		clearTimeout(this.interval);
		this.interval = null;
	}

	setInterval(speed) {
		this.interval = setTimeout(() => {
			this.play();
		}, 1000 / speed);
	}

	init() {
		let keys = {
			'up': 38,
			'down': 40,
			'right': 39,
			'left': 37
		}

		document.body.addEventListener('keyup', (e) => {
			if (e.keyCode == 13) this.replay();
			else if (e.keyCode == 80) this.pause();
			else if (e.keyCode == 82) this.replay();
			this.snake.rule(Object.keys(keys)[Object.values(keys).indexOf(e.keyCode)]);
		});
		document.body.addEventListener('click', (e) => {
			let target = e.target;
			if(target == enter) this.replay();
			else if (target == pause) this.pause();
			else if (target == replay) this.replay();
			else {
				this.snake.rule(target.className);
			}
		});
		this.area.paint(this.snake.body);
	}

	start() {
		this.area.addFood(this.snake.body);
		this.setInterval(this.snake.speed);
	}
}

let game = new Game();

game.init();