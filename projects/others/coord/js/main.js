function move_obj(e) {
	let obj = this.closest('.wrapper'),
	shiftX = e.clientX - obj.getBoundingClientRect().left,
	shiftY = e.clientY - obj.getBoundingClientRect().top;
	
	function moveAt(pageX, pageY) {
		obj.style.position = 'absolute';
		obj.style.left = pageX - shiftX + 'px';
		obj.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	moveAt(e.pageX, e.pageY);

	document.addEventListener('mousemove', onMouseMove);
	this.addEventListener('mouseup', onMouseUp);

	function onMouseUp() {
		document.removeEventListener('mousemove', onMouseMove);
		this.removeEventListener('mouseup', onMouseUp);
	};
}

let move_rule = document.getElementsByClassName('move_rule');
for(let i of move_rule) {
	i.addEventListener('mousedown', move_obj);
}
let caret = document.getElementsByClassName('caret');
for(let i of caret) {
	i.addEventListener('click', function(e) {
		let sh_hi = e.target.closest('.wrapper'),
			dropdown = sh_hi.getElementsByClassName('dropdown')[0];
		dropdown.classList.toggle('active');
	});
}
let input_func = document.getElementById('table');
let cnv = new Canvas('canvas_wrapper', input_func);
cnv.init();
cnv.paint_grid()
let calculator = new Calculator('WoW', cnv);
calculator.init('calculator');