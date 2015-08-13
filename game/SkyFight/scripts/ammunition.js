var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	game.bulletModel = function(opt){
		return {
			type: opt.type,
			bullet: opt.bulletArr,
			direction: opt.bulletDirect,
		}
	}
}).call(this, game, createjs);



;(function(game, cjs){
	game.ammunition = {
		normal: game.bulletModel({
			type: 'normal',
			bulletArr: [[1]],
			bulletDirect: [[0]]
		}),
		twice:  game.bulletModel({
			type: 'twice',
			bulletArr: [[1, 1]],
			bulletDirect: [[0, 0]]
		}),
		triple:  game.bulletModel({
			type: 'triple',
			bulletArr: [[1, 1, 1]],
			bulletDirect: [[-20, 0, 20]]
		}),
		diamond: game.bulletModel({
			type: 'diamond',
			bulletArr: [[0, 0, 1, 0, 0],
						[0, 1, 1, 1, 0],
						[1, 1, 1, 1, 1],
						[0, 1, 1, 1, 0],
						[0, 0, 1, 0, 0],],
			bulletDirect: [[0, 0, 0, 0, 0],
						   [0, 0, 0, 0, 0],
						   [0, 0, 0, 0, 0],
					       [0, 0, 0, 0, 0],
						   [0, 0, 0, 0, 0],]
		}),
	}
}).call(this, game, createjs);