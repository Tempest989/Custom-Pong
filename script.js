class Paddle {
	constructor(side) {
		if (side === "right")
			this.x = pongCanvas.width * 0.95;
		else 
			this.x = pongCanvas.width * 0.05;
		this.y = pongCanvas.height * 0.45;
		this.width = pongCanvas.width * 0.01;
		this.height = pongCanvas.height * 0.15;
		this.speed = pongCanvas.height * 0.05;
		this.side = side;
		this.score = 0;
	}

	reset = (scoreReset = 0, side) => {
		if (this.side === "right")
			this.x = pongCanvas.width * 0.95;
		else
			this.x = pongCanvas.width * 0.05;
		this.y = pongCanvas.height * 0.425;
		this.width = pongCanvas.width * 0.01;
		this.height = pongCanvas.height * 0.15;
		this.speed = pongCanvas.height * 0.05;
		this.side = side;
		if (scoreReset)
			this.score = 0;
	}

	render = () => {
		pong.fillStyle = "#FF0000";
		pong.font = `${pongCanvas.height * 0.0375}px Arial`;
		if (this.side === "left") {
			if (!effectFlags[1]) {
				if (!effectFlags[5])
					pong.fillRect(this.x - this.width, this.y, this.width, this.height);
				else {
					pong.fillRect(this.x - this.width, 0, this.width, this.y);
					pong.fillRect(this.x - this.width, this.y + this.height, this.width, pongCanvas.height - this.y - this.height);
				}
			}
			pong.fillText(this.score, pongCanvas.width * 0.01, pongCanvas.height * 0.5);
			pong.fillText("P1", pongCanvas.width * 0.01, pongCanvas.height * 0.9);
			if (!effectFlags[3]) {
				if (!effectFlags[4]) {
					pong.fillText("W", pongCanvas.width * 0.01, pongCanvas.height * 0.25);
					pong.fillText("S", pongCanvas.width * 0.01, pongCanvas.height * 0.75);
				}
				else {
					pong.fillStyle = "#00FF7F";
					pong.fillText("S", pongCanvas.width * 0.01, pongCanvas.height * 0.25);
					pong.fillText("W", pongCanvas.width * 0.01, pongCanvas.height * 0.75);
				}
			} 
			else if (!effectFlags[4]) {
				pong.fillStyle = "#00FF7F";
				pong.fillText("⇧", pongCanvas.width * 0.01, pongCanvas.height * 0.25);
				pong.fillText("⇩", pongCanvas.width * 0.01, pongCanvas.height * 0.75);
			} 
			else {
				pong.fillStyle = "#00FF7F";
				pong.fillText("⇩", pongCanvas.width * 0.01, pongCanvas.height * 0.25);
				pong.fillText("⇧", pongCanvas.width * 0.01, pongCanvas.height * 0.75);
			}
		}
		else {
			if (!effectFlags[1]) {
				if (!effectFlags[5])
					pong.fillRect(this.x, this.y, this.width, this.height);
				else {
					pong.fillRect(this.x, 0, this.width, this.y);
					pong.fillRect(this.x, this.y + this.height, this.width, pongCanvas.height - this.y - this.height);
				}
			}
			pong.fillText(this.score, pongCanvas.width * 0.965, pongCanvas.height * 0.5);
			pong.fillText("P2", pongCanvas.width * 0.965, pongCanvas.height * 0.9);
			if (!effectFlags[3]) {
				if (!effectFlags[4]) {
					pong.fillText("⇧", pongCanvas.width * 0.965, pongCanvas.height * 0.25);
					pong.fillText("⇩", pongCanvas.width * 0.965, pongCanvas.height * 0.75);
				}
				else {
					pong.fillStyle = "#00FF7F";
					pong.fillText("⇩", pongCanvas.width * 0.965, pongCanvas.height * 0.25);
					pong.fillText("⇧", pongCanvas.width * 0.965, pongCanvas.height * 0.75);
				}
			} 
			else if (!effectFlags[4]) {
				pong.fillStyle = "#00FF7F";
				pong.fillText("W", pongCanvas.width * 0.965, pongCanvas.height * 0.25);
				pong.fillText("S", pongCanvas.width * 0.965, pongCanvas.height * 0.75);
			} 
			else {
				pong.fillStyle = "#00FF7F";
				pong.fillText("S", pongCanvas.width * 0.965, pongCanvas.height * 0.25);
				pong.fillText("W", pongCanvas.width * 0.965, pongCanvas.height * 0.75);
			}
		}
	}

	collision = (ball) => {
		// console.log("checking ", this.side, " paddle collision with ball...");
		if (this.side === "right" && ball.speed[0] > 0 && ball.x + ball.radius + ball.speed[0] > this.x && checkIntesect([ball.x, ball.y], [ball.x + ball.speed[0], ball.y + ball.speed[1]], [this.x, this.y - pongCanvas.height * 0.01], [this.x, this.y + this.height + pongCanvas.height * 0.01])) {
			if (effectFlags[5]) {
				// console.log("goal scored!!");
				// ball.reset();
				if (balls.length > 1) {
					for (let i = 0; i < balls.length; ++i) {
						if (balls[i].x === ball.x && balls[i].y === ball.y) {
							balls[i] = null;
							break;
						}
					}
					this.score--;
				}
				else {
					this.score--;
					resetPong();
				}
				return (true);
			}
			ball.speed[0] *= -1;
			ball.x += (this.x - ball.x) * 2;
			if (bounciness > 1) {
				ball.speed[0] *= bounciness;
				ball.speed[1] *= bounciness;
			}
			// console.log(this.side, " Paddle has made collision with ball");
			return (true);
		}
		else if (this.side === "left" && ball.speed[0] < 0 && ball.x - ball.radius + ball.speed[0] < this.x && checkIntesect([ball.x, ball.y], [ball.x + ball.speed[0], ball.y + ball.speed[1]], [this.x, this.y - pongCanvas.height * 0.01], [this.x, this.y + this.height + pongCanvas.height * 0.01])) {
			if (effectFlags[5]) {
				// console.log("goal scored!!");
				// ball.reset();
				if (balls.length > 1) {
					for (let i = 0; i < balls.length; ++i) {
						if (balls[i].x === ball.x && balls[i].y === ball.y) {
							balls[i] = null;
							break;
						}
					}
					this.score--;
				}
				else {
					this.score--;
					resetPong();
				}
				return (true);
			}
			ball.speed[0] *= -1;
			ball.x -= (ball.x - this.x) * 2;
			if (bounciness > 1) {
				ball.speed[0] *= bounciness;
				ball.speed[1] *= bounciness;
			}
			// console.log(this.side, " Paddle has made collision with ball");
			return (true);
		}
		// console.log("returning false for ball - ", this.side, " paddle collision");
		return (false);
	}

	moveTouch = (touch) => {
		this.y = touches[touch].clientY - (this.height / 2);
		if (effectFlags[4]) {
			this.y = (pongCanvas.height / 2) + ((pongCanvas.height / 2) - this.y);
		}
		if (this.y < 0)
			this.y = 0;
		else if (this.y + this.height > pongCanvas.height)
			this.y = pongCanvas.height - this.height;
	}

	moveUp = () => {
		if (this.y - this.speed <= 0)
			this.y = 0;
		else
			this.y -= this.speed;
	}
	moveDown = () => {
		if (this.y + this.height + this.speed >= pongCanvas.height)
			this.y = pongCanvas.height - this.height;
		else
			this.y += this.speed;
	}

	winner = (callReset = 1) => {
		this.score++;
		// console.log(this.side, " Paddle has won this round");
		if ((!chaos && this.score === 10) || this.score >= 100) {
			playFlag = false;
			playButtons.classList.remove("hidden");
			pauseButtons[0].classList.add("hidden");
			pauseButtons[1].classList.add("hidden");
			// not sure if reset add hidden is necessary here.
			resetButtons[0].classList.add("hidden");
			resetButtons[1].classList.add("hidden");
			startedFlag = false;
			return;
		}
		if (callReset) 
			resetPong();
	}
}

