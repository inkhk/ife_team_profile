var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game){
	game.canvas = document.getElementById('canvas');
	game.helper.resizeCanvas();
	//记录按键的状态
	game.keys={};
	game.setting = {
		gameWidth: game.canvas.width,
		gameHeight: game.canvas.height,
		backgroundVelocity: 30,
		initialBomb: 2,

		heroVelocity: 100,

		bulletVelocity: 100,
		bulletFrequency: 20,
		bulletPower: 1,
		initialBulletSpan: 20,

		enemyType: 3,
		enemy1Frequency: 50,
		enemy1Velocity: 60,
		enemy1HP: 1,
		enemy1Score: 100,

		enemy2Frequency: 120,
		enemy2Velocity: 40,
		enemy2HP:5,
		enemy2Score: 500,

		enemy3Frequency: 500,
		enemy3Velocity: 20,
		enemy3HP:20,
		enemy3Score: 1000,

		supplyType: 2,
		supply1Frequency: 600,
		supply1Velocity: 30,

		supply2Frequency: 800,
		supply2Velocity: 30,
         
        KEY_CODES :{ 37:'left', 39:'right',32:'bomb'},

	}
}).call(this, game);


;(function(game, cjs){
	game.initLoader = function(complete){
		manifest = [
			{src: "aircraft.png", id: "aircraft"},
			{src: "enemy1.png", id: "enemy1"},
			{src: "enemy2.png", id: "enemy2"},
			{src: "enemy3.png", id: "enemy3"},
			{src: "shoot/bullet1.png", id: "heroBullet"},
			{src: "shoot/bullet2.png", id: "enemyBullet"},
			{src: "shoot/bomb.png", id: "bombRepository"},
			{src: "shoot/ufo1.png", id: "ufo1"},
			{src: "shoot/ufo2.png", id: "ufo2"},
			{src: "background.png", id: "background"},
			{src: "shoot/bomb.png", id: "bomb"},
			{src: "shoot/game_pause_nor.png", id: "pause"},
			{src: "shoot/game_resume_nor.png", id: "resume"}
		];
		game.loader = new cjs.LoadQueue(false);
		game.loader.addEventListener("complete", complete);
		game.loader.loadManifest(manifest, true, "imgs/");
	}
}).call(this, game, createjs);

;(function(game, cjs){
	game.Tick = function(event){
		
	}
}).call(this, game, createjs)

;(function(game, cjs){
	game.eventHandler = {
		init: function(){
			this.initDiviceOrientationEvent();
			this.initBombClickEvent();
			this.initPauseClickEvent();
			this.initKeyEvent();
		},
		initKeyEvent:function(){
             window.addEventListener('keydown',function(event) {
             	console.log(event.keyCode);
             	if(game.setting.KEY_CODES[event.keyCode]){
             		game.keys[game.setting.KEY_CODES[event.keyCode]] = true;
                   if(game.keys['left']){
                     game.heroCraft.handleX = -game.setting.heroVelocity;
                   }else if(game.keys['right']){
                     game.heroCraft.handleX = game.setting.heroVelocity;
                   }else if(game.keys['bomb']){
                     game.eventHandler.bombClickEventHandler();
                   }
             	}
                
             	
                event.preventDefault();
              },false);

             window.addEventListener('keyup',function(event) {
              if(game.setting.KEY_CODES[event.keyCode]){
                 game.keys[game.setting.KEY_CODES[event.keyCode]] = false;
                 game.heroCraft.handleX = 0;
               }
                 event.preventDefault();
              
             },false);

		},
		initDiviceOrientationEvent: function(){
			window.addEventListener("deviceorientation", this.diviceOrientationEventHandler, true);
		},
		diviceOrientationEventHandler: function(event){
			event.preventDefault();
			var gamma = event.gamma;
			if (gamma > 10) {
				console.log('toRight')
				game.heroCraft.handleX = game.setting.heroVelocity;
			}else if (gamma < -10) {
				console.log('toLeft')
				game.heroCraft.handleX = -game.setting.heroVelocity;
			}else{
				game.heroCraft.handleX = 0;
			}
			return false;
		},
		initBombClickEvent: function(){
			game.bombBoardObj.addEventListener('mousedown', this.bombClickEventHandler);
		},
		bombClickEventHandler: function(event){
			if (game.bombBoardObj.useBomb()){
				console.log('bomb!');
				var enemyRepository = game.enemyCraft.enemyRepository,
					len = enemyRepository.length,
					i, count = 0;

				game.enemyCraft.enemySwitch = false;

				for (i = 0; i < len; i++){
					//game.enemyCraft.destroyEnemy(i);
					var enemy = enemyRepository[i],
						sprite = enemy.getChildAt(0),
						enemyType = enemy.enemyType;
					sprite.addEventListener('animationend', (function(enemyType, enemy){
						return function(event){
							if (event.name === 'destroy') {
								if(game.stage.removeChild(enemy)){
									game.scoreBoardObj.addScore(game.setting["enemy"+ enemyType + "Score"]);
									if (count === len-1){
										game.enemyCraft.enemySwitch = true;
									}else{
										count ++;	
									}
								};
							};
						}
					})(enemyType, enemy))

					sprite.gotoAndPlay("destroy");
					if (i === len-1) {
						game.enemyCraft.enemyRepository = [];
					};
				}
			}
		},
		initPauseClickEvent: function(){
			game.scoreBoardObj.addEventListener('mousedown', this.pauseClickEventHandler);
		},
		pauseClickEventHandler: function(event){
			if(cjs.Ticker.paused){
				console.log('resume');
				game.scoreBoardObj.resume();
				cjs.Ticker.paused = false;
			}else{
				console.log('pause');
				game.scoreBoardObj.pause();
				cjs.Ticker.paused = true;
			}
			game.stage.update();
		}
	}
}).call(this, game, createjs)

