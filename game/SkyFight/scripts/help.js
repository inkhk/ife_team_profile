var game = this.game || (this.game = {});
var createjs = createjs || {};

;(function(game, cjs){
	game.helper = game.helper || {};
	game.helper.resizeCanvas = function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;
	};
	game.helper.detectCollision = function(obj1, obj2){
		if (!obj1 || !obj2) {
			return false;
		};
		if (!(typeof obj1.getBounds == 'function' && typeof obj2.getBounds == 'function')) {
			return false;
		}
		var bound1 = obj1.getBounds(),
			bound2 = obj2.getBounds(),
			x1 = obj1.x, y1 = obj1.y, 
			w1 = bound1.width * obj1.scaleX,
			h1 = bound1.height * obj1.scaleY,

			x2 = obj2.x, y2 = obj2.y, 
			w2 = bound2.width * obj2.scaleX,
			h2 = bound2.height * obj2.scaleY;

		if (x1 >= x2 && x1 >= x2 + w2) {  
            return false;  
        } else if (x1 <= x2 && x1 + w1 <= x2) {  
            return false;  
        } else if (y1 >= y2 && y1 >= y2 + h2) {  
            return false;  
        } else if (y1 <= y2 && y1 + h1 <= y2) {  
            return false;  
        }  
        return true;  
	};

	game.helper.formatNum = function(Source, Length){ 
		var strTemp=""; 
		for(i=1;i<=Length-Source.length;i++){ 
			strTemp+="0"; 
		} 
		return strTemp+Source; 
	};

	(game.helper.stopGenerateDiamondEvent = function(){
		cjs.Event.call(this, 'stopGenerateDiamondEvent', true, true);
	}).prototype = Object.create(cjs.Event.prototype);

	(game.helper.gameOverEvent = function(score){
		cjs.Event.call(this, 'gameOverEvent', true, true);
		this.set({
			score: score
		});
	}).prototype = Object.create(cjs.Event.prototype);


    
}).call(this, game, createjs);