class Ball {
	constructor() {
		this.x = pongCanvas.width * 0.5;
		this.y = pongCanvas.height * 0.5;
		this.radius = pongCanvas.width * 0.005;
		this.speed = [0, 0];
		this.randomizeSpeed();
	}

	reset = () => {
		this.x = pongCanvas.width * 0.5;
		this.y = pongCanvas.height * 0.5;
		this.radius = pongCanvas.width * 0.005;
		this.randomizeSpeed();
	}

	randomizeSpeed = () => {
		this.speed = [0,0];
		this.speed[0] = (Math.random() * pongCanvas.width * 0.01) + (pongCanvas.width * 0.002);
		if (Math.round(Math.random()))
			this.speed[0] *= -1;
		this.speed[1] = (Math.random() * pongCanvas.height * 0.01) + (pongCanvas.height * 0.002);
		if (Math.round(Math.random()))
			this.speed[1] *= -1;
	}

	updatePosition = () => {
		this.x += this.speed[0];
		this.y += this.speed[1];
	}

	wallCollision = () => {
		if (this.y + this.speed[1] < 0) {
			this.speed[1] *= -1;
			this.y -= this.y * 2;
			if (bounciness > 1) {
				this.speed[0] *= bounciness;
				this.speed[1] *= bounciness;
			}
			// console.log("ball has made collision with wall");
			return (true);
		}
		else if (this.y + this.speed[1] > pongCanvas.height) {
			this.speed[1] *= -1;
			this.y += (pongCanvas.height - this.y) * 2;
			if (bounciness > 1) {
				this.speed[0] *= bounciness;
				this.speed[1] *= bounciness;
			}
			// console.log("ball has made collision with wall");
			return (true);
		}
		// console.log("returning false ball - wall collision");
		return (false);
	}

	endZoneCollision = () => {
		if (this.x + this.speed[0] < pongCanvas.width * 0.05) {
			if (effectFlags[5]) {
				this.speed[0] *= -1;
				if (bounciness > 1) {
					this.speed[0] *= bounciness;
					this.speed[1] *= bounciness;
				}
				// console.log(this.side, " Paddle has made collision with ball");
				return (true);
			}
			// console.log("goal scored!!");
			// this.reset();
			if (balls.length > 1) {
				for (let i = 0; i < balls.length; ++i) {
					if (balls[i].x === this.x && balls[i].y === this.y) {
						balls[i] = null;
						break;
					}
				}
				rightPaddle.winner(0);
			}
			else
				rightPaddle.winner();
			return (true);
		}
		else if (this.x + this.speed[0] > pongCanvas.width * 0.95) {
			if (effectFlags[5]) {
				this.speed[0] *= -1;
				if (bounciness > 1) {
					this.speed[0] *= bounciness;
					this.speed[1] *= bounciness;
				}
				// console.log(this.side, " Paddle has made collision with ball");
				return (true);
			}
			// console.log("goal scored!!");
			// this.reset();
			if (balls.length > 1) {
				for (let i = 0; i < balls.length; ++i) {
					if (balls[i].x === this.x && balls[i].y === this.y) {
						balls[i] = null;
						break;
					}
				}
				leftPaddle.winner(0);
			}
			else
				leftPaddle.winner();
			return (true);
		}
		return (false);
	}

	render = () => {
		pong.beginPath();
		pong.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		pong.fillStyle = 'green';
		pong.fill();
		pong.lineWidth = 5;
		pong.strokeStyle = '#003300';
		pong.stroke();
	}

	renderBlackOut = () => {
		pong.beginPath();
		pong.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		pong.fillStyle = 'white';
		pong.fill();
		pong.lineWidth = 5;
		pong.strokeStyle = 'white';
		pong.stroke();
	}
}

class Obstacle {

	constructor(topLeft, width, height, points) {
		this.points = points;
		this.topLeft = topLeft;
		this.width = this.topLeft[0] + width;
		this.height = this.topLeft[1] + height;
	}

	checkBounds = (ball) => {
		let closestPoint = [0,0];

		if (this.topLeft[0] >= ball.x)
			closestPoint[0] = this.topLeft[0];
		else if (this.width <= ball.x)
			closestPoint[0] = this.width;
		else
			closestPoint[0] = ball.x;

		if (this.topLeft[1] >= ball.y)
			closestPoint[1] = this.topLeft[1];
		else if (this.height <= ball.y)
			closestPoint[1] = this.height;
		else
			closestPoint[1] = ball.y;
		
		return (Math.sqrt(Math.pow((closestPoint[1] - ball.y), 2) + Math.pow((closestPoint[0] - ball.x), 2)) <= Math.sqrt(Math.pow((ball.speed[1]), 2) + Math.pow((ball.speed[0]), 2)));
	}

	checkLineSide = (start, end, ballStart) => {
		return (((end[1] - start[1]) * (ballStart[0] - end[0])) - ((end[0] - start[0]) * (ballStart[1] - end[1])) < 0 ? false : true);
	}

	checkIntersect = (start1, end1, start2, end2) => {
		let collinearFlag = 0;
		// console.log("checkInteresect Called: 1 = [", start1, ", ", end1, "] :: 2 = [", start2, ", ", end2, "]");
		if (!checkOrientation(start1, end1, end2, collinearFlag) && checkOrientation(start2, end2, start1, collinearFlag) != checkOrientation(start2, end2, end1, collinearFlag))
			return (collinearFlag < 2);
		return (false);
	}

	findIntersect = (lineStart, lineEnd, ballStart, ballEnd) => {
		const alpha = (((ballEnd[0] - ballStart[0]) * (ballStart[1] - lineStart[1])) - ((ballEnd[1] - ballStart[1]) * (ballStart[0] - lineStart[0]))) / (((ballEnd[0] - ballStart[0]) * (lineEnd[1] - lineStart[1])) - ((ballEnd[1] - ballStart[1]) * (lineEnd[0] - lineStart[0])));
		return ([lineStart[0] + (alpha * (lineEnd[0] - lineStart[0])), lineStart[1] + (alpha * (lineEnd[1] - lineStart[1]))]);
	}

	collisionCheck = (ball, ballUpdated, previousIntersect = null) => {
		let closestPoint = null;
		const pointsWithinRange = [];
		const ballStart = previousIntersect === null ? [ball.x, ball.y] : previousIntersect;
		for (let i = 0; i < this.points.length - 1; ++i) {
			if (this.checkLineSide(this.points[i], this.points[i+1], ballStart))
				pointsWithinRange.push(i);
		}
		if (this.checkLineSide(this.points[this.points.length - 1], this.points[0], ballStart))
			pointsWithinRange.push(this.points.length - 1);

		// console.log("points within range = ", pointsWithinRange);
		// console.log("first for loop collisionCheck done");
		if (pointsWithinRange.length === 0)
			return (null);
		for (let i = 0; i < pointsWithinRange.length-1; ++i) {
			if (this.checkIntersect(this.points[pointsWithinRange[i]], this.points[pointsWithinRange[i] + 1], ballStart, ballUpdated)) {
				const temp = this.findIntersect(this.points[pointsWithinRange[i]], this.points[pointsWithinRange[i] + 1], ballStart, ballUpdated);
				const tempDistance = distance2Points(temp, ballUpdated);
				if (closestPoint === null || tempDistance < closestPoint[1])
					closestPoint = [temp, tempDistance, pointsWithinRange[i]];
			}
		}

		// console.log("second for loop collisionCheck done");
		// console.log("checking if condition: last point within range = ", pointsWithinRange[pointsWithinRange.length-1], " :: point length = ", this.points.length);
		if (pointsWithinRange[pointsWithinRange.length - 1] === this.points.length-1) {
			if (this.checkIntersect(this.points[this.points.length - 1], this.points[0], ballStart, ballUpdated)) {
				const temp = this.findIntersect(this.points[this.points.length - 1], this.points[0], ballStart, ballUpdated);
				const tempDistance = distance2Points(temp, ballUpdated);
				if (closestPoint === null || tempDistance < closestPoint[1])
					return([temp, tempDistance, pointsWithinRange[pointsWithinRange.length - 1]]);
			}
		}
		else if (this.checkIntersect(this.points[pointsWithinRange[pointsWithinRange.length-1]], this.points[pointsWithinRange[pointsWithinRange.length-1] + 1], ballStart, ballUpdated)) {
			const temp = this.findIntersect(this.points[pointsWithinRange[pointsWithinRange.length - 1]], this.points[pointsWithinRange[pointsWithinRange.length - 1] + 1], ballStart, ballUpdated);
			const tempDistance = distance2Points(temp, ballUpdated);
			if (closestPoint === null || tempDistance < closestPoint[1])
				return ([temp, tempDistance, pointsWithinRange[pointsWithinRange.length - 1]]);
		}
		return (closestPoint);
	}

