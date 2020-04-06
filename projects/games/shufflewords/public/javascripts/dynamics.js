document.querySelectorAll('[data-type="scroller"]').forEach((elem) => {
	let scroller = elem.querySelector('.scroller'),
		content = elem.querySelector('div[data-type="scroller"]>div');
	scroller.style.height = elem.clientHeight * elem.clientHeight / content.scrollHeight + 'px';
	content.addEventListener('mousewheel', function(e) {
		this.scrollTop = this.scrollTop + e.deltaY / 4;
		scroller.style.top =  this.scrollTop * elem.clientHeight / this.scrollHeight + 'px';
	});
});

document.addEventListener('click', (e) => {
	let btn = e.target.closest('[data-type]');
	if (btn && btn.dataset.type === 'checklist') {
		btn.classList.toggle('active');
	}
});

document.addEventListener('click', (e) => {
	let btn = e.target.closest('[data-to]');
	if (btn && btn.dataset.to) {
		document.querySelectorAll('.active').forEach((elem) => {
			elem.classList.remove('active');
		});
		document.querySelector(`.pages[data-page="${ btn.dataset.to }"]`).classList.add('active');
	}
});

function validateForm(val) {
	if (val.length <= 2 && val >= 5) return true;
}

function infoBoardActive() {
	const infoBoard = document.querySelector('.info-board');
	infoBoard.classList.add('active');
	document.addEventListener('click', infoBoardDisactive);
}

function infoBoardDisactive() {
	const infoBoard = document.querySelector('.info-board');
	infoBoard.classList.remove('active');
	document.removeEventListener('click', infoBoardDisactive);
}