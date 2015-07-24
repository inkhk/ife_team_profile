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
		gameTimeout: 2
	}
}).call(this, game);

//Tick
;(function(cjs){
	game.Tick = function(e){
		game.stage.update();

		if (!e.paused) {
			game.gameView.moveObjects();
			if(game.gameView.diamondFactoryState){
				game.gameView.timer.showTime(cjs.Ticker.getTime());
			}

			var ticksCount = createjs.Ticker.getTicks(true);
			if (game.gameView.diamondFactoryState && ticksCount % game.setting.ticksPerNewDiamond === 0) {
				game.gameView.generateDiamond();
			};
			game.gameView.checkOnDiamonds();
		};
	}
}).call(this, createjs);

;(function(game, cjs){
	//TODO游戏逻辑
	game.gameView = {
		countBoard: {},
		diamondsRepositories: [],
		diamondFactoryState: true,
		generateDiamond: function(){
			diamond = new game.diamond();
			diamond.y = - game.setting.diamondWidth;
			diamond.x = Math.random() * (game.setting.gameWidth - game.setting.diamondWidth);
			game.stage.addChild(diamond);
			this.diamondsRepositories.push(diamond);
		},
		init: function(){
			this.putOnCountBoard();
			this.putOnTimerBoard();
			this.generateDiamond();
			cjs.Ticker.setFPS(40);
			cjs.Ticker.addEventListener('tick', game.Tick);
		},
		reset: function(){
			game.stage.removeAllChildren();
			this.diamondFactoryState = true;
			this.init();
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
		checkOnDiamonds: function(){
			if (this.diamondsRepositories.length === 0) {
				game.stage.dispatchEvent(new game.helper.gameOverEvent(10));
			};
		},
		putOnCountBoard: function(){
			this.countBoard = new game.diamondBoard();
			game.stage.addChild(this.countBoard);
		},
		putOnTimerBoard: function(){
			this.timer = new game.clock();
			game.stage.addChild(this.timer);
		}
	}

	game.initLoader = function(complete){
		manifest = [
			{src: "cat_01.png", id: "cat"},
			{src: "money.png", id: "money"},
			{src: "diamond-spritesheet.png", id: "diamond"},
			{src: "diamonds.png", id:"diamondsBoard"},
			{src: "clock.png", id: "clock"}
		];
		game.loader = new cjs.LoadQueue(false);
		game.loader.addEventListener("complete", complete);
		game.loader.loadManifest(manifest, true, "imgs/");

	}

	game.initGameOver = function(){
		game.stage.addEventListener('gameOverEvent', function(e){
			cjs.Ticker.removeEventListener('tick', game.Tick);
			console.log(e);
		})
	}
	game.initStopGenerateDiamond = function(){
		game.stage.addEventListener('stopGenerateDiamondEvent', function(e){
			console.log('stop');
			game.gameView.diamondFactoryState = false;
		})
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
			game.initGameOver();
			game.initStopGenerateDiamond();
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