	render = () => {
		// console.log("rendering obstacle");
		pong.fillStyle = "#0000FF";
		pong.beginPath();
		pong.moveTo(this.points[0][0], this.points[0][1]);
		for (let i = 1; i < this.points.length; ++i)
			pong.lineTo(this.points[i][0], this.points[i][1]);
		// pong.lineTo(this.points[0][0], this.points[0][1]);
		pong.fill();
	}
}

class Powerup {
	constructor() {
		this.x = (Math.random() * pongCanvas.width * 0.6) + (pongCanvas.width * 0.2);
		this.y = (Math.random() * pongCanvas.height * 0.9) + (pongCanvas.height * 0.05);
		this.width = pongCanvas.width * 0.05;
		this.height = pongCanvas.height * 0.05;
		this.speed = [0, 0];
		this.randomizeSpeed();
		this.effect = null;
		this.effectActivation = null;
		this.randomizeEffect();
	}

	randomizeSpeed = () => {
		this.speed = [0,0];
		this.speed[0] = (Math.random() * pongCanvas.width * 0.005) + (pongCanvas.width * 0.0001);
		if (Math.round(Math.random()))
			this.speed[0] *= -1;
		this.speed[1] = (Math.random() * pongCanvas.height * 0.005) + (pongCanvas.height * 0.001);
		if (Math.round(Math.random()))
			this.speed[1] *= -1;
	}

	randomizeEffect = () => {
		const effects = ["NON", "SPB", "SPP", "MTB", "BKO", "FRZ", "BNC", "NOP", "NOB", "SWP", "IVP", "IVE", "SRK", "BBL", "SRP", "BBP", "LAG", "IVO", "OSW"];
		const effectActivations = [()=>{return(1)}, ballSpeedUp, paddleSpeedUp, multipleBallSpawner, blackOut, freezePaddles, bouncyBalls, invisPaddles, invisBalls, swapControls, invertControls, switchEndzonePaddles, shrinkBalls, enlargeBalls, shrinkPaddles, enlargePaddles, createLag, invisObstacles, swapObstacles];
		let randomize;
		if (typeFlag != 3)
			randomize = Math.floor(Math.random() * (effects.length - 2));
		else 
			randomize = Math.floor(Math.random() * effects.length);
		// randomize = 9;
		this.effect = effects[randomize];
		this.effectActivation = effectActivations[randomize];
		// this.effectActivation();
	}

	updatePosition = () => {
		this.x += this.speed[0];
		this.y += this.speed[1];
	}

	wallCollision = () => {
		if (this.y <= 0 || this.y >= pongCanvas.height) {
			this.speed[1] *= -1;
			// console.log("powerup has made collision with top-bottom wall");
			return (true);
		}
		else if (this.x <= pongCanvas.width * 0.2 || this.x >= pongCanvas.width * 0.8) {
			this.speed[0] *= -1;
			// console.log("powerup has made collision with left-right wall");
			return (true);
		}
		return (false);
	}

	ballCollision = (ball) => {
		let closestPoint = [0,0];

		if (this.x >= ball.x)
			closestPoint[0] = this.x;
		else if (this.x + this.width <= ball.x)
			closestPoint[0] = this.x + this.width;
		else
			closestPoint[0] = ball.x;

		if (this.y >= ball.y)
			closestPoint[1] = this.y;
		else if (this.y + this.height <= ball.y)
			closestPoint[1] = this.y + this.height;
		else
			closestPoint[1] = ball.y;
		
		if (Math.sqrt(Math.pow((closestPoint[1] - ball.y), 2) + Math.pow((closestPoint[0] - ball.x), 2)) <= Math.sqrt(Math.pow((ball.speed[1]), 2) + Math.pow((ball.speed[0]), 2))) {
			this.effectActivation();
			if (chaos)
				multipleBallSpawner();
			return (true);
		}
		return (false);
	}

	pathSegmentCollision = (segment) => {
		let closestPoint = [0,0];

		if (this.x >= segment[0])
			closestPoint[0] = this.x;
		else if (this.x + this.width <= segment[0])
			closestPoint[0] = this.x + this.width;
		else
			closestPoint[0] = segment[0];

		if (this.y >= segment[1])
			closestPoint[1] = this.y;
		else if (this.y + this.height <= segment[1])
			closestPoint[1] = this.y + this.height;
		else
			closestPoint[1] = segment[1];
		
		if (Math.sqrt(Math.pow((closestPoint[1] - segment[1]), 2) + Math.pow((closestPoint[0] - segment[0]), 2)) <= Math.sqrt(Math.pow((segment[1] - segment[3]), 2) + Math.pow((segment[0] - segment[2]), 2))) {
			this.effectActivation();
			if (chaos)
				multipleBallSpawner();
			return (true);
		}
		return (false);
	}

	render = () => {
		pong.fillStyle = "#FF0000";
		pong.fillRect(this.x, this.y, this.width, this.height);
		pong.font = `${this.height / 0.75}px Arial`;
		pong.fillStyle = "#000000";
		pong.fillText(this.effect, this.x, this.y+(this.height * 0.975), this.width);
	}
}

const reflectBall = (ball, ballEnd, lineStart, lineEnd) => {
	// console.log("ball = ", ball.x, ", ", ball.y, "] :: ballEnd = ", ballEnd, " :: lineStart = ", lineStart, " :: lineEnd = ", lineEnd);

	if (lineStart[0] === lineEnd[0]) {
		if (ball.x > lineStart[0])
			ball.x -= (ball.x - lineStart[0]) * 2;
		else
			ball.x += (lineStart[0] - ball.x) * 2;
		ball.speed[0] *= -1;
		// console.log("ball has made collision with straight VERTICAL (X1==X2) LINE");
	}
	else if (lineStart[1] === lineEnd[1]) {
		if (ball.y > lineStart[1])
			ball.y -= (ball.y - lineStart[1]) * 2;
		else
			ball.y += (lineStart[1] - ball.y) * 2;
		ball.speed[1] *= -1;
		// console.log("ball has made collision with straight HORIZONTAL (Y1==Y2) LINE");
	}
	else {
		const slope = (lineEnd[1] - lineStart[1]) / (lineEnd[0] - lineStart[0]);
		const yIntercept = ((lineEnd[0] * lineStart[1]) - (lineStart[0] * lineEnd[1])) / (lineEnd[0] - lineStart[0]);

		let d = (ball.x + ((ball.y - yIntercept) * slope)) / (1 + Math.pow(slope, 2));

		// console.log("slope = ", slope, " :: yIntercept = ", yIntercept, " :: d = ", d);

		// console.log("OLd ball POSITION = [", ball.x, ", ", ball.y, "]");
		ball.x = (2 * d) - ball.x;
		ball.y = (2 * d * slope) - ball.y + (2 * yIntercept);
		// console.log("NEW ball POSITION = [", ball.x, ", ", ball.y, "]");

		d = (ballEnd[0] + ((ballEnd[1] - yIntercept) * slope)) / (1 + Math.pow(slope, 2));

		ballEnd[0] = (2 * d) - ballEnd[0];
		ballEnd[1] = (2 * d * slope) - ballEnd[1] + (2 * yIntercept);

		// console.log("Old ball SPEED = [", ball.speed[0], ", ", ball.speed[1], "]");
		ball.speed[0] = ballEnd[0] - ball.x;
		ball.speed[1] = ballEnd[1] - ball.y;
		// console.log("NEW ball SPEED = [", ball.speed[0], ", ", ball.speed[1], "]");
	}
	if (bounciness > 1) {
		ball.speed[0] *= bounciness;
		ball.speed[1] *= bounciness;
	}
}

