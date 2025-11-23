'use strict';

const game = document.querySelector('.game');
const ctx = game.getContext('2d');
const size = document.querySelector(".size");

const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);
const uid = function () {
	return (
		Date.now().toString(36) +
		Math.random().toString(36).substring(2, 12).padStart(12, 0)
	);
};

const gracz = { x: game.width, y: game.height, w: 50, h: 50 };
const keys = {};

const points = [];

function resize() {
	game.width = window.innerWidth;
	game.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('keydown', (e) => {
	keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
	keys[e.key] = false;
});

setInterval(() => {
	const point = {
		id: uid(),
		x: randomInt(0, game.width),
		y: randomInt(0, game.height),
		width: 20,
		height: 20,
		color: 'yellow',
	};

	points.push(point);
}, 2000);

function draw() {
	ctx.clearRect(0, 0, game.width, game.height);

	ctx.fillStyle = 'black';
	ctx.fillRect(gracz.x - gracz.w / 2, gracz.y - gracz.h / 2, gracz.h, gracz.w);

	requestAnimationFrame(draw);

	points.forEach((point) => {
		ctx.fillStyle = point.color;
		ctx.fillRect(point.x - 10, point.y - 10, point.width, point.height);
	});

	if (keys['w']) {
		if (gracz.y - gracz.h / 2 > 0) {
			gracz.y -= 10;
		}
	}

	if (keys['a']) {
		if (gracz.x - gracz.w / 2 > 0) {
			gracz.x -= 10;
		}
	}

	if (keys['d']) {
		if (gracz.x + gracz.w / 2 < game.width) {
			gracz.x += 10;
		}
	}

	if (keys['s']) {
		if (gracz.y + gracz.h / 2 < game.height) {
			gracz.y += 10;
		}
	}

	checkTouch();
	size.textContent = `Rozmiar: ${gracz.w * gracz.h}px`
}

draw();

function checkTouch() {

  const placePlayer = {
    left: gracz.x - gracz.w / 2,
    right: gracz.x + gracz.w / 2,
    top: gracz.y - gracz.h / 2,
    bottom: gracz.y + gracz.h / 2
  };

  for (let i = points.length - 1; i >= 0; i--) {
    const point = points[i];

    const placePoint = {
      left: point.x - point.width / 2,
      right: point.x + point.width / 2,
      top: point.y - point.height / 2,
      bottom: point.y + point.height / 2,
    };

    if (placePoint.right < placePlayer.left) continue;
    if (placePoint.left > placePlayer.right) continue;
    if (placePoint.bottom < placePlayer.top) continue;
    if (placePoint.top > placePlayer.bottom) continue;

    gracz.w += 5;
    gracz.h += 5;

    points.splice(i, 1);
  }
}