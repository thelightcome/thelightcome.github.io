function getRandom(min = 0, max = 255) {
	return Math.floor((Math.random() * (max - min) + min) / 10) * 10;
}

function getLenFN(x) {
	if(String(x).indexOf('.') != -1){
		let s = String(x).split('.');
		return s[s.length - 1].length;
	}
	return 0;
}

class Canvas {
	constructor(canvas_wrapper, table, size) {
		this.canvas = (function create_canvas(wrapper) {
							let canvas_wrapper = document.getElementById(wrapper);
							let canvas = document.createElement("canvas");
							canvas.width = canvas_wrapper.clientWidth;
							canvas.height = canvas_wrapper.clientHeight;
							canvas.style.border = "1px solid #020202";
							canvas.overflow = 'auto';
							canvas_wrapper.appendChild(canvas);
							return canvas;
						})(canvas_wrapper);

		this.grid_center_x = Math.floor(this.canvas.clientWidth / 2);
		this.grid_center_y = Math.floor(this.canvas.clientHeight / 2);
		this.grid_size = size || 50;
		this.grid_del = 1;
		this.grid_point_del = 1;

		this.x = 1;
		this.y = 1;

		this.color_axis = '#020202';
		this.color_grid = '#C0C0C0';

		this.colors = [];
		this.func = [];

		this.table = table;
	}

