var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	
	(game.sycee = function(){
		cjs.Bitmap.call(this, game.loader.getResult("money"));
		this.x = 0;
		this.y = 0;
		this.scaleX = 0.2;
		this.scaleY = 0.2;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.diamond = function(){
		cjs.Container.call(this);
		var data = {
			framerate: 16,
			images: [game.loader.getResult("diamond")],
			frames: {width: 90, height:90}
		}
		var spritesheet = new cjs.SpriteSheet(data);
		var diamondSprite = new cjs.Sprite(spritesheet);
		diamondSprite.gotoAndPlay(0);
		//diamondSprite.framerate = 20;
		diamondSprite.scaleX = diamondSprite.scaleY = 0.5;
		this.addChild(diamondSprite);
	}).prototype = Object.create(cjs.Container.prototype);

	(game.diamondBoard = function(){
		cjs.Container.call(this);
		var background =  new cjs.Bitmap(game.loader.getResult("diamondsBoard"));
		background.x = 0;
		background.y = 0;
		var text = new createjs.Text("0", "20px Impact", "#000");
		text.textBaseline = 'middle';
		text.x = background.getBounds().width / 2 + 25;
		text.y = background.getBounds().height / 2;
		text.textAlign = 'center';
		this.addChild(background);
		this.addChild(text);
		this.x = 10;
		this.y = 10;

		this.addNumberText = function(num){
			text.text = parseInt(text.text) + 1;
		}
	}).prototype = Object.create(cjs.Container.prototype);

	(game.cat = function(){
		cjs.Bitmap.call(this, game.loader.getResult("cat"));
		this.x = 0;
		this.y = 0;
		this.scaleX = 0.5;
		this.scaleY = 0.5;
	}).prototype = Object.create(cjs.Bitmap.prototype);

}).call(this, game, createjs)