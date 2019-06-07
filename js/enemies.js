function Fly(prop) {
	this.rect = new Rect(prop.rect)
	this.type = prop.type;
	// Image source coords
	this.sx = 0;
	this.sy = 0;
	// Moving direction
	this.dx = 2;
	this.dy = -2;
	this.health = 40;
	this.alive = true;
	this.animation_frame = 0;
	this.animation_timer = 0;
	this.animation_speed = 50;
	this.sound = Store.getAsset("media/fly.mp3");
	this.sound.loop = true;
	this.dieSound = Store.getAsset("media/death_monster.mp3");
	
	
	this.update = function() {
		// Animation
		this.animation_timer += Game.elapsed;
		this.sound_timer += Game.elapsed;
		// if animation timer is greater than one frame time, go to next frame and reset the timer
		if (this.animation_timer >= this.animation_speed) {
			this.animation_timer = 0;
			this.animation_frame += 1;
		}
		// If last frame in the row, increase y and reset the x frame to 0;
		if (this.animation_frame >= 2) {
			this.animation_frame = 0;
		}
		
		// Set x frame	
		this.sx = this.animation_frame * 32;

		if (this.health <= 0 && this.alive) {
			this.alive = false;
			this.dieSound.play();
		}
	
		this.rect.x += this.dx;
		this.rect.y += this.dy;
	}
	
	
	this.stopSounds = function() {
		this.sound.pause();
	}
	this.startSound = function() {
		if (!this.sound.playing)
			this.sound.play();
	}
	
	this.takeHit = function(damage) {
		this.health -= damage;
	}
	
	this.draw = function(ctx) {
		ctx.drawImage(Store.getAsset('images/fly.png'), this.sx, this.sy, this.rect.w+16, this.rect.h+16, this.rect.x-8, this.rect.y-8, this.rect.w+16, this.rect.h+16);
	}
}

function Jumper(prop) {
	this.rect = new Rect(prop.rect);
	this.type = prop.type;
	this.rect.w = this.rect.w - 20;
	this.rect.h = this.rect.h - 48;
	this.sx = 0;
	this.sy = 112;
	this.angle_offset = 0;
	this.health = 120;
	this.alive = true;
	this.range = 200;
	this.bullets = [];
	this.shooting_timer = 0;
	this.shooting_delay = 800;
	
	this.animation_frame = 0;
	this.animation_timer = 0;
	this.animation_speed = 100;
	
	
	this.update = function() {
		this.animation_timer += Game.elapsed;
		if (this.animation_timer >= this.animation_speed) {
			this.animation_timer = 0;
			this.sx += 80;
		}
		if (this.sx >= 400) {
			this.sy += 112;
			this.sx = 0;
		}
		if (this.sy >= 224) {
			this.sx = 0;
			this.sy = 0;
		}
		
		if (this.health <= 0) {
			this.alive = false;
			Store.getAsset("media/death_monster.mp3").play();
		}
		
		for (bullet of this.bullets) {
			bullet.update();
		}
		
		// Update the shooting timer
		this.shooting_timer += Game.elapsed;
		if (this.shooting_timer >= this.shooting_delay) {
			this.shooting_timer = 0;
			this.fire();
			
		}
		
	}
	
	
	this.takeHit = function(damage) {
		this.health -= damage;
		Store.getAsset("media/monster_grunt.mp3").play();
	}
	
	this.fire = function() {
		for (var angle=0; angle<360; angle+=45) {
			this.bullets.push(new Bullet(this.rect.x+14, this.rect.y+this.rect.h/2, angle+this.angle_offset, 'red', this.range));
		}
		this.angle_offset += 22.5;
		Store.getAsset("media/monster_graug.mp3").play();
	}
	

	
	this.draw = function(ctx) {
		//this.rect.draw(ctx);
		for (bullet of this.bullets) {
			bullet.draw(ctx);
		}
		ctx.drawImage(Store.getAsset("images/jumper.png"), this.sx, this.sy, this.rect.w+20, this.rect.h+48, this.rect.x-10, this.rect.y-48, this.rect.w+20, this.rect.h+48);
	}
}

function HardHead(prop) {
	this.rect = new Rect(prop.rect);
	this.type = prop.type;
	// Image source coords
	this.sx = 0;
	this.sy = 32;
	// Direction for bullets
	this.dx = 0;
	this.dy = 0;
	this.health = 80;
	this.range = 400;
	this.alive = true;
	this.defending = false;
	this.dieSound = Store.getAsset("media/death_monster.mp3");
	this.bullets = [];
	this.shooting_timer = 0;
	this.shooting_delay = 700;
	
	this.update = function(x, y) {
		if (!this.defending) {
			this.sx = 32;
			this.sy = 22;
			this.rect.h = 44;
			
			// Update shooting timer
			this.shooting_timer += Game.elapsed;
			// Create bullet if needed
			if (this.shooting_timer >= this.shooting_delay) {
				this.shooting_timer = 0;
				var angle = Math.atan2(y - this.rect.y - 30, x - this.rect.x);
				angle *= 180/Math.PI;
				this.bullets.push(new Bullet(this.rect.x-8, this.rect.y+24, angle, 'red', this.range));
			}
			
		} else {
			// Change the image source if the enemy is defending
			this.sx = 0;
			this.sy = 32;
			this.rect.h = 32;
		}
		
		if (this.health <= 0 && this.alive) {
			this.alive = false;
			this.dieSound.play();
		}
		
		for (bullet of this.bullets) {
			bullet.update();
		}
		
		// If the player is standing line with the enemy go defencive
		if (Math.abs(y - this.rect.y) <= 50 || Math.abs(x - this.rect.x) <= 50) {
			this.defending = true;
		} else {
			this.defending = false;
		}
		
	}

	this.takeHit = function(damage) {
		if (!this.defending)
		{
			this.health -= damage;
			Store.getAsset("media/monster_grunt.mp3").play();
			
		}
	}
	
	this.draw = function(ctx) {
		ctx.drawImage(Store.getAsset('images/hard-head.png'), this.sx, this.sy, this.rect.w+16, this.rect.h+8, this.rect.x-8, this.rect.y+8, this.rect.w+16, this.rect.h+8);
		for (bullet of this.bullets) {
			bullet.draw(ctx);
		}
	}
}




