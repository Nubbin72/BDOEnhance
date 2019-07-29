

function InfoBox(x,y) {

}

function Slot(x,y,id, item_) {
	this.id = id
	this.item = item_;
	this.rect = new Rect({"x":x, "y":y, "w":44, "h":44});
	this.border_thickness = 1;
	this.alpha = 0;
	this.fading = false;
	this.can_fade = true;


	this.setItem = function(item) {
		this.item = item;
		if (item != null) {
			this.item.rect = this.rect;
		}
	}


	this.copyItem = function(item) {
		this.item = new Item(item.id, item.level);
		this.item.rect = this.rect;
	}


	this.fade = function() {
		var mousePos = {'x':Game.mousePos.x, 'y':Game.mousePos.y, 'w':1, 'h':1};
		// Flash the slot and fade over time
		if(collision(mousePos, this.rect) && this.can_fade) {
			Store.getAsset("media/slot_mouseover.mp3").stop()
			Store.getAsset("media/slot_mouseover.mp3").playOnce()
			if (this.alpha == 0 && !this.fading) {
				this.alpha = 0.6;
				this.fading = true;
				this.can_fade = false;
			}
		}
		if (this.fading) {
			this.alpha -= 0.1;
			if (this.alpha <= 0) {
				this.alpha = 0;
				this.fading = false;
			}
		}
		if(!collision(mousePos, this.rect)) {
			this.can_fade = true;
		}
	}
		
	this.drawSlot = function(ctx) {
		// Border
		ctx.fillStyle = '#3f4046';
		ctx.fillRect(this.rect.x - this.border_thickness, this.rect.y - this.border_thickness, this.rect.w + (this.border_thickness*2), this.rect.h + (this.border_thickness*2));
		
		// Background
		ctx.fillStyle = '#0d0d0e';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);	
	}

	this.drawFade = function(ctx) {
		// Mouseover fade 
		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.globalAlpha = this.alpha;
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		ctx.restore();
	}


	this.update = function() {
		this.fade();
	}

	this.draw = function(ctx) {
		this.drawSlot(ctx);

		if (this.item != null) {
			this.item.draw(ctx);
		}
		this.drawFade(ctx);
	}

}


