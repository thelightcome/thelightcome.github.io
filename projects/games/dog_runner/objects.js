class Object {
	constructor(ctx, width, height) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.color = "brown";
		this.x = canvas.width;
		this.y = canvas.height - this.height;
	}

	paint() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}