function getRandom(min = 0, max = 255) {
	return Math.floor((Math.random() * (max - min) + min));
}

class Game {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.dog = null;
		this.obj = [];
		this.state = null;
		this.cycle = null;
		this.requestID = null;
		this.timer = null;
		this.speed = 2;
	}

	init() {
		this.dog = new Dog(this);
		this.dog.paint(this.ctx);
		document.addEventListener('keyup', (e) => {
			if ((!this.state || this.state == 'dead') && e.keyCode == 13) {
				if (this.state == 'dead') {
					this.again();
				}
				else {
					this.start();
				}
			}
			else if (e.keyCode == 80) {
				if (this.state == 'play') {
					this.stop();
				}
				else if (this.state == 'stop') {
					this.play();
				}
			}
			else if (this.state && this.state != 'dead' && e.keyCode == 82) {
				this.again();
			}
		});
	}

	start() {
		score.innerHTML = +score.innerHTML + 0;
		if (!this.state) {
			document.addEventListener('keyup', (e) => {
				if(this.state == 'play' && e.keyCode == 32) {
					this.dog.jump(this.dog);
				}
			});
		}
		this.dog.move();
		this.dog.paint(this.ctx);
		this.play();
	}

	play() {
		this.state = 'play';
		this.timer = setInterval(() => {
			score.innerHTML = +score.innerHTML + 10;
			this.speed = Math.round(score.innerHTML / 100) + 2;
		}, 1000)
		this.animate();
		this.game_cycle();
	}

	stop() {
		this.state = 'stop';
		clearInterval(this.timer);
		clearTimeout(this.cycle);
		window.cancelAnimationFrame(this.requestID);
	}

	again() {
		clearTimeout(this.cycle);
		clearInterval(this.timer);
		window.cancelAnimationFrame(this.requestID);
		score.innerHTML = 0;
		this.dog = new Dog(this);
		this.obj = [];
		this.requestID = null;
		this.cycle = null;
		this.clear();
		this.start();
	}

	check() {
		for(let i = 0; i < this.obj.length; i += 1) {
			if ((this.obj[i].x < this.dog.x + this.dog.width) && (this.obj[i].x + this.obj[i].width > this.dog.x)) {
				if (this.dog.y + this.dog.height > this.obj[i].y) {
					this.gameOver();
					return false
				}
			}
		}
		return true
	}

	animate() {
		this.clear();
		this.dog.move();
		this.dog.paint(this.ctx);
		this.obj = this.obj.filter((elem) => {
			elem.paint();
			elem.x -= this.speed;
			if (elem.x + elem.width > 0) return true;
		});
		if(!this.check()) return;
		this.requestID = requestAnimationFrame(this.animate.bind(this));
	}

	game_cycle() {
		this.cycle = setTimeout(() => {
			this.obj.push(new Object(this.ctx, getRandom(5, 15), getRandom(5, 100)));
			this.game_cycle();
		}, getRandom(2, 5) * 1000);
	}

	gameOver() {
		clearTimeout(this.cycle);
		clearInterval(this.timer);
		window.cancelAnimationFrame(this.requestID);
		this.requestID = null;
		this.cycle = null;
		this.state = 'dead';
		gameOver();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

let game = new Game(canvas);
game.init();