function Item(id,level) {
	this.id = id;
	this.rect = new Rect({"x":0, "y":0, "w":49, "h":49});
	this.level = level; // Get the enh. level from the JSON?
	this.data = Game.data.items[id];

	this.border_thickness = 1;

	this.update = function() {

	}
		
	this.draw = function(ctx) {

		// "Border"
		if (this.data.grade == "yellow") {
			// Yellow gear #9f854a
			ctx.fillStyle = '#9f854a';
		} else if (this.data.grade == "blue") {
			// Blue gear #4698c4
			ctx.fillStyle = '#4698c4';
		} else {
			ctx.fillStyle = '#3f4046';				
		}

		ctx.fillRect(this.rect.x - this.border_thickness, this.rect.y - this.border_thickness, this.rect.w + (this.border_thickness*2), this.rect.h + (this.border_thickness*2));
		
		// Slot image
		ctx.fillStyle = '#0d0d0e';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

		ctx.drawImage(Store.getAsset(Game.data.items[this.id].image), 1, 1, this.rect.w, this.rect.h, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		
		
		// Enhancement level
		if (this.level > 0) {
			// TODO adjust the position of text for > +10
			ctx.save()
			ctx.font = "bold 20px cambria";
			ctx.fillStyle = "white";
			ctx.shadowBlur = 6;
			ctx.shadowColor = "red";
			if (this.level <= 9 && this.data.type != "accessory") {
				ctx.fillText("+" + this.level, this.rect.x + 8, this.rect.y + 28);
			} else if (this.level <= 15 && this.data.type != "accessory") {
				ctx.fillText("+" + this.level, this.rect.x + 4, this.rect.y + 28);
			} else {
				switch (this.level) {
					case 1:
					case 16: 
						ctx.fillText("I", this.rect.x + 17, this.rect.y + 28);
					break;
					case 2:
					case 17: 
						ctx.fillText("II", this.rect.x + 14, this.rect.y + 28);
					break;
					case 3:
					case 18:
						ctx.fillText("III", this.rect.x + 10, this.rect.y + 28);
					break;
					case 4:
					case 19: 
						ctx.fillText("IV", this.rect.x + 11, this.rect.y + 28);
					break;
					case 5:
					case 20:
						ctx.fillText("V", this.rect.x + 14, this.rect.y + 28);
					break;

				}
			}
			ctx.restore()
		}
	}
}


function Valk(id, level, amount) {
	Item.call(this, id, level);

	this.amount = amount;



	this.draw = function(ctx) {

		// "Border"
		if (this.data.grade == "yellow") {
			// Yellow gear #9f854a
			ctx.fillStyle = '#9f854a';
		} else if (this.data.grade == "blue") {
			// Blue gear #4698c4
			ctx.fillStyle = '#4698c4';
		} else {
			ctx.fillStyle = '#3f4046';				
		}

		ctx.fillRect(this.rect.x - this.border_thickness, this.rect.y - this.border_thickness, this.rect.w + (this.border_thickness*2), this.rect.h + (this.border_thickness*2));
		
		// Slot image
		ctx.fillStyle = '#0d0d0e';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

		ctx.drawImage(Store.getAsset(Game.data.items[this.id].image), 1, 1, this.rect.w, this.rect.h, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		
		
		// Enhancement level
		if (this.amount != null) {
			// TODO adjust the position of text for > +10
			ctx.save()
			ctx.font = "bold 16px cambria";
			ctx.fillStyle = "white";
			ctx.shadowBlur = 6;
			ctx.shadowColor = "red";
			
			if (this.amount / 10 >= 1)
				ctx.fillText("+" + this.amount, this.rect.x + 4, this.rect.y + 25);
			else
				ctx.fillText("+" + this.amount, this.rect.x + 10, this.rect.y + 25);

			
			ctx.restore()
		}
	}
}


function GrabItem(slot_id, item_id) {
	this.item_id = item_id;
	this.slot_id = slot_id;
	this.rect = new Rect({"x":0, "y":0, "w":49, "h":49});

	this.draw = function(ctx) {
		ctx.drawImage(Store.getAsset(Game.data.items[this.item_id].image), 1, 1, this.rect.w, this.rect.h, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	}
}


function Line(x,y,w,h) {

	this.rect = new Rect({"x":x, "y":y, "w":w, "h":h});

	this.border_thickness = 1;
	this.alpha = 0;
	this.color = '#0d0d0e';
	


	this.update = function() {


	}
		
	this.draw = function(ctx) {

		// Border
		ctx.fillStyle = '#3f4046';
		ctx.fillRect(this.rect.x, this.rect.y - this.border_thickness, this.rect.w , this.rect.h + (this.border_thickness*2));
		
		// Slot fill
		ctx.fillStyle = this.color;
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

	}
}


function Shop() {
	this.position = {"x":1086, "y":0};
	this.slots_x = 8;
	this.slots_y = 3;
	this.spacing = 8;
	this.margin = 8;
	this.border_thickness = 0.5;
	// TODO define the image size on top
	this.size = 49;
	this.rect = new Rect({"x":this.position.x, "y":this.position.y, "w":this.slots_x*(this.spacing+this.size)+this.margin/2, "h":this.slots_y*(this.spacing+this.size)+this.margin/2});

	this.items = [];
	for (var i=0;i<this.slots_x*this.slots_y;i++) {
		var x = this.position.x + this.margin + (i%this.slots_x)*(this.size+this.spacing);
		var y = this.position.y + this.margin + Math.floor(i/this.slots_x)*(this.size+this.spacing);
		this.items.push(new Slot(x, y, i, null));
	}

	this.items[0].setItem(new Item(5, 0));
	this.items[1].setItem(new Item(6, 0));
	this.items[2].setItem(new Item(7, 0));
	this.items[3].setItem(new Item(8, 0));
	this.items[4].setItem(new Item(10, 0));
	this.items[5].setItem(new Item(11, 0));
	this.items[6].setItem(new Item(12, 0));
	this.items[6].setItem(new Valk(13, 0));

	

	this.update = function() {
		
		for (var i=0; i<this.items.length; i++) {
			this.items[i].update();
		}
	}
	
	this.draw = function(ctx) {
		// Draw the border
		ctx.fillStyle = '#7a553c';
		ctx.fillRect(this.rect.x - this.border_thickness, this.rect.y - this.border_thickness, this.rect.w + (this.border_thickness*2), this.rect.h + (this.border_thickness*2));

		// Draw the inventory tab
		ctx.fillStyle = '#1b1b1f';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);


		// Draw items
		for (item of this.items) {
			item.draw(ctx);
		}
	}
}




function Inventory() {
	// TODO add frame for inventory / pearl items (valk's cry)
	// TODO make it moveable??

	// Inventory config
	this.position = {"x":1200, "y":200};
	this.slots_x = 6;
	this.slots_y = 8;
	this.spacing = 8;
	this.margin = 8;
	this.border_thickness = 0.5;
	// TODO define the image size on top
	this.size = 49;
	this.rect = new Rect({"x":this.position.x, "y":this.position.y, "w":this.slots_x*(this.spacing+this.size)+this.margin/2, "h":this.slots_y*(this.spacing+this.size)+this.margin/2});

	// List of items
	this.items = [];
	for (var i=0;i<this.slots_x*this.slots_y;i++) {
		var x = this.position.x + this.margin + (i%this.slots_x)*(this.size+this.spacing);
		var y = this.position.y + this.margin + Math.floor(i/this.slots_x)*(this.size+this.spacing);
		this.items.push(new Slot(x, y, i, null));
	}
	this.items[0].setItem(new Item(1, 0));
	this.items[1].setItem(new Item(2, 0));
	this.items[2].setItem(new Item(3, 0));
	this.items[3].setItem(new Item(4, 0));
	this.items[4].setItem(new Valk(9, 0, 50));



	
	this.update = function() {
		
		for (var i=0; i<this.items.length; i++) {
			this.items[i].update();
		}
	}
	
	this.draw = function(ctx) {
		// Draw the border
		ctx.fillStyle = '#7a553c';
		ctx.fillRect(this.rect.x - this.border_thickness, this.rect.y - this.border_thickness, this.rect.w + (this.border_thickness*2), this.rect.h + (this.border_thickness*2));

		// Draw the inventory tab
		ctx.fillStyle = '#1b1b1f';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);


		// Draw items
		for (item of this.items) {
			item.draw(ctx);
		}
	}
}


function Button(x,y) {
	this.position = {"x":x, "y":y};
	this.size = {"x":160, "y":40};
	this.rect = new Rect({"x":this.position.x, "y":this.position.y, "w":this.size.x, "h":this.size.y});

	this.draw = function(ctx) {
		ctx.fillStyle = '#4e4e59';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

		ctx.save()
		ctx.font = "20px Arial";
		ctx.fillStyle = "#7ca7c5";
		ctx.fillText("Enhancement", this.rect.x + 14, this.rect.y + 27);
		ctx.restore()

	}
}


function Box(x,y) {
	this.position = {"x":x, "y":y};
	this.size = {"x":20, "y":20};
	this.rect = new Rect({"x":this.position.x, "y":this.position.y, "w":this.size.x, "h":this.size.y});

	this.ticked = false;


	this.draw = function(ctx) {
		ctx.fillStyle = '#373b46';
		ctx.fillRect(this.rect.x - 1, this.rect.y - 1, this.rect.w + 2, this.rect.h + 2);

		
		// Slot fill
		ctx.fillStyle = '#161519';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	}
}

function Enhancer(inventory) {
	// TODO failstack saving (either new tabs or in valk cry)
	// TODO make it moveable?
	// TODO center on the screen
	this.position = {"x":400, "y":300};
	this.size = {"x":550, "y":250};
	this.rect = new Rect({"x":this.position.x, "y":this.position.y, "w":this.size.x, "h":this.size.y});
	this.image = new Rect({"x":this.position.x + (this.size.x - 500)/2, "y":this.position.y + (this.size.y - 120)/2, "w":500, "h":120});

	this.inventory = inventory;
	// Failstacks
	// TODO calculate the chance when the item is added to the enhancer
	this.failstacks = 0;
	this.chance = 0;
	this.can_upgrade = true;

	// Item boxes
	this.margin = (this.size.x - this.image.w) / 2;
	this.selected_item = new Slot(this.position.x + this.size.x - 106, this.position.y + this.size.y/2 - 44/2, -1, null);
	this.enh_stone = new Slot(this.position.x + 45, this.position.y + this.size.y/2 - 44/2, -1, null);

	// Progress line
	this.progress_line = new Line(this.enh_stone.rect.x + 49, this.enh_stone.rect.y + 17, this.selected_item.rect.x - this.enh_stone.rect.x - 49, 13);
	//this.progress_line = new Line(100, 200, 20, 400);
	
	// Skip button
	this.skip = new Box(this.position.x + 160, this.position.y+ 140);

	// Enhance button
	this.button = new Button(this.position.x + (this.size.x - 160)/2, this.position.y + 180);

	this.setItem = function(slot) {
		this.selected_item.setItem(new Item(slot.item.id, slot.item.level));
		this.selected_item.id = slot.id;
	}

	this.removeItem = function() {
		this.selected_item.item = null;
		this.selected_item.id = -1;

	}

	this.setMaterial = function(slot) {
		this.enh_stone.setItem(new Item(slot.item.id, slot.item.level));
		this.enh_stone.id = slot.id;
		this.enh_stone.amount = slot.amount;
	}

	this.removeMaterial = function() {
		this.enh_stone.item = null;
		this.enh_stone.id = -1;
		this.enh_stone.amount = 0;
	}

	this.update = function() {
		this.mouseClickPos = {'x':0, 'y':0, 'w':1, 'h':1};
		if (Game.mouseButtons.left) {
			this.mouseClickPos = {'x':Game.clickPos.x, 'y':Game.clickPos.y, 'w':1, 'h':1};
		} else {
			this.can_upgrade = true;
		}

		if (this.can_upgrade) {
			if (collision(this.mouseClickPos, this.button.rect) && this.selected_item.item != null && this.enh_stone.item != null) {
				this.enhance();
				this.can_upgrade = false;
			}
		}
	}

	this.calculateChance = function() {
		// Get item type
		// Use failstack to calculate the percentage
		var item_type = Game.data.items[this.selected_item.item.id].type;
		var item_grade = Game.data.items[this.selected_item.item.id].grade;

		var base = Game.data.rates[item_type][item_grade][this.selected_item.item.level][0];
		var pre_soft = Game.data.rates[item_type][item_grade][this.selected_item.item.level][1];
		var softcap = Game.data.rates[item_type][item_grade][this.selected_item.item.level][2];
		var post_soft = Game.data.rates[item_type][item_grade][this.selected_item.item.level][3];

		this.chance = base + (this.failstacks*pre_soft);
		if (this.chance >= softcap && this.chance < 100) {
			var x = (this.chance - softcap) / pre_soft;
			
			this.chance = softcap + (x * post_soft);
		}
		
	}


	this.resetCooldown = function() {
		this.cooldown = false;
	}

	this.enhance = function() {
		var rand = Number((Math.random()*100)).toFixed(2);
		
		if (rand <= this.chance) { // SUCCESS
			Store.getAsset("media/enh_success.mp3").stop()
			Store.getAsset("media/enh_success.mp3").play()
			// Update the items in inventory and enhancer
			this.selected_item.item.level += 1;
			this.inventory.items[this.selected_item.id].item.level += 1;
			// Destroy the accessory / clothes
			if (this.selected_item.item.data.type == "clothes" || this.selected_item.item.data.type == "accessory") {
				this.inventory.items[this.enh_stone.id].item = null;
				this.removeMaterial();
			}
			// Success and no longer free, clear fs and "spend" one enhnace material
			if (this.selected_item.item.level > Game.data.rates[Game.data.items[this.selected_item.item.id].type].free) {
				this.failstacks = 0;
			}
			// If got +15 remove enhance material from the enhancer
			if (this.selected_item.item.level == 15) {
				this.removeMaterial();
			}

			// If PEN remove all from enhancer
			if (this.selected_item.item.level == 20) {
				// Got PEN gz, remove from ehnancer
				this.selected_item.item = null;
				this.enh_stone.item = null;
			} else {
				this.calculateChance();	
			}
		} else { // FAIL
			Store.getAsset("media/enh_fail.mp3").stop()
			Store.getAsset("media/enh_fail.mp3").play()
			if (this.selected_item.item.level > 15) {
				switch(this.selected_item.item.level) {
					case 16: // PRI
						this.failstacks += 3;
					break;
					case 17: // DUO
						this.failstacks += 4;
					break;
					case 18: // TRI
						this.failstacks += 5;
					break;
					case 19: // TET
						this.failstacks += 6;
					break;
				}
			} else {
				this.failstacks += 1;
			}

			this.calculateChance();

			// If enhancement level > 15, reduce it by a level on fail
			if (this.selected_item.item.level > 16) {
				this.selected_item.item.level -= 1;
				this.inventory.items[this.selected_item.id].item.level -= 1;
			}
			// If enhancing clothes / accessory destroy the items on fail
			if (this.selected_item.item.data.type == "clothes" || this.selected_item.item.data.type == "accessory") {
				this.inventory.items[this.enh_stone.id].item = null;
				this.inventory.items[this.selected_item.id].item = null;
				this.removeMaterial();
				this.removeItem();
			}
		}
	}



	this.draw = function(ctx) {
		// Draw the inventory tab
		//ctx.fillStyle = 'red';
		ctx.fillStyle = '#1b1b1f';
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

		// FS
		ctx.font = "38px Arial";
		ctx.fillStyle = "#febb1a";
		ctx.fillText("+" + this.failstacks, this.position.x + 430, this.position.y + 50);
		// Chance
		if (this.selected_item.item  != null) {
			ctx.font = "20px Arial";
			ctx.fillStyle = "#c6c6c6";
			ctx.fillText("Enhancement Chance", this.position.x + 136, this.position.y + 90);
			ctx.fillStyle = "#13a7de";
			ctx.fillText(Number(this.chance).toFixed(2)  + "%", this.position.x + 340, this.position.y + 90);
		}
		


		this.progress_line.draw(ctx);
		ctx.drawImage(Store.getAsset("images/enhancer.png"), 1, 1, this.image.w, this.image.h, this.image.x, this.image.y, this.image.w, this.image.h);
		
		this.selected_item.draw(ctx);
		this.enh_stone.draw(ctx);

		this.skip.draw(ctx);
		ctx.font = "18px Arial";
		ctx.fillStyle = "#c6c6c6";
		ctx.fillText("Skip Animation", this.position.x + 190, this.position.y + 155);

		this.button.draw(ctx);

	}


}



function GUI() {
	this.shop = new Shop();
	this.inventory = new Inventory();
	this.enhancer = new Enhancer(this.inventory);

	this.item_grab = null;
	this.shop_added = false;

	this.update = function() {

		// 
		//	ITEM DRAG
		//

		// Checking if item was grabbed by the mouse
		if (this.enhancer.selected_item.item == null) {
			var mousePos = {'x':Game.mousePos.x, 'y':Game.mousePos.y, 'w':1, 'h':1};
			var mouseClickPos = {'x':0, 'y':0, 'w':1, 'h':1};

			if (Game.mouseButtons.left && this.item_grab == null) {
				mouseClickPos = {'x':Game.clickPos.x, 'y':Game.clickPos.y, 'w':1, 'h':1};
			} else if (this.item_grab != null){
				mouseClickPos = {'x':Game.clickPos.x, 'y':Game.clickPos.y, 'w':1, 'h':1};
			}
	
			var mouseReleasePos = {'x':Game.releasePos.x, 'y':Game.releasePos.y, 'w':1, 'h':1};
	
			
			if (this.item_grab != null) {
				this.item_grab.rect.x = mousePos.x;
				this.item_grab.rect.y = mousePos.y;
			}

			for (var i=0; i<this.inventory.items.length; i++) {
				if (this.inventory.items[i].item != null && collision(mouseClickPos, this.inventory.items[i].rect) && (Math.abs(Game.clickPos.x - mousePos.x) > 15 || Math.abs(Game.clickPos.y - mousePos.y) > 15) ) {
					// Spawn an item bellow the mouse pointer
					
					this.item_grab = new GrabItem(i, this.inventory.items[i].item.id);
					//this.item_grab = new Item(this.inventory.items[i].item.id, this.inventory.items[i].item.level);
					this.item_grab.rect.x = mousePos.x;
					this.item_grab.rect.y = mousePos.y;
				}
			}
			// On next click put the item in that slot
			for (var i=0; i<this.inventory.items.length; i++) {
				if (collision(mouseClickPos, this.inventory.items[i].rect) && collision(mouseReleasePos, this.inventory.items[i].rect) && this.item_grab != null) {
					
					var temp_item = Object.assign({},this.inventory.items[i]); // Slot we want to place our grabbed item
					// Place the item in new slot

					this.inventory.items[i].setItem(this.inventory.items[this.item_grab.slot_id].item);
					
					// Delete item from old slot
		
					if (temp_item == null) {
						this.inventory.items[this.item_grab.slot_id] = temp_item;
					} else {
						this.inventory.items[this.item_grab.slot_id].setItem(temp_item.item);
					}
	
					this.item_grab = null;
				}
			}
		}

		// 
		//	ITEM RIGHT CLICK
		//

		var rmbClick = {'x':Game.rmbClick.x, 'y':Game.rmbClick.y, 'w':1, 'h':1};

		// If item is clicked with right mouse button, place the item in the enhancer
		for (var i=0; i<this.inventory.items.length; i++) {
			if (collision(rmbClick, this.inventory.items[i].rect) && this.inventory.items[i].item != null) {
				if (this.inventory.items[i].item.data.type == 'misc') { // Valk's cry, etc

					if (this.inventory.items[i].item.data.name == "Advice of Valk") {
						// Add the stacks from the valk's enh chance
						if (this.enhancer.failstacks == 0) {
							this.enhancer.failstacks = this.inventory.items[i].item.amount;
							this.inventory.items[i].item = null;
							if (this.enhancer.selected_item.item != null) {
								this.enhancer.calculateChance();
							}
						}
					} else if (this.inventory.items[i].item.data.name == "Blacksmith's Secret Book") {
						if (this.enhancer.failstacks > 0) {
							this.inventory.items[i].setItem(new Valk(9, 0, this.enhancer.failstacks));
							this.enhancer.failstacks = 0;
							Game.rmbClick = {'x':0, 'y':0};
							if (this.enhancer.selected_item.item != null) {
								this.enhancer.calculateChance();
							}
						}
					}

				} else { // If item can be ehnanced
					if (this.inventory.items[i].item.level < Game.data.rates[this.inventory.items[i].item.data.type].max) {
						// Add enhance material
						if (this.enhancer.selected_item.item != null && this.enhancer.selected_item.id != this.inventory.items[i].id && this.inventory.items[i].item.level == 0 && this.enhancer.enh_stone.id != this.inventory.items[i].id) {
							// weapons / armor
							if (this.inventory.items[i].item.data.for == this.enhancer.selected_item.item.data.type) {
								if (this.enhancer.selected_item.item.level >= 15 && this.inventory.items[i].item.data.grade == "advanced") {
									Store.getAsset("media/add_slot.mp3").play()
									this.enhancer.setMaterial(this.inventory.items[i]);
								}
								if (this.enhancer.selected_item.item.level < 15 && this.inventory.items[i].item.data.grade == "normal") {
									Store.getAsset("media/add_slot.mp3").play()
									this.enhancer.setMaterial(this.inventory.items[i]);
								}
							}
							// Accessories / clothes
							if ((this.inventory.items[i].item.data.type == "clothes" || this.inventory.items[i].item.data.type == "accessory") && this.inventory.items[i].item.id == this.enhancer.selected_item.item.id) {
								Store.getAsset("media/add_slot.mp3").play()
								this.enhancer.setMaterial(this.inventory.items[i]);
							}
						}
						
						// Add item to enhance
						if (this.inventory.items[i].item.data.type != "material" && this.enhancer.selected_item.id != this.inventory.items[i].id &&this.enhancer.selected_item.item == null) {
							Store.getAsset("media/add_slot.mp3").play()
							this.enhancer.removeMaterial();			
							this.enhancer.setItem(this.inventory.items[i]);
							this.enhancer.calculateChance();
						}
					}
				}

			}  
			
			
		}
		// If RMB on enhancing item, remove it from the enhancer
		if (collision(rmbClick, this.enhancer.selected_item.rect)) {
			this.enhancer.removeItem();
			this.enhancer.removeMaterial();
		}

		// If clicked on the shop item
		for (var i=0; i<this.shop.items.length; i++) {
			if (collision(rmbClick, this.shop.items[i].rect) && this.shop_added == false) {
				// Loop through the inventory to find an empty slot
				for (var j = 0; j < this.inventory.items.length; j++) {
					if (this.inventory.items[j].item == null) {
						this.inventory.items[j].copyItem(this.shop.items[i].item);
						this.shop_added = true;
						break;
					}
				}
			}
		}
		
		if (this.shop_added) {
			if(Game.rmbClick.x == 0 && Game.rmbClick.y == 0) {
				this.shop_added = false;
			}
		}


		
		this.shop.update();
		this.inventory.update();
		this.enhancer.update();
	}

	this.draw = function(ctx) {
		this.shop.draw(ctx);
		this.inventory.draw(ctx);
		this.enhancer.draw(ctx);

		// Grabbed item
		if (this.item_grab != null) {
			this.item_grab.draw(ctx);
		}
	}
}




function Play() {
	
	this.init = function() {
		this.gui = new GUI();
	}
	
	
	this.update = function (){
		
		var mousePos = {'x':Game.mousePos.x, 'y':Game.mousePos.y, 'w':15, 'h':15};
		var mouseClickPos = {'x':Game.clickPos.x, 'y':Game.clickPos.y, 'w':15, 'h':15};
		
		this.gui.update();
		
	} // End of update
	
	this.render = function (ctx){
		// Setting the backgroud color the balck
		ctx.clearRect(0,0, Game.width,Game.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, Game.width, Game.height);
		
		this.gui.draw(ctx);

	}	
}