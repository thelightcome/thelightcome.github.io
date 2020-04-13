<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>The light come</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/slider.css">
</head>
<body>
	<div class="logo">
		<a href="/">
			<span>T</span><span>h</span><span>e</span>
			<span>l</span><span>i</span><span>g</span><span>h</span><span>t</span>
			<span>c</span><span>o</span><span>m</span><span>e</span>
		</a>
	</div>
	<section class="slider">
		<ul>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</section>
	<section class="menu">
		<ul>
			<li class="menu__item">
				<label class="menu__title" for="btn_about">Обо мне</label>
				<input type="checkbox" name="menu_rule" id="btn_about">
				<article id="about" class="menu__body">
					<div class="content">
						<h1>Серикбай Нургельди</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quis natus obcaecati!</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus qui doloribus eius cupiditate maxime quos architecto, commodi necessitatibus hic iste eaque molestiae sunt dolore? Esse aut corporis iusto vitae iste delectus, cum fugit consectetur!</p>
					</div>
				</article>
			</li>
			<li class="menu__item">
				<label class="menu__title" for="btn_skills">Навыки</label>
				<input type="checkbox" name="menu_rule" id="btn_skills">
				<article id="skills" class="menu__body">
					<div class="content">
						<ul>
							<li class="html"><span>80 % <span>HTML</span></span></li>
							<li class="css"><span>80 % <span>CSS</span></span></li>
							<li class="js"><span>64 % <span>JavaScript</span></span></li>
							<li class="py"><span>38 % <span>Python</span></span></li>
						</ul>
					</div>
				</article>
			</li>
			<li class="menu__item">
				<label class="menu__title" for="btn_templates">Шаблоны</label>
				<input type="checkbox" name="menu_rule" id="btn_templates">
				<article id="sites" class="menu__body">
					<div class="content">
						<ul class="products">
							<li>
								<a href="projects/templates/blow/index.html">blow</a>
								<div class="img_wrap">
									<iframe src="projects/templates/blow/index.html"></iframe>
								</div>
							</li>
							<li>
								<a href="projects/templates/creativia/index.html">creativia</a>
								<div class="img_wrap">
									<iframe src="projects/templates/creativia/index.html"></iframe>
								</div>
							</li>
							<li>
								<a href="projects/templates/logo/index.html">logo</a>
								<div class="img_wrap">
									<iframe src="projects/templates/logo/index.html"></iframe>
								</div>
							</li>
							<li>
								<a href="projects/templates/mercury/index.html">mercury</a>
								<div class="img_wrap">
									<iframe src="projects/templates/mercury/index.html"></iframe>
								</div>
							</li>
							<li>
								<a href="projects/templates/tourism/index.html">tourism</a>
								<div class="img_wrap">
									<iframe src="projects/templates/tourism/index.html"></iframe>
								</div>
							</li>
							<li>
								<a href="projects/templates/elements/index.html">elements</a>
								<div class="img_wrap">
									<iframe src="projects/templates/elements/index.html"></iframe>
								</div>
							</li>
						</ul>
					</div>
				</article>
			</li>
			<li class="menu__item">
				<label class="menu__title" for="btn_games">Игры</label>
				<input type="checkbox" name="menu_rule" id="btn_games">
				<article id="games" class="menu__body">
					<div class="content">
						<ul class="products">
							<li>
								<a href="projects/games/snake/index.html">snake</a>
							</li>
							<li>
								<a href="projects/games/dog_runner/index.html">runner</a>
							</li>
						</ul>
					</div>
				</article>
			</li>
			<li class="menu__item">
				<label class="menu__title" for="btn_others">Прочие</label>
				<input type="checkbox" name="menu_rule" id="btn_others">
				<article id="others" class="menu__body">
					<div class="content">
						<ul class="products">
							<li>
								<a href="projects/others/calculate/calc.html">calculator</a>
							</li>
							<li>
								<a href="projects/others/coordinate_system/index.html">coordinate system</a>
							</li>
						</ul>
					</div>
				</article>
			</li>
			<li class="menu__item">
				<label class="menu__title" for="btn_contact">Контакты</label>
				<input type="checkbox" name="menu_rule" id="btn_contact">
				<article id="contact" class="menu__body">
					<div class="content">
						<p>Tel:  <a href="tel:+77073416054">+7 707 341 60 54</a></p>
						<p>Email:  <a href="mailto:nurik_95s@mail.ru">nurik_95s@mail.ru</a></p>
					</div>
				</article class="menu__body">
			</li>
		</ul>
	</section>
</body>
</html>