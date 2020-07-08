const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let scale = 10;
canvas.width = canvas.height = 21 * scale;

// SVG
let snakeHeadUP = new Image();
snakeHeadUP.src = 'img/snake-head-up.svg';

let snakeHeadLEFT = new Image();
snakeHeadLEFT.src = 'img/snake-head-left.svg';

let snakeHeadDOWN = new Image();
snakeHeadDOWN.src = 'img/snake-head-down.svg';

let snakeHeadRIGHT = new Image();
snakeHeadRIGHT.src = 'img/snake-head-right.svg';

let snakeHead = snakeHeadUP;

let snakeBG = new Image();
snakeBG.src = 'img/bg.svg';

// objects
let fruit = { x: 1, y: 1 };

let snake = [];
for (let j = 0; j < 3; j++) {
	snake.push( { x: 11 , y: 11 + j } );
}

let intervalMove;
let direction = { x: 0, y: -1 };
let justChanged = true;

// snake move
function move() {

	justChanged = false;
	snake.unshift({x: snake[0].x + direction.x, y: snake[0].y + direction.y});

	// walls detection
	for (let j = 0; j < snake.length; j++) {
		if (snake[j].x < 0) snake[j].x = 20;
		if (snake[j].x > 20) snake[j].x = 0;
		if (snake[j].y < 0) snake[j].y = 20;
		if (snake[j].y > 20) snake[j].y = 0;
	}

	// fruit detection && position randomization
	if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
		do { fruit.x = fruit.y = Math.floor(Math.random() * 21);
		} while (snake.find(obj => obj.x === fruit.x && obj.y === fruit.y ));
	} else {
		snake.pop();
	}

	// snake body hit detection
	for (let j = 1; j < snake.length; j++) {
		if (snake[0].x === snake[j].x && snake[0].y === snake[j].y) {
			clearInterval(intervalMove);
		}
	}

	draw();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < canvas.width/scale; i++) {
		for (let j = 0; j < canvas.height/scale; j++) {
			ctx.drawImage(snakeBG, scale * i, j * scale, scale, scale);
		}
	}

	// snake draw
	for (let j = 0; j < snake.length; j++) {
		ctx.fillStyle = '#4CAD00';
		j === 0 ?
			ctx.drawImage(snakeHead, snake[j].x * scale, snake[j].y * scale, scale, scale)
			: ctx.fillRect(snake[j].x * scale, snake[j].y * scale, scale, scale);
	}

	// fruit draw
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(fruit.x * scale, fruit.y * scale, scale, scale);


}

intervalMove = setInterval(move, 600);

// keyboard events && direction detection
addEventListener( "keydown", e => { switch(e.key) {
	case 'ArrowUp':
		if ( direction.y !== 1 && justChanged === false ) {
			snakeHead = snakeHeadUP;
			justChanged = true;
			direction = {x: 0, y: -1};
		}
		break;
	case 'ArrowRight':
		if ( direction.x !== -1 && justChanged === false ) {
			snakeHead = snakeHeadRIGHT;
			justChanged = true;
			direction = {x: 1, y: 0};
		}
		break;
	case 'ArrowLeft':
		if ( direction.x !== 1 && justChanged === false ) {
			snakeHead = snakeHeadLEFT;
			justChanged = true;
			direction = {x: -1, y: 0};
		}
		break;
	case 'ArrowDown':
		snakeHead = snakeHeadDOWN;
		if ( direction.y !== -1 && justChanged === false ) {
			justChanged = true;
			direction = {x: 0, y: 1};
		}
		break;
}});