function Boss(prop) {
	this.drawing_rect = new Rect(prop.rect);
	this.rect = new Rect(prop.rect);
	this.rect.x += 31;
	this.rect.y += 24;
	this.rect.w = 36;
	this.rect.h = 54;
	this.type = prop.type;
	this.sx = 5*96;
	this.sy = 96;
	this.health = 800;
	this.range = 400;
	this.speed = 2;
	this.alive = true;
	this.intro_played = false;
	this.bullets = [];
	
	this.rapid_fire = false;
	this.smash_fire = false;
	this.chase = false;
	this.attack_timer = 2000;
	this.attack_delay = 3000;
	this.attack = false;
	this.current_attack = 0;
	this.shooting_timer = 0;
	this.angle_offset = 0;
	
	this.update = function(x, y) {
		if (!this.intro_played) {
			Store.getAsset("media/boss_intro.mp3").play();
			this.intro_played = true;
		}
		
		this.attack_timer += Game.elapsed;
		if(this.attack_timer >= this.attack_delay) {
			this.attack = true;
		}
		
		if (this.attack) {
			switch (this.current_attack) {
				case 0:
					this.rapid_fire = true;
					break;
				case 1:
					this.smash_fire = true;
					break;
				case 2:
					this.chase = true;
					break;
				default:
					this.current_attack = 0;
		   }
		}
		
		// rapid fire attack
		if (this.rapid_fire) {
			// Variable that tracks when to fire next bullet
			this.shooting_timer += Game.elapsed;
			
			// If the attack lasted x many seconds, stop it.
			if (this.attack_timer >= this.attack_delay + 1500) {12
				this.rapid_fire = false;
				this.attack_timer = 0;
				this.attack = false;
				this.current_attack++;
			}
			// If it is time to shoot next bullet
			if (this.shooting_timer >= 50) {
				this.shooting_timer = 0;
				var angle = Math.atan2(y - this.rect.y - 30, x - this.rect.x - 8);
				angle *= 180/Math.PI;
				this.bullets.push(new Bullet(this.rect.x+2, this.rect.y+32, angle, 'red', this.range));
			}
		}
		
		// Jump into air and when lands, send a pulse of projectiles around it
		if (this.smash_fire) {
			// Variable that tracks when to fire next bullet
			this.shooting_timer += Game.elapsed;
			if (this.attack_timer >= this.attack_delay + 300) {
				this.smash_fire = false;
				this.attack_timer = 0;
				this.attack = false;
				this.current_attack++;
			}
			// If it is time to shoot next circle of bullets
			if (this.shooting_timer >= 10) {
				this.shooting_timer = 0;
				for (var angle=0; angle<360; angle+=45) {
					this.bullets.push(new Bullet(this.rect.x+2, this.rect.y+32, angle+this.angle_offset, 'red', this.range));
				}
				this.angle_offset += 22.5;
			}
		}
		
		// Chase the player until the player is hurt or for a certein time
		if (this.chase) {
			console.log(this.chase);
			if (this.attack_timer >= this.attack_delay + 3000) {
				this.chase = false;
				this.attack_timer = 0;
				this.attack = false;
				this.current_attack++;
			}
			
			// Calculate the move direction
			var angle = Math.atan2(y - this.rect.y - 30, x - this.rect.x);
			angle *= 180/Math.PI;
			var rad = angle * Math.PI/180;
			this.dx = Math.cos(rad) * this.speed;
			this.dy = Math.sin(rad) * this.speed;
			
			this.rect.x += this.dx;
			this.rect.y += this.dy;
			this.drawing_rect.x += this.dx;
			this.drawing_rect.y += this.dy;
			
			// TODO stop if the player is hurt
		}
		
		// Update the bullets
		for (bullet of this.bullets) {
			bullet.update();
		}
		
		// Check if should die
		if (this.health <= 0) {
			this.die();
		}
	}
	
	this.takeHit = function(damage) {
		this.health -= damage;
		Store.getAsset("media/monster_grunt.mp3").play();	
	}
	
	this.die = function() {
		Store.getAsset("media/boss_death.mp3").play();
		this.alive = false;
	}
	
	this.stopChase = function() {
		this.chase = false;
		this.attack_timer = 0;
		this.attack = false;
		this.current_attack++;
	}
	
	this.draw = function(ctx) {
		ctx.drawImage(Store.getAsset('images/boss.png'), this.sx, this.sy, this.drawing_rect.w, this.drawing_rect.h, this.drawing_rect.x, this.drawing_rect.y, this.drawing_rect.w, this.drawing_rect.h);
		for (bullet of this.bullets) {
			bullet.draw(ctx);
		}
	}
}



