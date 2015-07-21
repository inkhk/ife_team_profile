var game = this.game || (this.game = {});

;(function(){
	game.helper = game.helper || {};
	game.helper.resizeCanvas = function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;
	}
})();