const checkOrientation = (start, end, rotation, collinearFlag) => {
	const output = ((end[1] - start[1]) * (rotation[0] - end[0])) - ((end[0] - start[0]) * (rotation[1] - end[1]));
	if (output === 0) {
		collinearFlag++;
		return (0);
	}
	return (output > 0 ? 1 : 0);
}

const checkIntesect = (start1, end1, start2, end2) => {
	let collinearFlag = 0;
	if (checkOrientation(start1, end1, start2, collinearFlag) != checkOrientation(start1, end1, end2, collinearFlag) && checkOrientation(start2, end2, start1, collinearFlag) != checkOrientation(start2, end2, end1, collinearFlag))
		return (collinearFlag < 2);
	return (false);
}

const distance2Points = (point1, point2) => {
	return (Math.sqrt(Math.pow((point2[1] - point1[1]), 2) + Math.pow((point2[0] - point1[0]), 2)));
}

const ballSpeedUp = () => {
	for (let i = 0; i < balls.length; ++i) {
		balls[i].speed[0] *= (Math.random() * 4) + 1;
		balls[i].speed[1] *= (Math.random() * 4) + 1;
	}
}

const paddleSpeedUp = () => {
	const randomize = (Math.random() * 4) + 1;
	leftPaddle.speed *= randomize;
	rightPaddle.speed *= randomize;
}

const multipleBallSpawner = () => {
	const numSpawn = Math.ceil(Math.random() * 4) + 1;
	for (let i = 0; i < numSpawn; ++i)
		balls.push(new Ball());
}

const freezePaddles = () => {
	freezeDelay = Math.ceil(Math.random() * 400);
}

const bouncyBalls = () => {
	bounciness = Math.random() + 1;
}

const shrinkBalls = () => {
	for (let i = 0; i < balls.length; ++i)
		balls[i].radius /= (Math.random() * 4) + 1;
}

const enlargeBalls = () => {
	for (let i = 0; i < balls.length; ++i) {
		balls[i].radius *= (Math.random() * 4) + 1;
		if (balls[i].radius > (pongCanvas.height - leftPaddle.height) * 2 / 3)
			balls[i].radius = (pongCanvas.height - leftPaddle.height) * 2 / 3;
	}
}

const shrinkPaddles = () => {
	const randomize = (Math.random() * 4) + 1;
	leftPaddle.height /= randomize;
	rightPaddle.height /= randomize;
}

const enlargePaddles = () => {
	const randomize = (Math.random() * 4) + 1;
	leftPaddle.height *= randomize;
	rightPaddle.height *= randomize;
	if (leftPaddle.height > pongCanvas.height * 0.8) {
		leftPaddle.height = pongCanvas.height * 0.8;
		rightPaddle.height = pongCanvas.height * 0.8;
	}
}

const swapObstacles = () => {
	customObstacles(Math.floor(Math.random() * 11));
}

const blackOut = () => {
	effectFlags[0] = !effectFlags[0];
}

const invisPaddles = () => {
	effectFlags[1] = !effectFlags[1];
}

const invisBalls = () => {
	effectFlags[2] = !effectFlags[2];
}

const swapControls = () => {
	effectFlags[3] = !effectFlags[3];
}

const invertControls = () => {
	effectFlags[4] = !effectFlags[4];
}

const switchEndzonePaddles = () => {
	effectFlags[5] = !effectFlags[5];
}

const createLag = () => {
	if (effectFlags[6])
		effectFlags[6] = false;
	else
		effectFlags[6] = Math.ceil(Math.random() * 25) + 10;
	// console.log("Lag created = ", effectFlags[6]);
}

const invisObstacles = () => {
	effectFlags[7] = !effectFlags[7];
}

