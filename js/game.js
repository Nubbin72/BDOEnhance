var Game = new function(){
	
	var keycodes = {32: "space",
				    87: "W",
				   	38: "up",
				    65: "A",
				    37: "left",
				    83: "S",
					40: "down",
				    68: "D",
				   	39: "right",
				    69: "use",
				    82: "bomb",
					85: "cheat"
				   };

	this.data = JSON.parse(JSON.stringify(data));
	
	this.keys = {};
	this.mouseButtons = {'left':false};
	
	// Get mouse position from the canvas
	this.getMousePos = function(evt) {
		var rect = this.canvas.getBoundingClientRect();
		return {
		  "x": evt.clientX - ((this.sw - this.width * (this.sw / this.width))),//rect.left,
		  "y": evt.clientY - ((this.sh - this.height * (this.sh / this.height)))// - rect.top
		};
	}

	this.init = function (canvas_id){
		this.canvas = document.getElementById(canvas_id);
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;	
		this.scaleToWindow();
		
		this.fps = 60;
		this.frameTime = 1000/this.fps;
		this.now = null;
		this.then = null;
		this.elapsed = null;
		
		this.mousePos = {'x':0, 'y':0};
		this.clickPos = {'x':0, 'y':0};
		this.rmbClick = {'x':0, 'y':0};

		this.releasePos = {'x':0, 'y':0};

		
		// Get the click position
		this.canvas.addEventListener('mousedown', function(evt) {
			if (evt.button == 0) {
				Game.clickPos = Game.mousePos;
				Game.mouseButtons.left = true;
			} else if (evt.button == 2) {
				Game.rmbClick = Game.mousePos;
			}
			
		}, false);
		
		// Get the mouse release 
		this.canvas.addEventListener('mouseup', function(evt) {
			if (evt.button == 0) {
				Game.mouseButtons.left = false;
				Game.releasePos = Game.mousePos;
			} else if (evt.button == 2) {
				Game.rmbClick = {'x':0, 'y':0};
			}

			
			
		}, false);
		
		
		// Get the mouse position
		this.canvas.addEventListener('mousemove', function(evt) {
			Game.mousePos = Game.getMousePos(evt);
			Game.mousePos.x /= Game.sx;
			Game.mousePos.y /= Game.sy;
		}, false);
		
		
		// Get keys pressed
		$(window).keydown(function(e){
			if (keycodes[e.keyCode]) Game.keys[keycodes[e.keyCode]] = true;
		});
		$(window).keyup(function(e){
			if (keycodes[e.keyCode]) Game.keys[keycodes[e.keyCode]] = false;
		});
		
		var screen = new Play(null);
		Game.loadstate(screen);
		Game.loop();
		
	} // End of init
	
	this.loadstate = function(state){
		state.init();
		this.state = state;
	}
	
	// Main loop
	this.loop = function(){
		// Get current time
		Game.now = Date.now();
		// Get the delta time by subtracting the time the previous frame start time from current frame start time.
		// elapsed variable is used to keep track when to switch animations
		Game.elapsed = Game.now-Game.then;

		// If the game should be updated, update it.
		if (Game.elapsed > Game.frameTime) {
			// Call update and render functions of the current state
			this.state.update();
			this.state.render(this.ctx);
			// Store the current frame time for future calculation
			Game.then = Game.now;
		}
		// Get next frame
		requestAnimationFrame(function(){
			Game.loop();
		});
	}
	
	this.scaleToWindow = function() {
		var scaleX, scaleY, scale;
		this.sw = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
		this.sh = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
		this.or = (this.sw > this.sh)?"landscape":"portrait";
		var body = document.body, documentElement = document.documentElement;
		this.dh = Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);	
		
		scaleX = this.sw / this.width;
        scaleY = this.sh / this.height;
		scale = Math.min(scaleX, scaleY);
		this.sx = scaleX;
		this.sy = scaleY;
		
    	this.canvas.style.transformOrigin = "0 0";
    	this.canvas.style.transform = "scale(" + scale + ")";
		
    	if (this.width * scale < this.sw) {  //Center horizontally (for square or tall canvases)
      		var margin = (this.sw - this.width * scaleY) / 2;
			this.canvas.style.left = margin + "px";
      		this.canvas.style.marginLeft = margin + "px";
      		//this.canvas.style.marginRight = margin + "px";
    	}
		
		if (this.height * scale < this.sh) { //Center vertically (for wide canvases)
		  	var margin = (this.sh - this.height * scaleX) / 2;
			this.canvas.style.top = margin + "px";
			this.canvas.style.marginTop = margin + "px";
		  	//this.canvas.style.marginBottom = margin + "px";
		}
		
		this.canvas.style.paddingLeft = 0;
    	this.canvas.style.paddingRight = 0;
    	this.canvas.style.display = "block";
	
	}

}