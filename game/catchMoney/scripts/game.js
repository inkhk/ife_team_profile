var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game){
	game.canvas = document.getElementById('canvas');
	game.helper.resizeCanvas();
	game.setting = {
		gameWidth: game.canvas.width,
		gameHeight: game.canvas.height
	}
}).call(this, game);

;(function(game, cjs){
	//TODO游戏逻辑


}).call(this, game, createjs);

;(function(game, cjs){
	//TODO 游戏开始方法
	game.start = function(){

	}

}).call(this, game, createjs);

;(function(game){
	if (game) {
		game.start();
	}else{
		throw "No game logic found.";
	}
}).call(this, game);