const customObstacles = (toLoad) => {
	obstacles.length = 0;
	switch (toLoad) {
		case 0:
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, pongCanvas.height * 0.25], pongCanvas.width * 0.5, pongCanvas.height * 0.5, [[pongCanvas.width * 0.25, pongCanvas.height * 0.25], [pongCanvas.width * 0.75, pongCanvas.height * 0.25], [pongCanvas.width * 0.75, pongCanvas.height * 0.75], [pongCanvas.width * 0.25, pongCanvas.height * 0.75]]));
			break;
		case 1:
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, pongCanvas.height * 0.25], pongCanvas.width * 0.5, pongCanvas.height * 0.5, [[pongCanvas.width * 0.5, pongCanvas.height * 0.25], [pongCanvas.width * 0.75, pongCanvas.height * 0.5], [pongCanvas.width * 0.5, pongCanvas.height * 0.75], [pongCanvas.width * 0.25, pongCanvas.height * 0.5]]));
			break;
		case 2:
			obstacles.push(new Obstacle([pongCanvas.width * 0.5, pongCanvas.height * 0.25], pongCanvas.width * 0.000001, pongCanvas.height * 0.5, [[pongCanvas.width * 0.5, pongCanvas.height * 0.25], [pongCanvas.width * 0.500001, pongCanvas.height * 0.25], [pongCanvas.width * 0.500001, pongCanvas.height * 0.75], [pongCanvas.width * 0.5, pongCanvas.height * 0.75]])); 
			break;
		case 3:
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, 0], pongCanvas.width * 0.5, pongCanvas.height * 0.2, [[pongCanvas.width * 0.25, 0], [pongCanvas.width * 0.75, 0], [pongCanvas.width * 0.75, pongCanvas.height * 0.2], [pongCanvas.width * 0.25, pongCanvas.height * 0.2]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, pongCanvas.height * 0.8], pongCanvas.width * 0.5, pongCanvas.height * 0.2, [[pongCanvas.width * 0.25, pongCanvas.height * 0.8], [pongCanvas.width * 0.75, pongCanvas.height * 0.8], [pongCanvas.width * 0.75, pongCanvas.height], [pongCanvas.width * 0.25, pongCanvas.height]]));
			break;
		case 4:
			obstacles.push(new Obstacle([pongCanvas.width * 0.1, 0], pongCanvas.width * 0.8, pongCanvas.height * 0.2, [[pongCanvas.width * 0.1, 0], [pongCanvas.width * 0.9, 0], [pongCanvas.width * 0.1, pongCanvas.height * 0.2]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.1, pongCanvas.height * 0.8], pongCanvas.width * 0.8, pongCanvas.height * 0.2, [[pongCanvas.width * 0.9, pongCanvas.height], [pongCanvas.width * 0.1, pongCanvas.height], [pongCanvas.width * 0.9, pongCanvas.height * 0.8]]));
			break;
		case 5:
			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.11], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.11], [pongCanvas.width * 0.66, pongCanvas.height * 0.11], [pongCanvas.width * 0.66, pongCanvas.height * 0.12], [pongCanvas.width * 0.33, pongCanvas.height * 0.12]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.22], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.22], [pongCanvas.width * 0.66, pongCanvas.height * 0.22], [pongCanvas.width * 0.66, pongCanvas.height * 0.23], [pongCanvas.width * 0.33, pongCanvas.height * 0.23]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.33], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.33], [pongCanvas.width * 0.66, pongCanvas.height * 0.33], [pongCanvas.width * 0.66, pongCanvas.height * 0.34], [pongCanvas.width * 0.33, pongCanvas.height * 0.34]]));

			obstacles.push(new Obstacle([pongCanvas.width * 0.4, pongCanvas.height * 0.4], pongCanvas.width * 0.01, pongCanvas.height * 0.2, [[pongCanvas.width * 0.4, pongCanvas.height * 0.4], [pongCanvas.width * 0.41, pongCanvas.height * 0.4], [pongCanvas.width * 0.41, pongCanvas.height * 0.6], [pongCanvas.width * 0.4, pongCanvas.height * 0.6]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.5, pongCanvas.height * 0.4], pongCanvas.width * 0.01, pongCanvas.height * 0.2, [[pongCanvas.width * 0.5, pongCanvas.height * 0.4], [pongCanvas.width * 0.51, pongCanvas.height * 0.4], [pongCanvas.width * 0.51, pongCanvas.height * 0.6], [pongCanvas.width * 0.5, pongCanvas.height * 0.6]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.6, pongCanvas.height * 0.4], pongCanvas.width * 0.01, pongCanvas.height * 0.2, [[pongCanvas.width * 0.6, pongCanvas.height * 0.4], [pongCanvas.width * 0.61, pongCanvas.height * 0.4], [pongCanvas.width * 0.61, pongCanvas.height * 0.6], [pongCanvas.width * 0.6, pongCanvas.height * 0.6]]));

			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.66], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.66], [pongCanvas.width * 0.66, pongCanvas.height * 0.66], [pongCanvas.width * 0.66, pongCanvas.height * 0.67], [pongCanvas.width * 0.33, pongCanvas.height * 0.67]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.77], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.77], [pongCanvas.width * 0.66, pongCanvas.height * 0.77], [pongCanvas.width * 0.66, pongCanvas.height * 0.78], [pongCanvas.width * 0.33, pongCanvas.height * 0.78]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.33, pongCanvas.height * 0.88], pongCanvas.width * 0.33, pongCanvas.height * 0.01, [[pongCanvas.width * 0.33, pongCanvas.height * 0.88], [pongCanvas.width * 0.66, pongCanvas.height * 0.88], [pongCanvas.width * 0.66, pongCanvas.height * 0.89], [pongCanvas.width * 0.33, pongCanvas.height * 0.89]]));
			break;
		case 6:
			obstacles.push(new Obstacle([pongCanvas.width * 0.3, pongCanvas.height * 0.15], pongCanvas.width * 0.01, pongCanvas.height * 0.25, [[pongCanvas.width * 0.3, pongCanvas.height * 0.15], [pongCanvas.width * 0.31, pongCanvas.height * 0.15], [pongCanvas.width * 0.31, pongCanvas.height * 0.4], [pongCanvas.width * 0.3, pongCanvas.height * 0.4]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.3, pongCanvas.height * 0.65], pongCanvas.width * 0.01, pongCanvas.height * 0.25, [[pongCanvas.width * 0.3, pongCanvas.height * 0.65], [pongCanvas.width * 0.31, pongCanvas.height * 0.65], [pongCanvas.width * 0.31, pongCanvas.height * 0.9], [pongCanvas.width * 0.3, pongCanvas.height * 0.9]]));

			obstacles.push(new Obstacle([pongCanvas.width * 0.5, pongCanvas.height * 0.25], pongCanvas.width * 0.01, pongCanvas.height * 0.5, [[pongCanvas.width * 0.5, pongCanvas.height * 0.25], [pongCanvas.width * 0.51, pongCanvas.height * 0.25], [pongCanvas.width * 0.51, pongCanvas.height * 0.75], [pongCanvas.width * 0.5, pongCanvas.height * 0.75]]));

			obstacles.push(new Obstacle([pongCanvas.width * 0.69, pongCanvas.height * 0.15], pongCanvas.width * 0.01, pongCanvas.height * 0.25, [[pongCanvas.width * 0.69, pongCanvas.height * 0.15], [pongCanvas.width * 0.7, pongCanvas.height * 0.15], [pongCanvas.width * 0.7, pongCanvas.height * 0.4], [pongCanvas.width * 0.69, pongCanvas.height * 0.4]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.69, pongCanvas.height * 0.65], pongCanvas.width * 0.01, pongCanvas.height * 0.25, [[pongCanvas.width * 0.69, pongCanvas.height * 0.65], [pongCanvas.width * 0.7, pongCanvas.height * 0.65], [pongCanvas.width * 0.7, pongCanvas.height * 0.9], [pongCanvas.width * 0.69, pongCanvas.height * 0.9]]));
			break;
		case 7:
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, 0], pongCanvas.width * 0.25, pongCanvas.height * 0.2, [[pongCanvas.width * 0.25, 0], [pongCanvas.width * 0.5, 0], [pongCanvas.width * 0.375, pongCanvas.height * 0.2]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.5, 0], pongCanvas.width * 0.25, pongCanvas.height * 0.2, [[pongCanvas.width * 0.5, 0], [pongCanvas.width * 0.75, 0], [pongCanvas.width * 0.625, pongCanvas.height * 0.2]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.25, pongCanvas.height * 0.8], pongCanvas.width * 0.25, pongCanvas.height * 0.2, [[pongCanvas.width * 0.5, pongCanvas.height], [pongCanvas.width * 0.25, pongCanvas.height], [pongCanvas.width * 0.375, pongCanvas.height * 0.8]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.5, pongCanvas.height * 0.8], pongCanvas.width * 0.25, pongCanvas.height * 0.2, [[pongCanvas.width * 0.75, pongCanvas.height], [pongCanvas.width * 0.5, pongCanvas.height], [pongCanvas.width * 0.625, pongCanvas.height * 0.8]]));
			break;
		case 8:
			obstacles.push(new Obstacle([pongCanvas.width * 0.075, pongCanvas.height * 0.35], pongCanvas.width * 0.25, pongCanvas.height * 0.3, [[pongCanvas.width * 0.075, pongCanvas.height * 0.35], [pongCanvas.width * 0.325, pongCanvas.height * 0.5], [pongCanvas.width * 0.075, pongCanvas.height * 0.65]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.675, pongCanvas.height * 0.35], pongCanvas.width * 0.25, pongCanvas.height * 0.3, [[pongCanvas.width * 0.925, pongCanvas.height * 0.65], [pongCanvas.width * 0.675, pongCanvas.height * 0.5], [pongCanvas.width * 0.925, pongCanvas.height * 0.35]]));
			break;
		case 9:
			obstacles.push(new Obstacle([pongCanvas.width * 0.2, 0], pongCanvas.width * 0.6, pongCanvas.height * 0.25, [[pongCanvas.width * 0.8, 0], [pongCanvas.width * 0.75, pongCanvas.height * 0.12], [pongCanvas.width * 0.7, pongCanvas.height * 0.18], [pongCanvas.width * 0.65, pongCanvas.height * 0.22], [pongCanvas.width * 0.6, pongCanvas.height * 0.24], [pongCanvas.width * 0.55, pongCanvas.height * 0.25], [pongCanvas.width * 0.45, pongCanvas.height * 0.25], [pongCanvas.width * 0.4, pongCanvas.height * 0.24], [pongCanvas.width * 0.35, pongCanvas.height * 0.22], [pongCanvas.width * 0.3, pongCanvas.height * 0.18], [pongCanvas.width * 0.25, pongCanvas.height * 0.12], [pongCanvas.width * 0.2, 0]]));
			obstacles.push(new Obstacle([pongCanvas.width * 0.2, pongCanvas.height * 0.75], pongCanvas.width * 0.6, pongCanvas.height * 0.25, [[pongCanvas.width * 0.2, pongCanvas.height], [pongCanvas.width * 0.25, pongCanvas.height * 0.88], [pongCanvas.width * 0.3, pongCanvas.height * 0.82], [pongCanvas.width * 0.35, pongCanvas.height * 0.78], [pongCanvas.width * 0.4, pongCanvas.height * 0.76], [pongCanvas.width * 0.45, pongCanvas.height * 0.75], [pongCanvas.width * 0.55, pongCanvas.height * 0.75], [pongCanvas.width * 0.6, pongCanvas.height * 0.76], [pongCanvas.width * 0.65, pongCanvas.height * 0.78], [pongCanvas.width * 0.7, pongCanvas.height * 0.82], [pongCanvas.width * 0.75, pongCanvas.height * 0.88], [pongCanvas.width * 0.8, pongCanvas.height]]));
			break;
		case 10:
			obstacles.push(new Obstacle([pongCanvas.width * 0.2, pongCanvas.height * 0.2], pongCanvas.width * 0.6, pongCanvas.height * 0.6, [[pongCanvas.width * 0.5, pongCanvas.height * 0.45], [pongCanvas.width * 0.75, pongCanvas.height * 0.2], [pongCanvas.width * 0.8, pongCanvas.height * 0.25], [pongCanvas.width * 0.55, pongCanvas.height * 0.5], [pongCanvas.width * 0.8, pongCanvas.height * 0.7], [pongCanvas.width * 0.75, pongCanvas.height * 0.75], [pongCanvas.width * 0.5, pongCanvas.height * 0.55], [pongCanvas.width * 0.25, pongCanvas.height * 0.75], [pongCanvas.width * 0.2, pongCanvas.height * 0.7], [pongCanvas.width * 0.45, pongCanvas.height * 0.5], [pongCanvas.width * 0.2, pongCanvas.height * 0.25], [pongCanvas.width * 0.25, pongCanvas.height * 0.2]]));
			break;
		case 11:
			// for an extra custom settings if wanted.
			break;
	}
	if (obstacles.length > 0)
		obstacleNum = toLoad;
}


