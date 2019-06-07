function collision(obj1, obj2) {
	if (obj1.x + obj1.w > obj2.x && 
		obj1.y + obj1.h > obj2.y &&
		obj1.x < obj2.x + obj2.w &&
		obj1.y < obj2.y + obj2.h)
		return true;
	else
		return false;
}


function Rect(prop) {
	this.x = prop.x;
	this.y = prop.y;
	this.w = prop.w;
	this.h = prop.h;
	this.color = 'white';
	
	this.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}