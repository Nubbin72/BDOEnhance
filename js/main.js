var data = [
	// Audio
	{"url" : "media/black_spirit.mp3"},
	{"url" : "media/add_slot.mp3"},
	{"url" : "media/slot_mouseover.mp3"},
	{"url" : "media/enh_fail.mp3"},
	{"url" : "media/enh_success.mp3"},

	// Images
	{"url" : "images/dandelion.png"},
	{"url" : "images/kzarka.png"},
	{"url" : "images/reblath.png"},
	{"url" : "images/enhancer.png"},
	{"url" : "images/advice_of_valk.png"},
	{"url" : "images/cook.png"},
	{"url" : "images/crescent_ring.png"},
	{"url" : "images/black_stone_weapon.png"},
	{"url" : "images/black_stone_armor.png"},
	{"url" : "images/concetrated_black_stone_weapon.png"},
	{"url" : "images/concetrated_black_stone_armor.png"},
	{"url" : "images/ogre_ring.png"},
	{"url" : "images/basilisk_belt.png"},
	{"url" : "images/witch_earring.png"}, // TODO add upgrade rates for blue accessories
	{"url" : "images/dim_tree_armor.png"}, // TODO add upgrade rates for yellow armor
	{"url" : "images/secret_book.png"} 



];

// Posible game states
var states = {
	"MainMenu" : function() {
		var stage = new MainMenu();
		Game.loadstate(stage);
	},
	"Play" : function() {
		var stage = new Play();
		Game.loadstate(stage);
	},
	
	"About" : function() {
		var stage = new About();
		Game.loadstate(stage);
	},
	"Lost" : function() {
		var stage = new Lost();
		Game.loadstate(stage);
	}
}

//------------------------- initialization --------------------------

$(function(){
	Store.loaddata(data).then(function(){
		Game.init("scene");
   	});
   
	$(window).resize( function(e){
	   Game.scaleToWindow();
   	});
	$(window).addEventListener("load", function() { 
		$(window).scrollTo(0, 1); 
	});
});