;(function(game, cjs){
	game.battleField = {
		init: function(){
			this.background = new game.backgroundBitmap();
			this.background.y = -this.background.getBounds().height * this.background.scaleY / 2;
			game.stage.addChild(this.background);
		},
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var deltaS = event.delta / 1000;
				//设置背景移动速度
				this.background.y = this.background.y + deltaS * game.setting.backgroundVelocity;
				
				if (this.background.y >= 0) {
					this.background.y = -this.background.getBounds().height * this.background.scaleY/2;
				}
				game.stage.update(event);
			};
			
		}
	}

	game.heroCraft = {
		heroBullets:[],
		handleX: 0,
		bulletType: '',
		bulletDepthCounts: 0,
		levelNow: 0,
		allLevels: [],
		init: function(){
			for (var mode in game.ammunition){
				this.allLevels.push(game.ammunition[mode].type);
			}
			this.bulletType = this.allLevels[this.levelNow];
			console.log(this.bulletType)
			game.craft = new game.airCraft();
			game.craft.y = game.setting.gameHeight - 100;
			game.craft.x = (game.setting.gameWidth - game.craft.getBounds().width * game.craft.scaleX)/2 
			game.stage.addChild(game.craft);
		},
		generateHeroBullet: function(){
			var weapon = game.ammunition[this.bulletType],
				weaponWidth = weapon.bullet[0].length,
				weaponSpan = game.setting.initialBulletSpan * (weaponWidth - 1),
				weaponHeight = weapon.bullet.length,
				craftCenter = game.craft.x + game.craft.getBounds().width * game.craft.scaleX/2,
				intialX = craftCenter - weaponSpan / 2,
				row = this.bulletDepthCounts % weaponHeight;

			//for (var row = 0; row < weaponHeight; row++) {
				for (var col = 0; col < weaponWidth; col++) {
					if (weapon.bullet[row][col] == 1) {
						var bullet = new game.heroBullet();
						bullet.x = intialX +  game.setting.initialBulletSpan * col - bullet.getBounds().width * bullet.scaleX/ 2;
						bullet.y = game.craft.y - bullet.getBounds().height * bullet.scaleY;
						bullet.rotation = weapon.direction[row][col];
						game.stage.addChild(bullet);
						this.heroBullets.push(bullet);
					};
				};

				this.bulletDepthCounts ++;
			//};

			/*var bullet = new game.heroBullet();
			bullet.x = game.craft.x
					 + (game.craft.getBounds().width * game.craft.scaleX
					 - 2)/2;

			bullet.y = game.craft.y - bullet.getBounds().height * bullet.scaleY;
			game.stage.addChild(bullet);
			this.heroBullets.push(bullet);*/
		},
		levelUp: function(){
			console.log('levelUp')
			if (this.levelNow < this.allLevels.length-1) {
				this.levelNow++;
				this.bulletType = this.allLevels[this.levelNow];
			};
		},
		BulletStillFlying: function(idx){
			//如果超过边界了
			var bullet = this.heroBullets[idx];
			if(bullet.y <= -bullet.getBounds().height * bullet.scaleY || bullet.x >= game.setting.gameWidth ||  bullet.x <= -bullet.getBounds().width * bullet.scaleX){
				this.destroyBullet(idx)
				return false;
			}
			return true;
		},
		destroyBullet: function(idx){
			if (game.stage.removeChild(this.heroBullets[idx])) {
				this.heroBullets.splice(idx ,1);
			}	
		},
		destroyHero: function(){
			var sprite = game.craft.getChildAt(0);
			sprite.addEventListener('animationend', function(event){
				if (event.name === 'destroy') {
					    document.getElementById('gamebg').style.display = 'none';
                        document.getElementById('canvas').style.display = 'none';
                        document.getElementById('gameover').style.display = 'block';

                        document.getElementById('score').innerText = game.scoreBoardObj.getScore();

						//游戏结束逻辑	
						console.log('gameOver')
					
				};
			})
			sprite.gotoAndPlay("destroy");
		},
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var len = this.heroBullets.length, 
					deltaS = event.delta / 1000,
					i;

				for(i = 0; i < len; i++){
					if(this.BulletStillFlying(i)){
						this.heroBullets[i].y = this.heroBullets[i].y - deltaS * game.setting.bulletVelocity;
						this.heroBullets[i].x = this.heroBullets[i].x + deltaS * Math.tan(this.heroBullets[i].rotation / 180 * Math.PI) * game.setting.bulletVelocity;
					}else{
						len --;
					}
				}

				if (cjs.Ticker.getTicks() % game.setting.bulletFrequency === 0){
					this.generateHeroBullet();
				}

				//hero移动 this.handleX
				var toBe = game.craft.x + deltaS * this.handleX,
					boundaryL = - game.craft.getBounds().width * game.craft.scaleX,
					boundaryR = game.setting.gameWidth + boundaryL;
				if (toBe > boundaryR) {
					game.craft.x = boundaryR;
				}else if (toBe < 0) {
					game.craft.x = 0;
				}else{
					game.craft.x = toBe;
				}
				
			
				game.stage.update(event);
			}
			
		}
	}

	game.enemyCraft = {
		enemyRepository:[],
		enemySwitch: true,
		init: function(){

		},
		generateEnemy: function(type){
			var enemy = new game['enemy'+type](),
				lenNow;
			enemy.x = Math.random() * (game.setting.gameWidth - enemy.getBounds().width * enemy.scaleX);
			enemy.y = -enemy.getBounds().height * enemy.scaleY;

			this.enemyRepository.push(enemy);
			game.stage.addChild(enemy);
		},
		enemyFlying: function(idx){
			var enemy = this.enemyRepository[idx];
			if (enemy.y >= game.setting.gameHeight){
				game.stage.removeChild(this.enemyRepository[idx]);
				this.enemyRepository.splice(idx ,1);
				return false;
			}
			return true;
		},
		destroyEnemy: function(idx){
			var enemy = this.enemyRepository[idx],
				sprite = enemy.getChildAt(0),
				enemyType = enemy.enemyType;

			this.enemyRepository.splice(idx ,1);
			sprite.addEventListener('animationend', function(event){
				if (event.name === 'destroy') {
					if(game.stage.removeChild(enemy)){
						game.scoreBoardObj.addScore(game.setting["enemy"+ enemyType + "Score"]);
					};
				};
			})
			sprite.gotoAndPlay("destroy");
			
		},
		damageEnemy: function(idx){
			var enemy = this.enemyRepository[idx],
				sprite = enemy.getChildAt(0);
			sprite.gotoAndPlay("damaged");
		},
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var len = this.enemyRepository.length, 
					deltaS = event.delta / 1000,
					i, type, v;	

				for(i = 0; i < len; i++){
					if(this.enemyFlying(i)){
						type = this.enemyRepository[i].enemyType;
						this.enemyRepository[i].y = this.enemyRepository[i].y + deltaS * game.setting['enemy'+type+'Velocity'];
					}else{
						len--;
					}
				}	


				for(i = 1; i <= game.setting.enemyType; i++){
					if (this.enemySwitch && cjs.Ticker.getTicks() % game.setting['enemy'+i+'Frequency'] === 0 ) {
						this.generateEnemy(i);
					};
				}
				game.stage.update(event);
			};
			
		}
	}

	game.supplyCraft = {
		supplyRepository: [],
		init: function(){

		},
		generateSupply: function(type){
			var supply = new game['supply'+type](),
				lenNow;
			supply.x = Math.random() * (game.setting.gameWidth - supply.getBounds().width * supply.scaleX);
			supply.y = -supply.getBounds().height * supply.scaleY;

			this.supplyRepository.push(supply);
			game.stage.addChild(supply);

		},
		supplyFlying: function(idx){
			var supply = this.supplyRepository[idx];
			if (supply.y >= game.setting.gameHeight){
				game.stage.removeChild(this.supplyRepository[idx]);
				this.supplyRepository.splice(idx ,1);
				return false;
			}
			return true;
		},
		destroySupply: function(idx){
			if (game.stage.removeChild(this.supplyRepository[idx])) {
				this.supplyRepository.splice(idx ,1);
			}	
		},
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var len = this.supplyRepository.length, 
					deltaS = event.delta / 1000,
					i, type, v;	

				for(i = 0; i < len; i++){
					if(this.supplyFlying(i)){
						type = this.supplyRepository[i].supplyType;
						this.supplyRepository[i].y = this.supplyRepository[i].y + deltaS * game.setting['supply'+type+'Velocity'];
					}else{
						len--;
					}
				}	

				for(i = 1; i <= game.setting.supplyType; i++){
					if (cjs.Ticker.getTicks() % game.setting['supply'+i+'Frequency'] === 0 ) {
						this.generateSupply(i);
					};
				}
				game.stage.update(event);
			}
			
		}
	}

	game.battle = {
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var heroBullets = game.heroCraft.heroBullets,
					enemyRepository = game.enemyCraft.enemyRepository,
					supplyRepository = game.supplyCraft.supplyRepository,
					heroCraft = game.craft,
					i, j, k, lenB, lenE, lenS;
				for(j = 0, lenE = enemyRepository.length; j< lenE; j++){
					//hero子弹和敌人
					for (i = 0, lenB = heroBullets.length; i < lenB; i++){
						if (game.helper.detectCollision(heroBullets[i], enemyRepository[j])) {
							console.log('enemy die')
							game.heroCraft.destroyBullet.call(game.heroCraft, i);
							lenB --;
							if( --enemyRepository[j].HP <= 0){
								game.enemyCraft.destroyEnemy(j);
								lenE --;
							}else{
								game.enemyCraft.damageEnemy(j);
							}
						};
					}
					//hero和敌人
					
					if (game.helper.detectCollision(enemyRepository[j], heroCraft)) {
						console.log('hero die')
						game.enemyCraft.destroyEnemy(j);
						lenE--;

						game.heroCraft.destroyHero();
					};
				}

				for (j = 0, lenS = supplyRepository.length; j < lenS; j++) {
					//hero和补给
					if (game.helper.detectCollision(supplyRepository[j], heroCraft)) {
						console.log('hero get supply' + supplyRepository[j].supplyType);
						if (supplyRepository[j].supplyType == 2) {
							game.bombBoardObj.addBomb();
						}else{

							game.heroCraft.levelUp()
						}
						game.supplyCraft.destroySupply(j);
						lenS--;
						//加导弹
						
					};
				};
			}
		}
	}


	game.gameView = {
		init: function(){
			this.initScoreBoard();
			this.initBombBoard();

			cjs.Ticker.timingMode = createjs.Ticker.RAF;
			cjs.Ticker.setFPS(40);
			//cjs.Ticker.addEventListener("tick", game.scoreBoardObj);
			cjs.Ticker.addEventListener("tick", game.battleField.tick.bind(game.battleField));
			cjs.Ticker.addEventListener("tick", game.heroCraft.tick.bind(game.heroCraft));
			cjs.Ticker.addEventListener("tick", game.enemyCraft.tick.bind(game.enemyCraft));
			cjs.Ticker.addEventListener("tick", game.supplyCraft.tick.bind(game.supplyCraft));
			cjs.Ticker.addEventListener("tick", game.battle.tick.bind(game.battle));
		},
		initScoreBoard: function(){
			game.scoreBoardObj = new game.scoreBoard();
			game.stage.addChild(game.scoreBoardObj);
		},
		initBombBoard: function(){
			game.bombBoardObj = new game.bombBoard();
			game.stage.addChild(game.bombBoardObj)
		}
		
	}
}).call(this, game, createjs)

;(function(game, cjs){
	game.start = function(){
		game.stage = new cjs.Stage(game.canvas);
		cjs.Touch.enable(game.stage);
		var handleComplete = function(){
			game.battleField.init();
			game.heroCraft.init();
			game.enemyCraft.init();
			
			game.gameView.init();
			game.eventHandler.init();
			
		}
		game.initLoader(handleComplete);
	}
}).call(this, game, createjs);


window.onload=function(){
	        var startbutton = document.getElementById('startButton');
            startbutton.onclick = function(e) {
                document.getElementById('gamebg').style.display = 'none';
                document.getElementById('canvas').style.display = 'block';
                game.start();
            }
}
// ;(function(game){
// 	if (game){
	
// 		game.start();
// 	}else{
// 		throw "No logic Found";
// 	}
// }).call(this, game)