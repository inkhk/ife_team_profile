var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	
	(game.sycee = function(){
		game.sycee.call(this, 'imgs/money.png');
		this.x = 0;
		this.y = 0;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	//TODO 补全猫的sprite
	(game.cat = function(){

	}).prototype = Object.create(cjs.Bitmap.prototype);

}).call(this, game, createjs)