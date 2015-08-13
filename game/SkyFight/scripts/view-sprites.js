var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	(game.airCraft = function(){
		cjs.Container.call(this);
		var spriteSheet = new createjs.SpriteSheet({
				framerate: 2,
				"images": [game.loader.getResult("aircraft")],
				"frames": {width: 100, height:124},
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": {
					"fly": [0, 1, 'fly', 1.5],
					"destroy":[2, 5, 'fly', 1]
				}
			});
		var airCraftSprite = new cjs.Sprite(spriteSheet, "fly");
		this.addChild(airCraftSprite);
		this.scaleX = this.scaleY = 0.5;

	}).prototype = Object.create(cjs.Container.prototype);

	(game.enemy1 = function(){
		cjs.Container.call(this);
		var spriteSheet = new createjs.SpriteSheet({
				framerate: 5,
				"images": [game.loader.getResult("enemy1")],
				"frames": {width: 60, height:57},
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": {
					"fly": [0, 0, 'fly', 1.5],
					"destroy":[1,4, 'fly', 1]
				}
			});
		var airCraftSprite = new cjs.Sprite(spriteSheet, "fly");

		this.scaleX = this.scaleY = 0.5;
		this.addChild(airCraftSprite);
		this.enemyType = 1;
		this.HP = game.setting.enemy1HP;
	}).prototype = Object.create(cjs.Container.prototype);

	(game.enemy2 = function(){
		cjs.Container.call(this);
		var spriteSheet = new createjs.SpriteSheet({
				framerate: 5,
				"images": [game.loader.getResult("enemy2")],
				"frames": {width: 69, height:100},
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": {
					"fly": [0, 0, 'fly', 1.5],
					"damaged": [1, 1, 'fly', 1],
					"destroy":[2,5, 'fly', 1],
				}
			});
		var airCraftSprite = new cjs.Sprite(spriteSheet, "fly");
		this.scaleX = this.scaleY = 0.5;
		this.addChild(airCraftSprite);
		this.enemyType = 2;
		this.HP = game.setting.enemy2HP;
	}).prototype = Object.create(cjs.Container.prototype);

	(game.enemy3 = function(){
		cjs.Container.call(this);
		var spriteSheet = new createjs.SpriteSheet({
				framerate: 5,
				"images": [game.loader.getResult("enemy3")],
				"frames": {width: 165, height:256},
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": {
					"fly": [0, 1, 'fly', 1],
					"damaged": [2, 2, 'fly', 1],
					"destroy":[3,8, 'fly', 0.3],
				}
			});
		var airCraftSprite = new cjs.Sprite(spriteSheet, "fly");
		this.scaleX = this.scaleY = 0.5;
		this.addChild(airCraftSprite);
		this.enemyType = 3;
		this.HP = game.setting.enemy3HP;
	}).prototype = Object.create(cjs.Container.prototype);

	(game.backgroundBitmap = function(){
		cjs.Bitmap.call(this, game.loader.getResult("background"));
		var ratio =  game.setting.gameWidth/this.image.width;
		this.scaleX = this.scaleY = ratio;
		//this.setTransform(0, h - this.image.height * 4 - groundImg.height, 4, 4);
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.heroBullet = function(){
		cjs.Bitmap.call(this, game.loader.getResult("heroBullet"));
		this.scaleX = this.scaleY = 0.5;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.supply1 = function(){
		cjs.Bitmap.call(this, game.loader.getResult("ufo1"));
		this.scaleX = this.scaleY = 0.5;
		this.supplyType = 1;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.supply2 = function(){
		cjs.Bitmap.call(this, game.loader.getResult("ufo2"));
		this.scaleX = this.scaleY = 0.5;
		this.supplyType = 2;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.scoreBoard = function(){
		cjs.Container.call(this);
		var background =  new cjs.Bitmap(game.loader.getResult("pause"));
		background.x = 0;
		background.y = 0;
		background.scaleX = background.scaleY = 0.5;
		var text = new cjs.Text(game.helper.formatNum('0', 6), "16px Fantasy", "#1a1b1b");
		text.textBaseline = 'middle';
		text.x = background.getBounds().width * background.scaleX + 35;
		text.y = 15
		text.textAlign = 'center';
		this.addChild(background, text);
		this.x = 10;
		this.y = 10;
		this.score = 0;

		this.addScore = function(score){
			this.score += score;
			text.text = game.helper.formatNum(this.score + "", 6);
		}
		this.pause = function(){
			background.image = game.loader.getResult("resume");
		}
		this.resume = function(){
			background.image = game.loader.getResult("pause");
		}
		this.getScore = function(){
			return this.score;
		}
	}).prototype = Object.create(cjs.Container.prototype);

	(game.bombBoard = function(){
		cjs.Container.call(this);
		var background =  new cjs.Bitmap(game.loader.getResult("bomb"));
		background.x = 0;
		background.y = 0;
		background.scaleX = background.scaleY = 0.5;
		var text = new cjs.Text("X " + game.setting.initialBomb, "16px Fantasy", "#1a1b1b");
		text.textBaseline = 'middle';
		text.x = background.getBounds().width * background.scaleX  + 15;
		text.y = 15
		text.textAlign = 'center';
		this.addChild(background, text);
		this.x = 10;
		this.y = game.setting.gameHeight-50;
		this.stock = 2;

		this.addBomb = function(){
			this.stock ++;
			text.text = "X " + this.stock;
		}
		this.useBomb = function(){
			if (this.stock > 0) {
				this.stock --;
				text.text = "X " + this.stock;
				return true;
			}
			return false;	
		}
	}).prototype = Object.create(cjs.Container.prototype);
}).call(this, game, createjs);










