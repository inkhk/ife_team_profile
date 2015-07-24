var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game){
	game.canvas = document.getElementById('canvas');
	game.helper.resizeCanvas();
	game.setting = {
		gameWidth: game.canvas.width,
		gameHeight: game.canvas.height,
		ticksPerNewDiamond: 20,
		fallingSpeed: 5,
		diamondWidth: 90,
	}
}).call(this, game);

//Tick
;(function(){
	game.Tick = function(e){
		game.stage.update();

		if (!e.paused) {
			game.gameView.moveObjects();
			var ticksCount = createjs.Ticker.getTicks(true);
			if (ticksCount % game.setting.ticksPerNewDiamond === 0) {
				game.gameView.generateDiamond();
			};
		};
	}
}).call(this);

;(function(game, cjs){
	//TODO游戏逻辑
	game.gameView = {
		countBoard: {},
		diamondsRepositories: [],
		generateDiamond: function(){
			//console.log('generateDiamond');
			diamond = new game.diamond();
			diamond.y = - game.setting.diamondWidth;
			diamond.x = Math.random() * (game.setting.gameWidth - game.setting.diamondWidth);
		//	console.log(diamond);
			game.stage.addChild(diamond);
			this.diamondsRepositories.push(diamond);
		},
		init: function(){
			this.putOnCountBoard();
			this.generateDiamond();
			createjs.Ticker.setFPS(40);
			createjs.Ticker.addEventListener('tick', game.Tick);
		},
		moveObjects: function(){
			for(var i=0, len=this.diamondsRepositories.length; i<len; i++){
				if (this.diamondsRepositories[i] != null) {
					var diamond = this.diamondsRepositories[i];
					diamond.y += game.setting.fallingSpeed;
					if (diamond.y > game.setting.gameHeight) {
						this.removeDiamond(diamond);
					};
				};	
			}
		},
		removeDiamond: function(target){
			for(var i=0, len=this.diamondsRepositories.length; i<len; i++){
				var diamond = this.diamondsRepositories[i];
				if (diamond === target) {
					this.diamondsRepositories.splice(i, 1);
					game.stage.removeChild(diamond);
					return;
				};
			}
		},
		putOnCountBoard: function(){
			this.countBoard = new game.diamondBoard();
			game.stage.addChildAt(this.countBoard);
		}
	}

	game.initLoader = function(complete){
		manifest = [
			{src: "cat_01.png", id: "cat"},
			{src: "money.png", id: "money"},
			{src: "diamond-spritesheet.png", id: "diamond"},
			{src: "diamonds.png", id:"diamondsBoard"}
		];
		game.loader = new cjs.LoadQueue(false);
		game.loader.addEventListener("complete", complete);
		game.loader.loadManifest(manifest, true, "imgs/");

	}
}).call(this, game, createjs);



;(function(game, cjs){
	//TODO 游戏开始方法
	game.start = function(){
		game.stage = new cjs.Stage(game.canvas);

		var handleComplete = function(){
			//cat = new game.cat();
			//diamond = new game.diamond();
			//diamond.y = 200;
			//game.stage.addChild(cat);
			//game.stage.addChild(diamond);

			//game.
			game.gameView.init();
		}
		game.initLoader(handleComplete);
	}

}).call(this, game, createjs);

;(function(game){
	if (game) {
		game.start();
	}else{
		throw "No game logic found.";
	}
}).call(this, game);