// const setEffectFlags = (effectValue) => {
// 	// 0 = blackout
// 	// 1 = invis paddle
// 	// 2 = invis ball
// 	// 3 = swap controls
// 	// 4 = invert controls
// 	// 5 = switch endzone/paddles
//  // 6 = invis obstacles
// 	effectFlags[effectValue] = true;
// }

const playButtons = document.getElementById("play-pong");
const pauseButtons = [document.getElementById("left-pause"), document.getElementById("right-pause")];
const resetButtons = [document.getElementById("left-reset"), document.getElementById("right-reset")];
const pongCanvas = document.getElementById("pong-canvas");
pongCanvas.width = window.innerWidth;
pongCanvas.height = window.innerHeight;
const pong = pongCanvas.getContext("2d");

const leftPaddle = new Paddle("left");
const rightPaddle = new Paddle("right");
const balls = [new Ball()];
const powerups = [];
const obstacles = [];

console.log("left paddle::: x = ", leftPaddle.x, " :: y = ", leftPaddle.y);
console.log("right paddle::: x = ", rightPaddle.x, " :: y = ", rightPaddle.y);
console.log("ball::: x = ", balls[0].x, " :: y = ", balls[0].y);
// 					arrowUp, arrowDown, w, s
const keyPressed = [false, false, false, false];
let touches = null;

// add setting changes here and throughout code to make them match properly.
// const settings = [];

// flags of bool for if each effect should be active, will add flags as I go
// 					blackout, invis paddle, invis ball, swap controls, invert controls, switch endzone/paddles, create Lag, invis obstacles
const effectFlags = [false, false, false, false, false, false, false, false];
let frameCount = 0;
let startDelay = 40;
let freezeDelay = 0;
let bounciness = 1;
let startedFlag = false;
let playFlag = false;
let chaos = false;
let typeFlag = 0;
let obstacleNum = 0;

const resetPong = (scoreReset = 0) => {
	leftPaddle.reset(scoreReset, "left");
	rightPaddle.reset(scoreReset, "right");
	balls.length = 1;
	balls[0].reset();
	powerups.length = 0;
	for (let i = 0; i < effectFlags.length; ++i)
		effectFlags[i] = false;

	freezeDelay = 0;
	bounciness = 1;
	startDelay = 40;
}

const resizePong = () => {
	pongCanvas.width = window.innerWidth;
	pongCanvas.height = window.innerHeight;

	if (obstacles.length > 0)
		customObstacles(obstacleNum);

	resetPong();

	// console.log("reset / resize PONG!!");

	// console.log("EffectFlag = ", effectFlags);

	// console.log("Reset Pong CANVAS :: ", pongCanvas.width, " X ", pongCanvas.height);
	// console.log("window.inner stuff :: ", window.innerWidth,  " X ", window.innerHeight);
	// console.log("document.documetElement stuff :: ", document.documentElement.clientWidth, " X ", document.documentElement.clientWidth);
	// console.log("document.body stuff :: ", document.body.clientWidth, " X ", document.body.clientWidth);
	// console.log("left paddle::: x = ", leftPaddle.x, " :: y = ", leftPaddle.y);
	// console.log("right paddle::: x = ", rightPaddle.x, " :: y = ", rightPaddle.y);
	// console.log("ball::: x = ", balls[0].x, " :: y = ", balls[0].y);
}

const resetButton = () => {
	resetButtons[0].classList.add("hidden");
	resetButtons[1].classList.add("hidden");
	resetPong();
}

const pausePong = () => {
	playFlag = !playFlag;
	if (playFlag) {
		pauseButtons[0].innerText = '⏸';
		pauseButtons[1].innerText = '⏸';
		resetButtons[0].classList.add("hidden");
		resetButtons[1].classList.add("hidden");
		switch (typeFlag) {
			case 1:
				pongAnimatePowerUp();
				break;
			case 2:
				pongAnimateObstacle();
				break;
			case 3:
				pongAnimateObstaclePowerUp();
				break;
			default:
				pongAnimate();
				break;
		}
	} else {
		pauseButtons[0].innerText = '⏵︎';
		pauseButtons[1].innerText = '⏵︎';
		resetButtons[0].classList.remove("hidden");
		resetButtons[1].classList.remove("hidden");
	}
	// console.log("after hit play = ", play);
}

const keyDown = (event) => {
	// console.log("key pressed down = ", event.key);
	switch (event.key) {
		case "ArrowUp":
			keyPressed[0] = true;
			break;
		case "ArrowDown":
			keyPressed[1] = true;
			break;
		case "w": case "W":
			keyPressed[2] = true;
			break;
		case "s": case "S":
			keyPressed[3] = true;
			break;
		case "p": case "P":
			if (startedFlag)
				pausePong();
			break;
		case "r": case "R":
			if (event.shiftKey)
				resetPong();
			break;
	}
}

const keyUp = (event) => {
	switch (event.key) {
		case "ArrowUp":
			keyPressed[0] = false;
			break;
		case "ArrowDown":
			keyPressed[1] = false;
			break;
		case "w":
			keyPressed[2] = false;
			break;
		case "s":
			keyPressed[3] = false;
			break;
	}
}

const updateTouches = (event) => {
	touches = event.touches;
	// console.log("updated touches = ", touches);
}

const pongPaddleMovements = () => {
	// console.log("keys = ", keyPressed);
	let leftTouch = false;
	let rightTouch = false;
	if (touches != null) {
		for (let i = 0; i < touches.length; ++i) {
			if (!leftTouch && touches[i].clientX <= pongCanvas.width * 0.06) {
				leftTouch = true;
				leftPaddle.moveTouch(i);
			}
			else if (!rightTouch && touches[i].clientX >= pongCanvas.width * 0.94) {
				rightTouch = true;
				rightPaddle.moveTouch(i);
			}
		}
	}
	if (!rightTouch) {
		if (keyPressed[0])
			rightPaddle.moveUp();
		if (keyPressed[1])
			rightPaddle.moveDown();
	}
	if (!leftTouch) {
		if (keyPressed[2])
			leftPaddle.moveUp();
		if (keyPressed[3])
			leftPaddle.moveDown();
	}
}

