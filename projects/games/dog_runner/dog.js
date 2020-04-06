const options = {
	width: 30,
	height: 30,
	x: 30,
	y: canvas.height - 30,
	face: '#04FF00',
	energy: 6,
	second_energy: 4,
	diff: 0.2
}

class Dog {
	constructor(platform) {
		this.platform = platform;
		this.width = options.width;
		this.height = options.height;
		this.x = options.x;
		this.y = options.y;
		this.max_y = this.platform.canvas.height - this.height;
		this.face = options.face;
		this.state = 'state';
		this.power = true;
		this.energy = null;
		this.diff = options.diff;
	}

	up() {
		this.y -= this.energy;
		this.energy -= this.diff;
		if (this.energy < 0) {
			this.power = false;
		}
	}

	down() {
		this.y += this.energy;
		this.energy += this.diff;
		if (this.y + this.height >= this.max_y) {
			this.energy = null;
			this.power = true;
			this.y = this.max_y;
			this.state = 'run';
			return
		}
	}

	jump() {
		if (this.state == 'run') {
			this.energy = options.energy;
			this.state = 'jump';
		}
		else if (this.state == 'jump') {
			this.energy += options.second_energy;
			this.state = 'second_jump';
		}
		else if (this.state == 'second_jump') {
			return;
		}
	}

	move() {
		if (this.state == 'jump' || this.state == 'second_jump') {
			if (this.power) {
				this.up();
			}
			else {
				this.down();
			}
		}
		else {
			this.state = 'run';
			return
		}
	}

	paint(ctx) {
		ctx.fillStyle = this.face;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}