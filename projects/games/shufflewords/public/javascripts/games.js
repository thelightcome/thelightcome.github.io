const letterBlock = document.querySelector('.letter-block'),
	  answerBlock = document.querySelector('.answer-block'),
	  timeBoard = document.querySelector('.board .time'),
	  scoreBoard = document.querySelector('.board .score'),
	  infoBoard = document.querySelector('.info-board'),
	  replayBtn = document.querySelector('#replay'),
	  resetBtn = document.querySelector('#reset'),
	  themeBoard = document.querySelector('.theme-board'),
	  hint = document.querySelector('#hint'),
	  hintWrapper = document.querySelector('.answer label[for="hint"]');

const options = {
	time: null,
	themes: [],
	minWordsCountToRequest: 30
}

const game = {
	time: null,
	score: 0,
	words: []
}

let timer = null;
let word = null;

document.querySelector('#start-game').addEventListener('click', (e) => {
	let input = document.querySelector('.pages-options input[type="number"]');
	if (!validateForm(input.value)) {
		const infoBoard = document.querySelector('.info-board');
		infoBoard.innerHTML = 'Время игры указано неправильно! </br> Мин: 5. Макс: 99';
		infoBoardActive();
		e.stopPropagation();
		return
	}
	else {
		let time = document.querySelector('.pages-options input[type="number"]').value || 5;
		options.time = time * 60 * 10;
		timeBoard.innerHTML = getMSFormat(game.time);
		document.querySelectorAll('.themes span[data-type="checklist"].active').forEach((elem) => {
			options.themes.push(elem.dataset.val);
		});
		document.querySelectorAll('.active').forEach((elem) => {
			elem.classList.remove('active');
		});
		document.querySelector('.answer').classList.add('active');
		start();
	}
});

letterBlock.addEventListener('click', (e) => {
	if (e.target.closest('span[data-letter]')) {
		answerBlock.appendChild(e.target.closest('span[data-letter]'));
		if (answerBlock.textContent === word.value && game.time > 0) {
			scoreBoard.innerHTML = game.score = game.score + (word.value.length - answerBlock.querySelectorAll('span.help').length) * 10;
			answerBlock.classList.add('valid');
			clearInterval(timer);
			setTimeout(() => {
				nextRound();
			}, 1000);
		}
		else if (answerBlock.textContent.length == word.value.length) {
			answerBlock.classList.add('error');
		}
	}
});

answerBlock.addEventListener('click', (e) => {
	let letter = e.target.closest('span[data-letter]');
	if (letter) {
		letter.classList.remove('help');
		letterBlock.appendChild(letter);
		answerBlock.classList.remove('error');
	}
});

replayBtn.addEventListener('click', () => {
	start();
});

resetBtn.addEventListener('click', () => {
	reset();
});



hintWrapper.addEventListener('click', () => {
	if (hint.innerHTML > 0) {
		if (!letterBlock.querySelectorAll('.help').length) {
			findLetter();
		}
		hint.innerHTML = hint.innerHTML - 1;
	}
});

function findLetter() {
	let letter = null;
	for (let i = 0; i < word.value.length; i +=1) {
		letter = letterBlock.querySelector(`span[data-letter="${ i }"]`);
		if (letter) {
			letter.classList.add('help');
			letter.innerHTML = i + 1;
			setTimeout(() => {
				letter.innerHTML = word.value[letter.dataset.letter];
			}, 2000);
			return
		}
	}
}

function start() {
	clearInterval(timer);
	game.time = options.time;
	scoreBoard.innerHTML = game.score = 0;
	timeBoard.innerHTML = getMSFormat(game.time);
	request(options.themes).then(() => {
		nextRound();
	});

}

async function request(themes) {
	return await fetch('/words', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(themes)
			})
			.then(response => response.json())
    		.then(result => game.words = result.concat(game.words));
}

function nextRound() {
	answerBlock.classList.remove('valid');
	answerBlock.classList.remove('animate');
	answerBlock.innerHTML = '';
	letterBlock.innerHTML = '';
	if (game.words.length < options.minWordsCountToRequest) {
		request(options.themes);
	}
	if (game.words.length > 0 && game.time > 0) {
		word = game.words.pop();
		themeBoard.innerHTML = document.querySelector(`.themes span[data-val="${ word.theme }"]`).textContent;
		hint.innerHTML = word.value.length;
		setShuffleLetter(word.value, letterBlock);

		timer = setTimer(game, timeBoard);
	}
}

function setShuffleLetter(word, letterBlock) {
	const letters = {},
		  styleletterBlock = getComputedStyle(letterBlock);

	word.split('').forEach((elem, index) => {
		let x = getRandom(10, parseInt(styleletterBlock.width) - 30),
			y = getRandom(10, parseInt(styleletterBlock.height) - 30);
		while(!check(x, y, letters)) {
			x = getRandom(10, parseInt(styleletterBlock.width) - 30),
			y = getRandom(10, parseInt(styleletterBlock.height) - 30);
		}
		letters[elem] = {x: x, y: y, letter: elem};
		let letter = document.createElement('span');
		letter.dataset.letter = index;
		letter.innerHTML = elem;
		letter.style.left = x + 'px';
		letter.style.top = y + 'px';
		if (elem === " ") {
			letter.classList.add('space');
		}
		letterBlock.appendChild(letter);
	});
}

function getRandom(min, max) {
	return Math.floor((Math.random() * (max - min) + min));
}

function check(x, y, list) {
	for(let elem of Object.values(list)) {
		if (!(x > elem.x + 25 || x + 25 < elem.x || y > elem.y + 25 || y + 25 < elem.y)) {
			return false
		}
	}
	return true
}

function setTimer(player, timeBoard) {
	return setInterval(() => {
		if (player.time > 0) {
			player.time -= 1;
			timeBoard.innerHTML = getMSFormat(player.time);
		} else {
			gameEnd();
		}
	}, 100);
}

function getMSFormat(val) {
    let minutes = Math.floor((val) / 60 / 10),
    	seconds = Math.floor((val - (minutes * 60 * 10)) / 10),
    	mlseconds = val - (minutes * 60 * 10) - (seconds * 10);
	if (minutes < 10) {minutes = "0" + minutes;}
	if (seconds < 10) {seconds = "0" + seconds;}
	if (mlseconds < 10) {mlseconds = "0" + mlseconds;}
	return `${ minutes } : ${ seconds } : ${ mlseconds }`;
}

function gameEnd() {
	clearInterval(timer);
	infoBoard.innerHTML = "Результат <br>" + game.score;
	infoBoardActive();
}

function reset() {
	if (game.time > 0) {
		let span = document.createElement('span');
		let n = Math.floor(word.value.length / 2) * 10;
		game.score -= n;
		span.innerHTML = '-' + n;
		scoreBoard.innerHTML = game.score;
		scoreBoard.appendChild(span);
		setTimeout(() => {
			span.remove();
		}, 2000);

		clearInterval(timer);
		nextRound();
	}
}