const pongPaddleMovementsPowerUps = () => {
	// console.log("keys = ", keyPressed);
	let leftTouch = false;
	let rightTouch = false;
	if (touches != null) {
		for (let i = 0; i < touches.length; ++i) {
			if (!leftTouch && touches[i].clientX <= pongCanvas.width * 0.06) {
				leftTouch = true;
				if (effectFlags[3])
					rightPaddle.moveTouch(i);
				else
					leftPaddle.moveTouch(i);
			}
			else if (!rightTouch && touches[i].clientX >= pongCanvas.width * 0.94) {
				rightTouch = true;
				if (effectFlags[3])
					leftPaddle.moveTouch(i);
				else
					rightPaddle.moveTouch(i);
			}
		}
	}
	if (effectFlags[3]) {
		if (effectFlags[4]) {
			if (!leftTouch) {
				if (keyPressed[0])
					leftPaddle.moveDown();
				if (keyPressed[1])
					leftPaddle.moveUp();
			}
			if (!rightTouch) {
				if (keyPressed[2])
					rightPaddle.moveDown();
				if (keyPressed[3])
					rightPaddle.moveUp();
			}
		}
		else {
			if (!leftTouch) {
				if (keyPressed[0])
					leftPaddle.moveUp();
				if (keyPressed[1])
					leftPaddle.moveDown();
			}
			if (!rightTouch) {
				if (keyPressed[2])
					rightPaddle.moveUp();
				if (keyPressed[3])
					rightPaddle.moveDown();
			}
		}
	}
	else {
		if (effectFlags[4]) {
			if (!rightTouch) {
				if (keyPressed[0])
					rightPaddle.moveDown();
				if (keyPressed[1])
					rightPaddle.moveUp();
			}
			if (!leftTouch) {
				if (keyPressed[2])
					leftPaddle.moveDown();
				if (keyPressed[3])
					leftPaddle.moveUp();
			}
		}
		else {
			if (!rightTouch) {
				if (keyPressed[0])
					rightPaddle.moveUp();
				if (keyPressed[1])
					rightPaddle.moveDown();
			}
			if (!leftTouch) {
				if (keyPressed[2])
					leftPaddle.moveUp();
				if (keyPressed[3])
					leftPaddle.moveDown();
			}
		}
	}
}

const pongCollisions = (ball) => {
	leftPaddle.collision(ball) || rightPaddle.collision(ball) || ball.wallCollision() || ball.endZoneCollision();
}

const obstaclePowerUpCollisions = (ballNum) => {
	let previousIntersect = null;
	let numLoops = 0;
	let ballUpdated;
	let obstaclesChanged = false;
	const preservedBall = balls[ballNum]; 
	while (numLoops < 100) {
		// change code so previous intersect only used after reflection is done so intersect is used correctly so it doesn't cut off other intersects closer to the ballStart
		numLoops++;
		// console.log("loop number: ", numLoops);
		let currentIntersect = null;
		ballUpdated = [balls[ballNum].x + balls[ballNum].speed[0], balls[ballNum].y + balls[ballNum].speed[1]];
		for (let i = 0; i < obstacles.length; ++i) {
			if (obstacles[i].checkBounds(balls[ballNum])) { // needs to check if ball / intersect is within obstacle bounds
				let tempPrevious = obstacles[i].collisionCheck(balls[ballNum], ballUpdated, previousIntersect === null ? null : previousIntersect[0]);
				if (tempPrevious != null && (currentIntersect === null || tempPrevious[1] < currentIntersect[1])) {
					currentIntersect = tempPrevious;
					currentIntersect.push(i);
				}
			}
		}
		if (currentIntersect != null) {
			// perform reflection of ball
			if (previousIntersect === null) {
				for (let i = 0; i < powerups.length; ++i) {
					if (powerups[i].pathSegmentCollision([balls[ballNum].x, balls[ballNum].y, obstacles[currentIntersect[3]].points[currentIntersect[2]], obstacles[currentIntersect[3]].points.length === currentIntersect[2] + 1 ? obstacles[currentIntersect[3]].points[0] : obstacles[currentIntersect[3]].points[currentIntersect[2] + 1]])) {
						if (powerups[i].effect === "OSW") {
							obstaclesChanged = true;
							powerups.splice(i, 1);
							break;
						}
						powerups.splice(i, 1);
						i--;
					}
				}
			}
			else {
				for (let i = 0; i < powerups.length; ++i) {
					if (powerups[i].pathSegmentCollision([obstacles[previousIntersect[3]].points[previousIntersect[2]], obstacles[previousIntersect[3]].points.length === previousIntersect[2] + 1 ? obstacles[previousIntersect[3]].points[0] : obstacles[previousIntersect[3]].points[previousIntersect[2] + 1], obstacles[currentIntersect[3]].points[currentIntersect[2]], obstacles[currentIntersect[3]].points.length === currentIntersect[2] + 1 ? obstacles[currentIntersect[3]].points[0] : obstacles[currentIntersect[3]].points[currentIntersect[2] + 1]])) {
						if (powerups[i].effect === "OSW") {
							obstaclesChanged = true;
							powerups.splice(i, 1);
							break;
						}
						powerups.splice(i, 1);
						i--;
					}
				}
			}
			if (obstaclesChanged) {
				previousIntersect = null;
				numLoops = 0;
				balls[ballNum] = preservedBall;
				obstaclesChanged = false;
				continue;
			}
			reflectBall(balls[ballNum], ballUpdated, obstacles[currentIntersect[3]].points[currentIntersect[2]], obstacles[currentIntersect[3]].points.length === currentIntersect[2] + 1 ? obstacles[currentIntersect[3]].points[0] : obstacles[currentIntersect[3]].points[currentIntersect[2] + 1]);
			// console.log("BALL REFLECTED!!!! New ball position = [", balls[ballNum].x, ", ", balls[ballNum].y, "]")
			previousIntersect = currentIntersect;
			continue;
		}
		// console.log("before other collisions");
		if (leftPaddle.collision(balls[ballNum]) || rightPaddle.collision(balls[ballNum]) || balls[ballNum].wallCollision())
			continue;
		// console.log("after other collisions");
		break;
	}
	if (previousIntersect === null) {
		for (let i = 0; i < powerups.length; ++i) {
			if (powerups[i].pathSegmentCollision([balls[ballNum].x, balls[ballNum].y, ballUpdated[0], ballUpdated[1]])) {
				if (powerups[i].effect === "OSW") {
					obstaclesChanged = true;
					powerups.splice(i, 1);
					break;
				}
				powerups.splice(i, 1);
				i--;
			}
		}
	}
	else {
		for (let i = 0; i < powerups.length; ++i) {
			if (powerups[i].pathSegmentCollision([obstacles[previousIntersect[3]].points[previousIntersect[2]], obstacles[previousIntersect[3]].points.length === previousIntersect[2] + 1 ? obstacles[previousIntersect[3]].points[0] : obstacles[previousIntersect[3]].points[previousIntersect[2] + 1], ballUpdated[0], ballUpdated[1]])) {
				if (powerups[i].effect === "OSW") {
					obstaclesChanged = true;
					powerups.splice(i, 1);
					break;
				}
				powerups.splice(i, 1);
				i--;
			}
		}
	}
	if (obstaclesChanged) {
		balls[ballNum] = preservedBall;
		obstaclePowerUpCollisions(ballNum);
		return;
	}
	balls[ballNum].endZoneCollision();
	if (numLoops > 100) {
		console.log("exiting for infinite looping");
	}
	// console.log("exiting collisions, ball position = [", balls[ballNum].x, ", ", balls[ballNum].y, "]")
}

const obstacleCollisions = (ballNum) => {
	let previousIntersect = null;
	let numLoops = 0;
	while (numLoops < 100) {
		// change code so previous intersect only used after reflection is done so intersect is used correctly so it doesn't cut off other intersects closer to the ballStart
		numLoops++;
		// console.log("loop number: ", numLoops);
		let currentIntersect = null;
		let ballUpdated = [balls[ballNum].x + balls[ballNum].speed[0], balls[ballNum].y + balls[ballNum].speed[1]];
		for (let i = 0; i < obstacles.length; ++i) {
			if (obstacles[i].checkBounds(balls[ballNum])) { // needs to check if ball / intersect is within obstacle bounds
				let tempPrevious = obstacles[i].collisionCheck(balls[ballNum], ballUpdated, previousIntersect === null ? null : previousIntersect[0]);
				if (tempPrevious != null && (currentIntersect === null || tempPrevious[1] < currentIntersect[1])) {
					currentIntersect = tempPrevious;
					currentIntersect.push(i);
				}
			}
		}
		if (currentIntersect != null) {
			// perform reflection of ball
			reflectBall(balls[ballNum], ballUpdated, obstacles[currentIntersect[3]].points[currentIntersect[2]], obstacles[currentIntersect[3]].points.length === currentIntersect[2] + 1 ? obstacles[currentIntersect[3]].points[0] : obstacles[currentIntersect[3]].points[currentIntersect[2] + 1]);
			// console.log("BALL REFLECTED!!!! New ball position = [", balls[ballNum].x, ", ", balls[ballNum].y, "]")
			previousIntersect = currentIntersect;
			continue;
		}
		// console.log("before other collisions");
		if (leftPaddle.collision(balls[ballNum]) || rightPaddle.collision(balls[ballNum]) || balls[ballNum].wallCollision())
			continue;
		// console.log("after other collisions");
		break;
	}
	balls[ballNum].endZoneCollision();
	if (numLoops > 100) {
		console.log("exiting for infinite looping");
	}
	// console.log("exiting collisions, ball position = [", balls[ballNum].x, ", ", balls[ballNum].y, "]")
}