	paint_grid() {
		let d_x = this.grid_center_x % this.grid_size,
			d_y = this.grid_center_y % this.grid_size,
			points_x = [],
			points_y = [];

		for(let i = d_x; i < this.canvas.clientWidth; i += this.grid_size) {
			points_x.push(i);
		}

		for(let i = d_y; i < this.canvas.clientHeight; i += this.grid_size) {
			points_y.push(i);
		}

		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

		ctx.beginPath();
		ctx.strokeStyle = this.color_grid;
		for(let i of points_x) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.canvas.clientHeight);
		}
		for(let i of points_y) {
			ctx.moveTo(0, i);
			ctx.lineTo(this.canvas.clientWidth, i);
		}
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = this.color_axis;
		ctx.moveTo(this.grid_center_x, 0);
		ctx.lineTo(this.grid_center_x, this.canvas.clientHeight);
		ctx.moveTo(0, this.grid_center_y);
		ctx.lineTo(this.canvas.clientWidth, this.grid_center_y);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.font = '10pt Arial';
		ctx.strokeStyle = this.color_axis;
		let metrics;
		let x_center = points_x.indexOf(this.grid_center_x);
		let x_p, x_t;
		if (this.grid_center_y < 0) {
			x_p = 0;
			x_t = 0;
		}
		else if (this.grid_center_y > this.canvas.clientHeight) {
			x_p = this.canvas.clientHeight;
			x_t = this.canvas.clientHeight - 20;
		}
		else {
			x_p = this.grid_center_y;
			x_t = this.grid_center_y;
		}
		for(let i = 0; i < points_x.length; i += 1) {
			let m  = i - x_center % this.grid_del;
			if(m % this.grid_del != 0) continue;
			let x = points_x[i];
			ctx.moveTo(x, x_p - 5);
			ctx.lineTo(x, x_p + 5);
			let t = i - x_center % (this.grid_point_del * this.grid_del);
			if(t % (this.grid_point_del * this.grid_del) == 0) {
				let text = String((Math.floor((x - this.grid_center_x) / this.grid_size) * this.x).toFixed(getLenFN(this.x)));
				metrics = ctx.measureText(text);
				ctx.fillText(text, x - metrics.width / 2 + 8, x_t + 15);
			}
		}
		let y_center = points_y.indexOf(this.grid_center_y);
		let y_p, y_t;
		if (this.grid_center_x < 0) {
			y_p = 0;
			y_t = 0;
		}
		else if (this.grid_center_x > this.canvas.clientWidth) {
			y_p = this.canvas.clientWidth;
			y_t = this.canvas.clientWidth - 30;
		}
		else {
			y_p = this.grid_center_x;
			y_t = this.grid_center_x;
		}
		for(let i = 0; i < points_y.length; i += 1) {
			let m  = i - y_center % this.grid_del;
			if(m % this.grid_del != 0) continue;
			let y = points_y[i];
			ctx.moveTo(y_p - 5, y);
			ctx.lineTo(y_p + 5, y);
			let t = i - y_center % (this.grid_point_del * this.grid_del);
			if(t % (this.grid_point_del * this.grid_del) == 0) {
				if(y == this.grid_center_y) continue;
				ctx.fillText(String((Math.floor(-((y - this.grid_center_y) / this.grid_size)) * this.y).toFixed(getLenFN(this.y))), y_t + 10, y + 2.5);
			}
		}
		ctx.stroke();
		ctx.closePath();
	}

	init() {
		let self = this;

		this.paint();
		this.canvas.addEventListener('mousedown', (e) => {
			if(e.ctrlKey && e.which == 1) {
				let x = e.clientX;
				let y = e.clientY;
				function change_grid(e) {
					let vx = self.grid_center_x + e.clientX - x;
					// if (vx >= 0 && vx <= this.clientWidth) {
						self.grid_center_x = vx;
						x = e.clientX;
					// }
					let vy = self.grid_center_y + e.clientY - y;
					// if (vy >= 0 && vy <= this.clientHeight) {
						self.grid_center_y = vy;
						y = e.clientY;
					// }
					self.paint();
				}
				this.canvas.addEventListener('mousemove', change_grid);
				document.addEventListener('mouseup', function() {
					self.canvas.removeEventListener('mousemove', change_grid);
				});
			}
		});

		this.canvas.addEventListener('wheel', (e) => {
			e.preventDefault();
			if(e.ctrlKey) {
				let new_size = self.grid_size + (e.deltaY / 10);
				if((new_size >= 20 && new_size <= (self.canvas.clientWidth/2)) && (new_size >= 20 && new_size <= (self.canvas.clientHeight/2))) {
					self.grid_size = new_size;
					self.paint();
				}
			}
		});

		this.canvas.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			let x = document.getElementById('ctx_menu');
			if(!x) {
				let ctx_menu = document.createElement('div');
					ctx_menu.classList.add('ctx_menu');
					ctx_menu.id = 'ctx_menu';
				let cng_grid_del = document.createElement('select');
				for(let i = 1; i < 5; i += 1){
					let opt_grid_del = document.createElement('option');
					opt_grid_del.value = i;
					opt_grid_del.innerHTML = i;
					cng_grid_del.append(opt_grid_del);
				}
				cng_grid_del.addEventListener('change', (e) => {
					this.change_grid_del(e.target.value);
				});
				ctx_menu.append(cng_grid_del);

				let cng_grid_point_del = document.createElement('select')
				for(let i = 1; i < 5; i += 1){
					let opt_grid_point_del = document.createElement('option');
					opt_grid_point_del.value = i;
					opt_grid_point_del.innerHTML = i;
					cng_grid_point_del.append(opt_grid_point_del);
				}
				cng_grid_point_del.addEventListener('change', (e) => {
					this.change_grid_point_del(e.target.value);
				});
				ctx_menu.append(cng_grid_point_del);


				let val = {
					'grad': 90, 
					'rad': 57.17, 
					'e': 2.7, 
					'-3': 10**(-3), 
					'-2': 10**(-2), 
					'-1': 10**(-1), 
					'0': 10**(0), 
					'1': 10**(1), 
					'2': 10**(2), 
					'3': 10**(3),
				};

				let cng_x = document.createElement('select');
				for(let i of Object.entries(val)){
					let opt_cng_x = document.createElement('option');
					opt_cng_x.value = i[1];
					opt_cng_x.innerHTML = i[0];
					cng_x.append(opt_cng_x);
				}
				cng_x.addEventListener('change', (e) => {
					this.change_delpoint_x(e.target.value);
				});
				ctx_menu.append(cng_x);
				let cng_y = document.createElement('select');
				for(let i of Object.entries(val)){
					let opt_cng_y = document.createElement('option');
					opt_cng_y.value = i[1];
					opt_cng_y.innerHTML = i[0];
					cng_y.append(opt_cng_y);
				}
				cng_y.addEventListener('change', (e) => {
					this.change_delpoint_y(e.target.value);
				});
				ctx_menu.append(cng_y);
				ctx_menu.style.left = e.clientX + 'px';
				ctx_menu.style.top = e.clientY + 'px';
				document.body.append(ctx_menu);
			}
			else {
				document.body.removeChild(x);
			}
		});

		this.canvas.addEventListener('mousedown', (e) => {
			if(e.ctrlKey || e.which != 1) return;
			e.preventDefault();
			let br = e.target.getBoundingClientRect()
			let x = e.clientX - br.x;
			let y = e.clientY - br.y;
			let ctx = self.canvas.getContext('2d');
			ctx.save();
			function paint_line(e) {
				self.paint();
				ctx.strokeStyle = 'red';
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x, self.grid_center_y);
				ctx.moveTo(x, y);
				ctx.lineTo(self.grid_center_x, y);
				ctx.stroke();
				ctx.closePath();
				let mean_x = String(((x - self.grid_center_x) / self.grid_size * self.x).toFixed(getLenFN(self.x) + 3)),
					mean_y = String((-((y - self.grid_center_y) / self.grid_size) * self.y).toFixed(getLenFN(self.y) + 3));
				let text = `(x = ${mean_x},  y = ${mean_y})`;
				let metrics = ctx.measureText(text);
				let x_t;
				if (x >= (self.canvas.clientWidth - metrics.width - 12)) {
					x_t = x - metrics.width - 15 - 12;
				}
				else {
					x_t = x + 12;
				}
				let y_t;
				if (y < 40) {
					y_t = y + 20;
				}
				else {
					y_t = y - 10;
				}
				ctx.fillText(text, x_t, y_t);
				x = e.clientX - br.x;
				y = e.clientY - br.y;
			}
			this.canvas.addEventListener('mousemove', paint_line);
			ctx.restore();
			document.addEventListener('mouseup', function() {
				self.paint();
				self.canvas.removeEventListener('mousemove', paint_line);
			});
		});
	}

	change_grid_del(del) {
		if(del < 1 || del > 4) return;
		this.grid_del = del;
		this.paint();
	}

	change_grid_point_del(point_del) {
		if(point_del < 1 || point_del > 4) return;
		this.grid_point_del = point_del;
		this.paint();
	}

	change_delpoint_x(d) {
		let x = Math.abs(d);
		if(String(x).length > 5) return;
		this.x = x;
		this.paint();
	}

	change_delpoint_y(d) {
		let y = Math.abs(d);
		if(String(y).length > 5) return;
		this.y = y;
		this.paint();
	}

	add_func(expression) {
		if(this.func.length > 12) {
			this.colors.pop(0);
			this.func.pop(0);
		}

		let color;
		while(true){
			color = 'rgb(' + getRandom(90, 255) + ', ' + getRandom() + ', ' + getRandom() + ')';
			if(this.colors.indexOf(color) == -1) {
				break;
			}
		}

		this.colors.push(color);
		this.func.push(expression);
		this.circle_func();
	}

	del_func(e) {
		let li = e.target.closest('li');
		let i = li.dataset.key;
		this.func.splice(i, 1);
		this.colors.splice(i, 1);
		this.paint();
		console.log('work')
	}

	paint_function(func, color) {
		let data = [];
		for(let i = 0; i < this.canvas.clientWidth; i++) {
			data.push([i,  -(func(((i - this.grid_center_x) / this.grid_size) * this.x) * this.grid_size / this.y - this.grid_center_y)]);
		}

		let ctx = this.canvas.getContext('2d');
		ctx.strokeStyle = color;
		ctx.beginPath();
		for(let i in data) {
			if(i == 0) ctx.moveTo(data[i][0], data[i][1]);
			ctx.lineTo(data[i][0], data[i][1]);
		}
		ctx.stroke();
	}

	circle_func() {
		let fragment = new DocumentFragment();
		this.table.innerHTML = '';
		for(let i in this.func){
			let li = document.createElement('li');
    		li.innerText = 'f(x) = ' + this.func[i];
    		li.style.color = this.colors[i];
    		li.setAttribute('data-key', i);
    		let del_btn = document.createElement('span');
			del_btn.innerText = 'DEL';
			del_btn.addEventListener('click', (e) => {this.del_func(e)});
			li.prepend(del_btn);
			let func = (var_x) => {
				let x = var_x;
				return eval(this.func[i]);
			};
			this.paint_function(func, this.colors[i]);
			fragment.append(li);
		}
		this.table.append(fragment);
	}

	paint() {
		this.paint_grid();
		this.circle_func()
	}
}