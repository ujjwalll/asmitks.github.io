var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// make the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

var letters = "從九個領域的巨大天好貓";
// convert the string into an array of characters
letters = letters.split("");

var fontSize = 28; // size of font
var columns = c.width / fontSize; // number of columns for the rain

var drops = []; // create an array of drops (one per column)
for(var x = 0; x < columns; x++) {
	drops[x] = 1; // 1 = y coordinate of the drop
}

// draw the animation
function draw()
{
	// create translucency of 50% to hide the green rectangle
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height); // create drop
	ctx.font = fontSize + "px arial"; // font size	
	ctx.fillStyle = "#9b2a14"; // text color

	for(var i = 0; i < drops.length; i++)
	{
    // random array of letters
		var text = letters[Math.floor(Math.random() * letters.length)];
    
    // print a random array of characters (a drop) using fillText()
		ctx.fillText(text, i * fontSize, drops[i] * fontSize);
		
    // send the drop back to the top after it has crossed the screen
		if((drops[i] * fontSize > c.height) && (Math.random() > 0.975)) {
			drops[i] = 0;
    }
    
		// increment Y coordinate (drop moving down animation)
		drops[i]++;
	}
}
setInterval(draw, 100); // run draw() function every 100ms