const pongAnimateObstaclePowerUp = () => {
	if (playFlag) {
		if (!effectFlags[6] || frameCount % effectFlags[6] === 0)
			pong.clearRect(0, 0, pongCanvas.width, pongCanvas.height);
		if (effectFlags[0] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
			// console.log("blackout active");
			pong.fillStyle = "black";
			pong.fillRect(0, 0, pongCanvas.width, pongCanvas.height);
		}
		if (!effectFlags[0] && !effectFlags[7] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
			for (let i = 0; i < obstacles.length; ++i)
				obstacles[i].render();
		}

		if (startDelay <= 0) {
			if (frameCount % 250 === 0 && (powerups.length < 3 || (chaos && powerups.length < 5))) {
				// console.log("powerup spawN!!!!");
				powerups.push(new Powerup());
			}
			for (let i = 0; i < balls.length; ++i) {
				obstaclePowerUpCollisions(i);
				if (balls[i] === null) {
					balls.splice(i, 1);
					i--;
					continue;
				}
				balls[i].updatePosition();
				if (!effectFlags[2] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
					if (effectFlags[0])
						balls[i].renderBlackOut();
					else
						balls[i].render();
				}
			}
			for (let i = 0; i < powerups.length; ++i) {
				powerups[i].wallCollision();
				powerups[i].updatePosition();
				if (!effectFlags[6] || frameCount % effectFlags[6] === 0)
					powerups[i].render();
			}
		}
		else {
			startDelay--;
			for (let i = 0; i < balls.length; ++i) {
				if (!effectFlags[2] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
					if (effectFlags[0])
						balls[i].renderBlackOut();
					else
						balls[i].render();
				}
			}
		}

		if (!effectFlags[0] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
			leftPaddle.render();
			rightPaddle.render();
		}
		if (freezeDelay > 0)
			freezeDelay--;
		else
			pongPaddleMovementsPowerUps();


		frame = window.requestAnimationFrame(pongAnimateObstaclePowerUp);
		frameCount++;
	}
}

const pongAnimateObstacle = () => {
	if (playFlag) {
		pong.clearRect(0, 0, pongCanvas.width, pongCanvas.height);

		if (startDelay <= 0) {
			// console.log("ball position BEFORE = [", balls[0].x, ", ", balls[0].y, "]");
			obstacleCollisions(0);
			balls[0].updatePosition();
			// console.log("ball position UPDATED = [", balls[0].x, ", ", balls[0].y, "]");
			pongPaddleMovements();
		}
		else
			startDelay--;

		leftPaddle.render();
		rightPaddle.render();
		for (let i = 0; i < obstacles.length; ++i)
			obstacles[i].render();
		balls[0].render();

		frame = window.requestAnimationFrame(pongAnimateObstacle);
	}
}

const pongAnimatePowerUp = () => {
	if (playFlag) {
		if (!effectFlags[6] || frameCount % effectFlags[6] === 0)
			pong.clearRect(0, 0, pongCanvas.width, pongCanvas.height);
		if (effectFlags[0] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
			// console.log("blackout active");
			pong.fillStyle = "black";
			pong.fillRect(0, 0, pongCanvas.width, pongCanvas.height);
		}
		if (startDelay <= 0) {
			if (frameCount % 250 === 0 && (powerups.length < 3 || (chaos && powerups.length < 5))) {
				// console.log("powerup spawN!!!!");
				powerups.push(new Powerup());
			}
			for (let i = 0; i < powerups.length; ++i) {
				for (let j = 0; j < balls.length; ++j) {
					// console.log("j = ", j);
					if (powerups[i].ballCollision(balls[j])) {
						powerups.splice(i, 1);
						if (i < powerups.length)
							j = -1;
						else
							break;
					}
				}
				if (i >= powerups.length)
					break;
				powerups[i].wallCollision();
				powerups[i].updatePosition();
				if (!effectFlags[6] || frameCount % effectFlags[6] === 0)
					powerups[i].render();
			}
			
			for (let i = 0; i < balls.length; ++i) {
				pongCollisions(balls[i]);
				if (balls[i] === null) {
					balls.splice(i, 1);
					i--;
					continue;
				}
				balls[i].updatePosition();
				if (!effectFlags[2] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
					if (effectFlags[0])
						balls[i].renderBlackOut();
					else
						balls[i].render();
				}
			}
		}
		else {
			startDelay--;
			for (let i = 0; i < balls.length; ++i) {
				if (!effectFlags[2] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
					if (effectFlags[0])
						balls[i].renderBlackOut();
					else
						balls[i].render();
				}
			}
		}

		if (!effectFlags[0] && (!effectFlags[6] || frameCount % effectFlags[6] === 0)) {
			leftPaddle.render();
			rightPaddle.render();
		}
		if (freezeDelay > 0)
			freezeDelay--;
		else
			pongPaddleMovementsPowerUps();

		frame = window.requestAnimationFrame(pongAnimatePowerUp);
		frameCount++;
	}
}

const pongAnimate = () => {
	if (playFlag) {
		pong.clearRect(0, 0, pongCanvas.width, pongCanvas.height);

		if (startDelay <= 0) {
			pongCollisions(balls[0]);
			balls[0].updatePosition();
			pongPaddleMovements();
		}
		else
			startDelay--;

		leftPaddle.render();
		rightPaddle.render();
		balls[0].render();

		frame = window.requestAnimationFrame(pongAnimate);
	}
}

const startPong = (type = "normal") => {
	playButtons.classList.add("hidden");
	pauseButtons[0].classList.remove("hidden");
	pauseButtons[1].classList.remove("hidden");
	frameCount = 1;
	startedFlag = true;
	playFlag = true;
	resetPong(1);
	switch (type) {
		case "powerup":
			// console.log("playng powerup!!!");
			typeFlag = 1;
			pongAnimatePowerUp();
			break;
		case "obstacle":
			// console.log("playing obstacle");
			typeFlag = 2;
			customObstacles(Math.floor(Math.random() * 11));
			// console.log("obstacles = ", obstacles);
			pongAnimateObstacle();
			break;
		case "powerup-obstacle":
			// console.log("playing powerup-obstacle");
			typeFlag = 3;
			customObstacles(Math.floor(Math.random() * 11));
			// console.log("obstacles = ", obstacles);
			pongAnimateObstaclePowerUp();
			break;
		case "chaos":
			typeFlag = 1;
			chaos = true;
			pongAnimatePowerUp();
			break;
		case "chaos-obstacle":
			typeFlag = 3;
			chaos = true;
			customObstacles(Math.floor(Math.random() * 11));
			pongAnimateObstaclePowerUp();
			break;
		default:
			pongAnimate();
	}
}

window.addEventListener("resize", resizePong, false);

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

document.addEventListener("touchstart", updateTouches, false);
document.addEventListener("touchmove", updateTouches, false);
document.addEventListener("touchend", updateTouches, false);
document.addEventListener("touchcancel", updateTouches, false);

// testing resize and canvas pixels etc
// const canvas = pong.getContext("2d");

// canvas.fillStyle = "red";
// canvas.fillRect(pong.width-3, pong.height-1, 1, 1);


// old keydown stuff, will probs reuse
// document.addEventListener("keydown", (event) => {
// 	// event.preventDefault();
	
// });

// document.addEventListener("keyup", (event) => {
// 	console.log("released ", event.key);
// 	delete keyPressed[event.key];
// })