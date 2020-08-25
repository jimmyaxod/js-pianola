/**
 * Lets set everything up we need...
 *
 */
function init() {
	console.log("init()");
	draw();
}

/**
 * Draw the piano roll...
 *
 */
function draw() {
	var canvas = document.getElementById("pianoroll");
	const { width, height } = canvas.getBoundingClientRect();	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ffeedd";
	ctx.fillRect(0, 0, width, height - NOTE_LENGTH_WHITE);

	drawKeyboard(ctx, 0, height - NOTE_LENGTH_WHITE, width, height);

	window.setInterval(update, 50);
}

var tick_offset = 0;

function update() {
	var canvas = document.getElementById("pianoroll");
	const { width, height } = canvas.getBoundingClientRect();	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ffeedd";
	ctx.fillRect(0, 0, width, height - NOTE_LENGTH_WHITE);	

	// Draw some music on screen...
	for(var i=0;i<music.length;i++) {
		var data = music[i];
		for(var j=0;j<data.length;j++) {
			var note = data[j];
			drawNote(ctx, 0, 0, width, height - NOTE_LENGTH_WHITE, note[0], i - tick_offset, note[1]);
		}
	}
	
	tick_offset++;
}

var NOTE_WIDTH = 10;
var NOTE_LENGTH_BLACK = 50;
var NOTE_LENGTH_WHITE = 80;

function drawKeyboard(ctx, sx, sy, ex, ey) {
	var endkeys = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

	// First lets work out how many we can fit on...
	var num = (ex - sx) / NOTE_WIDTH;

	console.log("We can fit in " + num + " keys");

	// Let's draw a piano keyboard...
	for(var i=0;i<num;i++) {
		var ksx = Math.floor(i*(NOTE_WIDTH* (12 / 7)));
		var kex = Math.floor((i+1)*(NOTE_WIDTH* (12 / 7)));
		ctx.beginPath();
		ctx.rect(ksx, sy, kex - ksx, NOTE_LENGTH_WHITE);
		ctx.stroke();

		var ek = endkeys[i % endkeys.length];
		if (ek==1) {
			ctx.fillStyle = "#080808";
			ctx.fillRect(i*NOTE_WIDTH, sy, NOTE_WIDTH, NOTE_LENGTH_BLACK);
		}
	}	
}

var TICK_LENGTH = 8;	// 1 tick is 8 pixels...

// Draw us a note on screen...
function drawNote(ctx, sx, sy, ex, ey, note, tick, length) {
	yy = ey - ((tick + length) * TICK_LENGTH);
	console.log("note " + note + " " + tick + " " + yy + " " + ey);
	if (yy > ey) return;		// Not visible...
	dy = length * TICK_LENGTH;
	dy = Math.min(dy, ey - yy);	// Clip the bottom...
	ctx.fillStyle = "#446644";
	ctx.fillRect(note*NOTE_WIDTH, yy, NOTE_WIDTH, dy);
}